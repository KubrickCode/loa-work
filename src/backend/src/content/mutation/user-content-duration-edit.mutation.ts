import { UseGuards } from '@nestjs/common';
import {
  Args,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Resolver,
} from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';
import { PrismaService } from 'src/prisma';
import { UserContentService } from '../../user/service/user-content.service';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { User } from 'src/common/object/user.object';
import { Prisma, UserRole } from '@prisma/client';
import { ContentDurationService } from '../service/content-duration.service';

@InputType()
class UserContentDurationEditInput {
  @Field()
  id: number;

  @Field(() => Int)
  minutes: number;

  @Field(() => Int)
  seconds: number;
}

@ObjectType()
class UserContentDurationEditResult {
  @Field(() => Boolean)
  ok: boolean;
}

@Resolver()
export class UserContentDurationEditMutation {
  constructor(
    private prisma: PrismaService,
    private userContentService: UserContentService,
    private contentDurationService: ContentDurationService,
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => UserContentDurationEditResult)
  async userContentDurationEdit(
    @Args('input') input: UserContentDurationEditInput,
    @CurrentUser() user: User,
  ) {
    const { id, minutes, seconds } = input;

    const totalSeconds = this.contentDurationService.getValidatedTotalSeconds({
      minutes,
      seconds,
    });

    await this.userContentService.validateUserContentDuration(id);

    return await this.prisma.$transaction(async (tx) => {
      if (user.role === UserRole.OWNER) {
        await this.editDefaultContentDuration({ id, totalSeconds }, tx);
      }

      await tx.userContentDuration.update({
        where: { id },
        data: { isEdited: true, value: totalSeconds },
      });

      return { ok: true };
    });
  }

  async editDefaultContentDuration(
    { id, totalSeconds }: { id: number; totalSeconds: number },
    tx: Prisma.TransactionClient,
  ) {
    const { contentDurationId } =
      await tx.userContentDuration.findUniqueOrThrow({
        where: { id },
      });

    await tx.userContentDuration.updateMany({
      where: {
        contentDurationId,
        isEdited: false,
      },
      data: {
        value: totalSeconds,
      },
    });

    await tx.contentDuration.update({
      where: {
        id: contentDurationId,
      },
      data: {
        defaultValue: totalSeconds,
      },
    });
  }
}

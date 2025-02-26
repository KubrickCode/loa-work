import { UseGuards } from '@nestjs/common';
import {
  Args,
  Field,
  InputType,
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

@InputType()
class UserContentDurationEditInput {
  @Field()
  id: number;

  @Field()
  value: number;
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
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => UserContentDurationEditResult)
  async userContentDurationEdit(
    @Args('input') input: UserContentDurationEditInput,
    @CurrentUser() user: User,
  ) {
    const { id, value } = input;

    await this.userContentService.validateUserContentDuration(id);

    return await this.prisma.$transaction(async (tx) => {
      if (user.role === UserRole.OWNER) {
        await this.editDefaultContentDuration(input, tx);
      }

      await tx.userContentDuration.update({
        where: { id },
        data: { isEdited: true, value },
      });

      return { ok: true };
    });
  }

  async editDefaultContentDuration(
    { id, value }: UserContentDurationEditInput,
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
        value,
      },
    });

    await tx.contentDuration.update({
      where: {
        id: contentDurationId,
      },
      data: {
        defaultValue: value,
      },
    });
  }
}

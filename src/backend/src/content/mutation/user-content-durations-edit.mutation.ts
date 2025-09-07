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
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { User } from 'src/common/object/user.object';
import { UserRole } from '@prisma/client';
import { ContentDurationService } from '../service/content-duration.service';

@InputType()
class UserContentDurationsEditInputDuration {
  @Field()
  contentId: number;

  @Field(() => Int)
  minutes: number;

  @Field(() => Int)
  seconds: number;
}

@InputType()
class UserContentDurationsEditInput {
  @Field(() => [UserContentDurationsEditInputDuration])
  contentDurations: UserContentDurationsEditInputDuration[];
}

@ObjectType()
class UserContentDurationsEditResult {
  @Field(() => Boolean)
  ok: boolean;
}

@Resolver()
export class UserContentDurationsEditMutation {
  constructor(
    private prisma: PrismaService,
    private contentDurationService: ContentDurationService,
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => UserContentDurationsEditResult)
  async userContentDurationsEdit(
    @Args('input') input: UserContentDurationsEditInput,
    @CurrentUser() user: User,
  ) {
    const { contentDurations } = input;

    const promises = contentDurations.map(
      async ({ contentId, minutes, seconds }) => {
        const totalSeconds =
          this.contentDurationService.getValidatedTotalSeconds({
            minutes,
            seconds,
          });

        return await this.prisma.$transaction(async (tx) => {
          if (user.role === UserRole.OWNER) {
            await tx.contentDuration.update({
              where: {
                contentId,
              },
              data: {
                value: totalSeconds,
              },
            });
          }

          await tx.userContentDuration.upsert({
            where: { contentId_userId: { contentId, userId: user.id } },
            update: { value: totalSeconds },
            create: { contentId, userId: user.id, value: totalSeconds },
          });
        });
      },
    );

    await Promise.all(promises);

    return { ok: true };
  }
}

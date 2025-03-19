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
  minutes: number;

  @Field()
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
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => UserContentDurationEditResult)
  async userContentDurationEdit(
    @Args('input') input: UserContentDurationEditInput,
    @CurrentUser() user: User,
  ) {
    const { id, minutes, seconds } = input;

    // 분과 초를 받아서 초 단위로 변환
    const totalSeconds = minutes * 60 + seconds;

    // 값이 음수가 아닌지 확인
    if (totalSeconds < 0 || minutes < 0 || seconds < 0 || seconds >= 60) {
      throw new Error('유효하지 않은 시간 형식입니다.');
    }

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

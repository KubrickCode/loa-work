import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UserRole } from "@prisma/client";
import { AuthGuard } from "src/auth/auth.guard";
import { CurrentUser } from "src/common/decorator/current-user.decorator";
import { User } from "src/common/object/user.object";
import { PrismaService } from "src/prisma";
import { ContentDurationEditInput, ContentDurationEditResult } from "../dto";
import { ContentDurationService } from "../service/content-duration.service";

@Resolver()
export class ContentDurationEditMutation {
  constructor(
    private prisma: PrismaService,
    private contentDurationService: ContentDurationService
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => ContentDurationEditResult)
  async contentDurationEdit(
    @Args("input") input: ContentDurationEditInput,
    @CurrentUser() user: User
  ) {
    const { contentId, minutes, seconds } = input;

    const totalSeconds = this.contentDurationService.getValidatedTotalSeconds({
      minutes,
      seconds,
    });

    return await this.prisma.$transaction(async (tx) => {
      if (user.role === UserRole.OWNER) {
        await tx.contentDuration.update({
          data: {
            value: totalSeconds,
          },
          where: {
            contentId,
          },
        });
      }

      await tx.userContentDuration.upsert({
        create: { contentId, userId: user.id, value: totalSeconds },
        update: { value: totalSeconds },
        where: { contentId_userId: { contentId, userId: user.id } },
      });

      return { ok: true };
    });
  }
}

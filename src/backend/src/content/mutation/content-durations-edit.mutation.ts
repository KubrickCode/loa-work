import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UserRole } from "@prisma/client";
import { AuthGuard } from "src/auth/auth.guard";
import { CurrentUser } from "src/common/decorator/current-user.decorator";
import { User } from "src/common/object/user.object";
import { PrismaService } from "src/prisma";
import { ContentDurationsEditInput, ContentDurationsEditResult } from "../dto";
import { ContentDurationService } from "../service/content-duration.service";

@Resolver()
export class ContentDurationsEditMutation {
  constructor(
    private prisma: PrismaService,
    private contentDurationService: ContentDurationService
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => ContentDurationsEditResult)
  async contentDurationsEdit(
    @Args("input") input: ContentDurationsEditInput,
    @CurrentUser() user: User
  ) {
    const { contentDurations } = input;

    await this.prisma.$transaction(async (tx) => {
      const promises = contentDurations.map(async ({ contentId, minutes, seconds }) => {
        const totalSeconds = this.contentDurationService.getValidatedTotalSeconds({
          minutes,
          seconds,
        });

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
      });

      await Promise.all(promises);
    });

    return { ok: true };
  }
}

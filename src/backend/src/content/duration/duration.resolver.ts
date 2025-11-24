import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { UserRole } from "@prisma/client";
import { AuthGuard } from "src/auth/auth.guard";
import { CurrentUser } from "src/common/decorator/current-user.decorator";
import { User } from "src/common/object/user.object";
import { PrismaService } from "src/prisma";
import { Content } from "../content/content.object";
import { ContentDurationService } from "./duration.service";
import {
  EditContentDurationInput,
  EditContentDurationResult,
  EditContentDurationsInput,
  EditContentDurationsResult,
} from "./duration.dto";
import { ContentDuration } from "./duration.object";

@Resolver(() => ContentDuration)
export class DurationResolver {
  constructor(
    private prisma: PrismaService,
    private contentDurationService: ContentDurationService
  ) {}

  @Query(() => ContentDuration)
  async contentDuration(@Args("id") id: number) {
    return await this.prisma.contentDuration.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  @UseGuards(AuthGuard)
  @Mutation(() => EditContentDurationResult)
  async contentDurationEdit(
    @Args("input") input: EditContentDurationInput,
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

  @UseGuards(AuthGuard)
  @Mutation(() => EditContentDurationsResult)
  async contentDurationsEdit(
    @Args("input") input: EditContentDurationsInput,
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

  @UseGuards(AuthGuard)
  @ResolveField(() => Content)
  async content(@Parent() contentDuration: ContentDuration) {
    return await this.prisma.content.findUniqueOrThrow({
      where: { id: contentDuration.contentId },
    });
  }
}

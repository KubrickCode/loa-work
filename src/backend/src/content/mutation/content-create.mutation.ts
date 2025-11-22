import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "src/auth/auth.guard";
import { PrismaService } from "src/prisma";
import { ContentCreateInput, ContentCreateResult } from "../dto";

@Resolver()
export class ContentCreateMutation {
  constructor(private prisma: PrismaService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => ContentCreateResult)
  async contentCreate(@Args("input") input: ContentCreateInput) {
    const { categoryId, contentRewards, contentSeeMoreRewards, duration, gate, level, name } =
      input;

    // 카테고리 정보 조회하여 레이드 여부 확인
    const category = await this.prisma.contentCategory.findUniqueOrThrow({
      where: { id: categoryId },
    });

    // TODO: 레이드 유형인지 판단하여 더보기 보상 생성 여부를 판단하는데, 구조적으로 더 나은 방법 검토 필요.
    const isRaid = ["에픽 레이드", "카제로스 레이드", "강습 레이드", "군단장 레이드"].includes(
      category.name
    );

    await this.prisma.content.create({
      data: {
        contentCategoryId: categoryId,
        contentDuration: {
          create: {
            value: duration,
          },
        },
        contentRewards: {
          createMany: {
            data: contentRewards.map(({ averageQuantity, isBound, itemId }) => ({
              averageQuantity,
              isSellable: !isBound,
              itemId,
            })),
          },
        },
        ...(isRaid &&
          contentSeeMoreRewards?.length && {
            contentSeeMoreRewards: {
              createMany: {
                data: contentSeeMoreRewards.map(({ itemId, quantity }) => ({
                  itemId,
                  quantity,
                })),
              },
            },
          }),
        gate,
        level,
        name,
      },
    });

    return { ok: true };
  }
}

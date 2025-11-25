import { Prisma } from "@prisma/client";

export type ManyLoader<T> = {
  findManyByContentId: (contentId: number) => Promise<T[]>;
};

export type UniqueLoader<T> = {
  findUniqueOrThrowById: (id: number) => Promise<T>;
};

export type ContentRewardWithItem = Prisma.ContentRewardGetPayload<{
  include: { item: true };
}>;

export type ContentSeeMoreRewardWithItem = Prisma.ContentSeeMoreRewardGetPayload<{
  include: { item: true };
}>;

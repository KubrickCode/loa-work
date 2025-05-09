import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma';
import { ContentRewardItemKind } from '@prisma/client';
import 'src/enums';
import { ContentFactory } from 'src/test/factory/content.factory';
import { ContentRewardFactory } from 'src/test/factory/content-reward.factory';
import { ContentRewardItemFactory } from 'src/test/factory/content-reward-item.factory';
import { ContentDurationFactory } from 'src/test/factory/content-duration.factory';
import { ContentCategoryFactory } from 'src/test/factory/content-category.factory';
import { ContentSeeMoreRewardFactory } from 'src/test/factory/content-see-more-reward.factory';

describe('ContentWageListQuery (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let contentFactory: ContentFactory;
  let contentRewardItemFactory: ContentRewardItemFactory;
  let contentRewardFactory: ContentRewardFactory;
  let contentDurationFactory: ContentDurationFactory;
  let contentCategoryFactory: ContentCategoryFactory;
  let contentSeeMoreRewardFactory: ContentSeeMoreRewardFactory;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = app.get<PrismaService>(PrismaService);
    contentFactory = new ContentFactory(prisma);
    contentRewardItemFactory = new ContentRewardItemFactory(prisma);
    contentRewardFactory = new ContentRewardFactory(prisma);
    contentDurationFactory = new ContentDurationFactory(prisma);
    contentCategoryFactory = new ContentCategoryFactory(prisma);
    contentSeeMoreRewardFactory = new ContentSeeMoreRewardFactory(prisma);

    await prisma.goldExchangeRate.create({
      data: {
        krwAmount: 25,
        goldAmount: 100,
      },
    });
  });

  afterAll(async () => {
    await prisma.clearDatabase();
    await prisma.$disconnect();
    await app.close();
  });

  beforeEach(async () => {
    await prisma.contentSeeMoreReward.deleteMany({});
    await prisma.userContentReward.deleteMany({});
    await prisma.contentReward.deleteMany({});
    await prisma.userContentDuration.deleteMany({});
    await prisma.contentDuration.deleteMany({});
    await prisma.content.deleteMany({});
    await prisma.contentRewardItem.deleteMany({});
  });

  it('기본 쿼리', async () => {
    const content = await contentFactory.create();
    const rewardItem = await contentRewardItemFactory.create({
      data: {
        kind: ContentRewardItemKind.MARKET_ITEM,
        price: 100,
      },
    });
    await contentRewardFactory.create({
      data: {
        contentId: content.id,
        contentRewardItemId: rewardItem.id,
        defaultAverageQuantity: 5,
        isSellable: true,
      },
    });
    await contentDurationFactory.create({
      data: {
        contentId: content.id,
        defaultValue: 600,
      },
    });

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        query: `
          query {
            contentWageList {
              contentId
              krwAmountPerHour
              goldAmountPerHour
              goldAmountPerClear
            }
          }
        `,
      });

    expect(response.status).toBe(200);
    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.contentWageList).toHaveLength(1);

    const wage = response.body.data.contentWageList[0];
    expect(wage.contentId).toBe(content.id);
    expect(wage.goldAmountPerClear).toBe(500); // 100 골드 * 5개
    expect(wage.goldAmountPerHour).toBe(3000); // 500 골드 / (10분/60) = 3000 골드/시간
    expect(wage.krwAmountPerHour).toBe(750); // 3000 골드/시간 * (25 KRW / 100 골드) = 750 원/시간
  });

  it('카테고리 필터', async () => {
    // 서로 다른 두 카테고리 생성
    const category1 = await contentCategoryFactory.create({
      data: { name: 'CategoryA' },
    });

    const category2 = await contentCategoryFactory.create({
      data: { name: 'CategoryB' },
    });

    // 각 카테고리에 콘텐츠 생성
    const content1 = await contentFactory.create({
      data: {
        name: 'Content in CategoryA',
        contentCategoryId: category1.id,
      },
    });

    const content2 = await contentFactory.create({
      data: {
        name: 'Content in CategoryB',
        contentCategoryId: category2.id,
      },
    });

    // 동일한 리워드 아이템 생성
    const rewardItem = await contentRewardItemFactory.create({
      data: {
        kind: ContentRewardItemKind.MARKET_ITEM,
        price: 100,
      },
    });

    // 각 콘텐츠에 리워드 설정
    for (const contentId of [content1.id, content2.id]) {
      await contentRewardFactory.create({
        data: {
          contentId,
          contentRewardItemId: rewardItem.id,
          defaultAverageQuantity: 5,
          isSellable: true,
        },
      });

      await contentDurationFactory.create({
        data: {
          contentId,
          defaultValue: 600,
        },
      });
    }

    // 카테고리 필터로 쿼리 실행
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: `
          query {
            contentWageList(filter: { contentCategoryId: ${category1.id} }) {
              contentId
              goldAmountPerClear
            }
          }
        `,
      });

    expect(response.status).toBe(200);
    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.contentWageList).toHaveLength(1);
    expect(response.body.data.contentWageList[0].contentId).toBe(content1.id);
  });

  it('키워드 필터', async () => {
    // 서로 다른 이름의 콘텐츠 생성
    const category = await contentCategoryFactory.create();

    const content1 = await contentFactory.create({
      data: {
        name: '특별한이름의콘텐츠',
        contentCategoryId: category.id,
      },
    });

    const content2 = await contentFactory.create({
      data: {
        name: '일반콘텐츠',
        contentCategoryId: category.id,
      },
    });

    // 리워드 아이템 생성
    const rewardItem = await contentRewardItemFactory.create({
      data: {
        kind: ContentRewardItemKind.MARKET_ITEM,
        price: 100,
      },
    });

    // 각 콘텐츠에 리워드 및 소요시간 설정
    for (const contentId of [content1.id, content2.id]) {
      await contentRewardFactory.create({
        data: {
          contentId,
          contentRewardItemId: rewardItem.id,
          defaultAverageQuantity: 5,
          isSellable: true,
        },
      });

      await contentDurationFactory.create({
        data: {
          contentId,
          defaultValue: 600,
        },
      });
    }

    // 키워드 필터로 쿼리 실행
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: `
          query {
            contentWageList(filter: { keyword: "특별한" }) {
              contentId
              goldAmountPerClear
            }
          }
        `,
      });

    expect(response.status).toBe(200);
    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.contentWageList).toHaveLength(1);
    expect(response.body.data.contentWageList[0].contentId).toBe(content1.id);
  });

  it('includeContentRewardItemIds 필터', async () => {
    // 콘텐츠 생성
    const content = await contentFactory.create();

    // 서로 다른 두 개의 리워드 아이템 생성
    const rewardItem1 = await contentRewardItemFactory.create({
      data: {
        kind: ContentRewardItemKind.MARKET_ITEM,
        price: 100,
      },
    });

    const rewardItem2 = await contentRewardItemFactory.create({
      data: {
        kind: ContentRewardItemKind.MARKET_ITEM,
        price: 200,
      },
    });

    // 두 리워드 아이템을 콘텐츠에 설정
    await contentRewardFactory.create({
      data: {
        contentId: content.id,
        contentRewardItemId: rewardItem1.id,
        defaultAverageQuantity: 5, // 100 * 5 = 500
        isSellable: true,
      },
    });

    await contentRewardFactory.create({
      data: {
        contentId: content.id,
        contentRewardItemId: rewardItem2.id,
        defaultAverageQuantity: 3, // 200 * 3 = 600
        isSellable: true,
      },
    });

    // 소요시간 설정
    await contentDurationFactory.create({
      data: {
        contentId: content.id,
        defaultValue: 600,
      },
    });

    // rewardItem1만 포함하도록 필터링
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: `
          query {
            contentWageList(filter: { includeContentRewardItemIds: [${rewardItem1.id}] }) {
              contentId
              goldAmountPerClear
            }
          }
        `,
      });

    expect(response.status).toBe(200);
    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.contentWageList).toHaveLength(1);
    expect(response.body.data.contentWageList[0].goldAmountPerClear).toBe(500); // rewardItem1만 계산 (100 * 5)
  });

  it('includeIsSeeMore 필터', async () => {
    // 콘텐츠 생성
    const content = await contentFactory.create();

    // 리워드 아이템 생성
    const rewardItem = await contentRewardItemFactory.create({
      data: {
        kind: ContentRewardItemKind.MARKET_ITEM,
        price: 100,
      },
    });

    // 일반 리워드 설정
    await contentRewardFactory.create({
      data: {
        contentId: content.id,
        contentRewardItemId: rewardItem.id,
        defaultAverageQuantity: 5, // 100 * 5 = 500
        isSellable: true,
      },
    });

    // "See More" 리워드 설정
    await contentSeeMoreRewardFactory.create({
      data: {
        contentId: content.id,
        contentRewardItemId: rewardItem.id,
        quantity: 10, // 100 * 10 = 1000
      },
    });

    // 소요시간 설정
    await contentDurationFactory.create({
      data: {
        contentId: content.id,
        defaultValue: 600,
      },
    });

    // includeIsSeeMore = true로 쿼리
    const responseWithSeeMore = await request(app.getHttpServer())
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: `
          query {
            contentWageList(filter: { includeIsSeeMore: true }) {
              contentId
              goldAmountPerClear
            }
          }
        `,
      });

    // includeIsSeeMore = false로 쿼리
    const responseWithoutSeeMore = await request(app.getHttpServer())
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: `
          query {
            contentWageList(filter: { includeIsSeeMore: false }) {
              contentId
              goldAmountPerClear
            }
          }
        `,
      });

    expect(responseWithSeeMore.status).toBe(200);
    expect(responseWithSeeMore.body.errors).toBeUndefined();
    expect(responseWithoutSeeMore.status).toBe(200);
    expect(responseWithoutSeeMore.body.errors).toBeUndefined();

    const goldWithSeeMore =
      responseWithSeeMore.body.data.contentWageList[0].goldAmountPerClear;
    const goldWithoutSeeMore =
      responseWithoutSeeMore.body.data.contentWageList[0].goldAmountPerClear;

    expect(goldWithSeeMore).toBe(1500); // 일반 500 + 씨모어 1000
    expect(goldWithoutSeeMore).toBe(500); // 일반 500만
  });

  it('includeIsBound 필터', async () => {
    // 콘텐츠 생성
    const content = await contentFactory.create();

    // 리워드 아이템 생성
    const rewardItem1 = await contentRewardItemFactory.create({
      data: {
        kind: ContentRewardItemKind.MARKET_ITEM,
        price: 100,
      },
    });

    const rewardItem2 = await contentRewardItemFactory.create({
      data: {
        kind: ContentRewardItemKind.MARKET_ITEM,
        price: 200,
      },
    });

    // 거래 가능한 리워드 (isSellable: true)
    await contentRewardFactory.create({
      data: {
        contentId: content.id,
        contentRewardItemId: rewardItem1.id,
        defaultAverageQuantity: 5, // 100 * 5 = 500
        isSellable: true,
      },
    });

    // 귀속 아이템 (isSellable: false)
    await contentRewardFactory.create({
      data: {
        contentId: content.id,
        contentRewardItemId: rewardItem2.id,
        defaultAverageQuantity: 3, // 200 * 3 = 600
        isSellable: false,
      },
    });

    // 소요시간 설정
    await contentDurationFactory.create({
      data: {
        contentId: content.id,
        defaultValue: 600,
      },
    });

    // includeIsBound = false로 쿼리 (거래 가능 아이템만)
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: `
          query {
            contentWageList(filter: { includeIsBound: false }) {
              contentId
              goldAmountPerClear
            }
          }
        `,
      });

    expect(response.status).toBe(200);
    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.contentWageList).toHaveLength(1);
    expect(response.body.data.contentWageList[0].goldAmountPerClear).toBe(500); // 거래 가능 아이템만 계산
  });

  it('정렬(orderBy)', async () => {
    // 여러 콘텐츠 생성
    const category = await contentCategoryFactory.create();

    // 서로 다른 골드 보상을 가진 콘텐츠 여러 개 생성
    const contents = [];
    const goldValues = [300, 900, 600]; // 정렬 테스트를 위한 값

    for (let i = 0; i < goldValues.length; i++) {
      const content = await contentFactory.create({
        data: {
          name: `콘텐츠${i + 1}`,
          contentCategoryId: category.id,
        },
      });
      contents.push(content);

      const rewardItem = await contentRewardItemFactory.create({
        data: {
          kind: ContentRewardItemKind.MARKET_ITEM,
          price: 100,
        },
      });

      // 각 콘텐츠마다 다른 수량의 리워드 설정
      await contentRewardFactory.create({
        data: {
          contentId: content.id,
          contentRewardItemId: rewardItem.id,
          defaultAverageQuantity: goldValues[i] / 100, // 100 * (수량) = goldValues[i]
          isSellable: true,
        },
      });

      // 소요시간 설정
      await contentDurationFactory.create({
        data: {
          contentId: content.id,
          defaultValue: 600,
        },
      });
    }

    // goldAmountPerClear 기준 오름차순 정렬
    const responseAsc = await request(app.getHttpServer())
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: `
          query {
            contentWageList(orderBy: [{ field: "goldAmountPerClear", order: "asc" }]) {
              contentId
              goldAmountPerClear
            }
          }
        `,
      });

    // goldAmountPerClear 기준 내림차순 정렬
    const responseDesc = await request(app.getHttpServer())
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: `
          query {
            contentWageList(orderBy: [{ field: "goldAmountPerClear", order: "desc" }]) {
              contentId
              goldAmountPerClear
            }
          }
        `,
      });

    expect(responseAsc.status).toBe(200);
    expect(responseAsc.body.errors).toBeUndefined();
    expect(responseDesc.status).toBe(200);
    expect(responseDesc.body.errors).toBeUndefined();

    const resultsAsc = responseAsc.body.data.contentWageList;
    const resultsDesc = responseDesc.body.data.contentWageList;

    // 오름차순 확인 (첫 번째와 마지막 항목 비교)
    expect(resultsAsc[0].goldAmountPerClear).toBe(300);
    expect(resultsAsc[2].goldAmountPerClear).toBe(900);

    // 내림차순 확인 (첫 번째와 마지막 항목 비교)
    expect(resultsDesc[0].goldAmountPerClear).toBe(900);
    expect(resultsDesc[2].goldAmountPerClear).toBe(300);
  });

  it('복합 필터', async () => {
    // 여러 카테고리 생성
    const category1 = await contentCategoryFactory.create({
      data: { name: '카테고리1' },
    });

    const category2 = await contentCategoryFactory.create({
      data: { name: '카테고리2' },
    });

    // 서로 다른 카테고리에 콘텐츠 생성
    const content1 = await contentFactory.create({
      data: {
        name: '특수콘텐츠',
        contentCategoryId: category1.id,
      },
    });

    const content2 = await contentFactory.create({
      data: {
        name: '일반콘텐츠',
        contentCategoryId: category2.id,
      },
    });

    // 리워드 아이템 생성
    const rewardItem1 = await contentRewardItemFactory.create({
      data: {
        kind: ContentRewardItemKind.MARKET_ITEM,
        price: 100,
      },
    });

    const rewardItem2 = await contentRewardItemFactory.create({
      data: {
        kind: ContentRewardItemKind.MARKET_ITEM,
        price: 200,
      },
    });

    // content1의 리워드 설정
    await contentRewardFactory.create({
      data: {
        contentId: content1.id,
        contentRewardItemId: rewardItem1.id,
        defaultAverageQuantity: 5, // 100 * 5 = 500
        isSellable: true,
      },
    });

    await contentRewardFactory.create({
      data: {
        contentId: content1.id,
        contentRewardItemId: rewardItem2.id,
        defaultAverageQuantity: 3, // 200 * 3 = 600
        isSellable: false,
      },
    });

    // content2의 리워드 설정
    await contentRewardFactory.create({
      data: {
        contentId: content2.id,
        contentRewardItemId: rewardItem1.id,
        defaultAverageQuantity: 2, // 100 * 2 = 200
        isSellable: true,
      },
    });

    // 소요시간 설정
    for (const contentId of [content1.id, content2.id]) {
      await contentDurationFactory.create({
        data: {
          contentId,
          defaultValue: 600,
        },
      });
    }

    // 복합 필터: 카테고리1 + 키워드 "특수" + 거래 가능 아이템만 + rewardItem1만
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: `
          query {
            contentWageList(
              filter: { 
                contentCategoryId: ${category1.id},
                keyword: "특수",
                includeIsBound: false,
                includeContentRewardItemIds: [${rewardItem1.id}]
              }
            ) {
              contentId
              goldAmountPerClear
            }
          }
        `,
      });

    expect(response.status).toBe(200);
    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.contentWageList).toHaveLength(1);
    expect(response.body.data.contentWageList[0].contentId).toBe(content1.id);
    expect(response.body.data.contentWageList[0].goldAmountPerClear).toBe(500); // rewardItem1만 계산 (100 * 5)
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma';
import { ContentFactory } from 'src/test/factory/content.factory';
import { ContentCategoryFactory } from 'src/test/factory/content-category.factory';
import { ContentRewardItemFactory } from 'src/test/factory/content-reward-item.factory';
import 'src/enums';
import { faker } from '@faker-js/faker/.';

describe('ContentListQuery (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let contentFactory: ContentFactory;
  let contentCategoryFactory: ContentCategoryFactory;
  let contentRewardItemFactory: ContentRewardItemFactory;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = app.get<PrismaService>(PrismaService);

    contentFactory = new ContentFactory(prisma);
    contentCategoryFactory = new ContentCategoryFactory(prisma);
    contentRewardItemFactory = new ContentRewardItemFactory(prisma);
  });

  afterAll(async () => {
    await prisma.$disconnect();
    app.close();
  });

  it('기본 쿼리가 정상 동작해야 함', async () => {
    const category = await contentCategoryFactory.create({
      data: { name: faker.lorem.word() },
    });

    const content1 = await contentFactory.create({
      data: {
        name: faker.lorem.word(),
        level: 1,
        contentCategoryId: category.id,
      },
    });

    const content2 = await contentFactory.create({
      data: {
        name: faker.lorem.word(),
        level: 2,
        contentCategoryId: category.id,
      },
    });

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        query: `
          query {
            contentList {
              id
              name
              level
              contentCategoryId
            }
          }
        `,
      });

    expect(response.status).toBe(200);
    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.contentList).toHaveLength(2);
    expect(
      response.body.data.contentList.some((c) => c.id === content1.id),
    ).toBeTruthy();
    expect(
      response.body.data.contentList.some((c) => c.id === content2.id),
    ).toBeTruthy();
  });

  it('카테고리 필터가 적용되어야 함', async () => {
    const contentName1 = faker.lorem.word();
    const contentName2 = faker.lorem.word();

    const category1 = await contentCategoryFactory.create({
      data: { name: faker.lorem.word() },
    });
    const category2 = await contentCategoryFactory.create({
      data: { name: faker.lorem.word() },
    });

    await contentFactory.create({
      data: {
        name: contentName1,
        contentCategoryId: category1.id,
      },
    });

    await contentFactory.create({
      data: {
        name: contentName2,
        contentCategoryId: category2.id,
      },
    });

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: `
          query {
            contentList(filter: { contentCategoryId: ${category1.id} }) {
              id
              name
              contentCategoryId
            }
          }
        `,
      });

    // 응답 검증
    expect(response.status).toBe(200);
    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.contentList).toHaveLength(1);
    expect(response.body.data.contentList[0].contentCategoryId).toBe(
      category1.id,
    );
    expect(response.body.data.contentList[0].name).toBe(contentName1);
  });

  it('키워드 필터가 적용되어야 함', async () => {
    const contentName1 = '독특한 이름의 컨텐츠';
    const contentName2 = '일반 컨텐츠';

    const category = await contentCategoryFactory.create({
      data: { name: faker.lorem.word() },
    });

    await contentFactory.create({
      data: {
        name: contentName1,
        contentCategoryId: category.id,
      },
    });

    await contentFactory.create({
      data: {
        name: contentName2,
        contentCategoryId: category.id,
      },
    });

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: `
          query {
            contentList(filter: { keyword: "독특한" }) {
              id
              name
            }
          }
        `,
      });

    // 응답 검증
    expect(response.status).toBe(200);
    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.contentList).toHaveLength(1);
    expect(response.body.data.contentList[0].name).toBe(contentName1);
  });

  it('wageFilter가 응답에 포함되어야 함', async () => {
    const category = await contentCategoryFactory.create();
    await contentFactory.create({
      data: { contentCategoryId: category.id },
    });

    const rewardItem = await contentRewardItemFactory.create();

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: `
          query {
            contentList(
              filter: { 
                wageFilter: { 
                  includeIsBound: false,
                  includeContentRewardItems: ["${rewardItem.id}"]
                } 
              }
            ) {
              id
              name
              wageFilter {
                includeIsBound
                includeContentRewardItems
              }
            }
          }
        `,
      });

    expect(response.status).toBe(200);
    expect(response.body.errors).toBeUndefined();

    response.body.data.contentList.forEach((content) => {
      expect(content.wageFilter).toBeDefined();
      expect(content.wageFilter.includeIsBound).toBe(false);
      expect(content.wageFilter.includeContentRewardItems).toContain(
        String(rewardItem.id),
      );
    });
  });

  it('정렬이 올바르게 적용되어야 함', async () => {
    const category1 = await contentCategoryFactory.create({
      data: { name: faker.lorem.word() },
    });
    const category2 = await contentCategoryFactory.create({
      data: { name: faker.lorem.word() },
    });

    await contentFactory.create({
      data: {
        name: faker.lorem.word(),
        contentCategoryId: category1.id,
        level: 2,
      },
    });

    await contentFactory.create({
      data: {
        name: faker.lorem.word(),
        contentCategoryId: category1.id,
        level: 1,
      },
    });

    await contentFactory.create({
      data: {
        name: faker.lorem.word(),
        contentCategoryId: category2.id,
        level: 1,
      },
    });

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: `
          query {
            contentList {
              id
              name
              level
              contentCategoryId
            }
          }
        `,
      });

    expect(response.status).toBe(200);
    expect(response.body.errors).toBeUndefined();

    const contents = response.body.data.contentList;

    expect(contents[0].contentCategoryId).toBeLessThanOrEqual(
      contents[1].contentCategoryId,
    );

    const catGroup = contents.reduce((acc, cur) => {
      if (!acc[cur.contentCategoryId]) acc[cur.contentCategoryId] = [];
      acc[cur.contentCategoryId].push(cur);
      return acc;
    }, {});

    Object.values(catGroup).forEach((items: any[]) => {
      for (let i = 0; i < items.length - 1; i++) {
        expect(items[i].level).toBeLessThanOrEqual(items[i + 1].level);
      }
    });
  });
});

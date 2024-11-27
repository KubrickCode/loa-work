import { Test, TestingModule } from '@nestjs/testing';
import { ItemPriceService } from './item-price.service';
import { faker } from '@faker-js/faker';
import { PrismaService } from 'src/prisma';

describe('ItemPriceService', () => {
  let module: TestingModule;
  let service: ItemPriceService;
  let prisma: PrismaService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [PrismaService, ItemPriceService],
    }).compile();

    service = module.get(ItemPriceService);
    prisma = module.get(PrismaService);

    const INT4_RANGE = { min: 1, max: 2147483647 };

    const commonData = {
      bidPrice: faker.number.int(INT4_RANGE),
      bidStartPrice: faker.number.int(INT4_RANGE),
      startPrice: faker.number.int(INT4_RANGE),
      endDate: faker.date.future(),
    };

    const gemNames = [
      service.ONE_LEVEL_DAMAGE_GEM_NAME,
      service.ONE_LEVEL_COOL_DOWN_GEM_NAME,
    ];

    const auctionItemCategory = await prisma.auctionItemCategory.create({
      data: {
        name: '보석',
        code: faker.number.int(INT4_RANGE),
      },
    });

    for (const name of gemNames) {
      await prisma.auctionItem.create({
        data: {
          name,
          imageSrc: faker.image.url(),
          auctionItemCategoryId: auctionItemCategory.id,
          auctionItemStats: {
            create: Array.from({ length: 10 }, (_, index) => ({
              buyPrice: 100 + index,
              ...commonData,
            })),
          },
        },
      });
    }

    const marketItemCategory = await prisma.marketItemCategory.create({
      data: {
        name: '재련 재료',
        code: faker.number.int(INT4_RANGE),
      },
    });

    await prisma.marketItem.create({
      data: {
        name: '운명의 파괴석',
        imageSrc: faker.image.url(),
        bundleCount: 10,
        refId: faker.number.int(INT4_RANGE),
        marketItemCategory: {
          connect: { id: marketItemCategory.id },
        },
        marketItemStats: {
          create: {
            currentMinPrice: 10000,
            recentPrice: 9500,
            yDayAvgPrice: 9800.5,
          },
        },
      },
    });

    await prisma.marketItem.create({
      data: {
        name: service.SMALL_FATE_FRAGMENT_NAME,
        imageSrc: faker.image.url(),
        bundleCount: 1,
        refId: faker.number.int(INT4_RANGE),
        marketItemCategory: {
          connect: { id: marketItemCategory.id },
        },
        marketItemStats: {
          create: {
            currentMinPrice: 10000,
            recentPrice: 9500,
            yDayAvgPrice: 9800.5,
          },
        },
      },
    });
  });

  afterAll(async () => {
    await module.close();
  });

  it('get1LevelGemPrice', async () => {
    const price = await service.get1LevelGemPrice();
    expect(price).toBe(104.5);
  });

  it('getMarketItemCurrentMinPrice', async () => {
    const price = await service.getMarketItemCurrentMinPrice('운명의 파괴석');
    expect(price).toBe(1000);
  });

  it('getSmallFateFragmentBuyPricePerOne', async () => {
    const price = await service.getSmallFateFragmentBuyPricePerOne();
    expect(price).toBe(10);
  });
});

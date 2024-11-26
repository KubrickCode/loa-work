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
  });

  afterAll(async () => {
    await module.close();
  });

  it('get1LevelGemPrice', async () => {
    const price = await service.get1LevelGemPrice();
    expect(price).toBe(104.5);
  });
});

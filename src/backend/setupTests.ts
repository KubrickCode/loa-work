import { faker } from '@faker-js/faker';
import { Prisma, PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

global.beforeAll(async () => {
  prisma = new PrismaClient();
  faker.seed(0);
});

global.afterAll(async () => {
  // 테스트 간 서로 영향을 주지 않도록 테스트가 끝날 때마다 데이터를 모두 삭제함.
  const tables = Prisma.dmmf.datamodel.models.map((x) => x.dbName);
  await prisma.$transaction([
    ...tables.map((table) =>
      prisma.$executeRawUnsafe(`TRUNCATE "${table}" CASCADE;`),
    ),
  ]);
  await prisma.$disconnect();
});

import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { AuthProvider, Prisma } from '@prisma/client';
import { UniqueEnforcer } from 'enforce-unique';

@Injectable()
export class UserFactory {
  uniqueEnforcerDisplayName = new UniqueEnforcer();
  constructor(private prisma: PrismaService) {}

  async create(options?: { tx?: Prisma.TransactionClient }) {
    const prisma = options?.tx || this.prisma;
    const displayName = this.uniqueEnforcerDisplayName.enforce(faker.word.noun);
    const user = await prisma.user.create({
      data: {
        displayName,
        email: faker.internet.email(),
        provider: AuthProvider.GOOGLE,
        refId: faker.string.uuid(),
      },
    });
    return user;
  }
}

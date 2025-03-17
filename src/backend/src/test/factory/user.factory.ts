import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { AuthProvider, Prisma } from '@prisma/client';
import { UniqueEnforcer } from 'enforce-unique';

@Injectable()
export class UserFactory {
  private readonly uniqueEnforcer = new UniqueEnforcer();

  constructor(private prisma: PrismaService) {}

  async create(options?: { tx?: Prisma.TransactionClient }) {
    const prisma = options?.tx || this.prisma;
    const refId = this.uniqueEnforcer.enforce(faker.string.uuid);
    return await prisma.user.create({
      data: {
        displayName: faker.word.noun(),
        provider: AuthProvider.GOOGLE,
        refId,
      },
    });
  }
}

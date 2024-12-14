import { Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { UserGoldExchangeRate } from '../object/user-gold-exchange-rate.object';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { User } from 'src/common/object/user.object';

@Resolver()
export class UserGoldExchangeRateQuery {
  constructor(private prisma: PrismaService) {}

  @Query(() => UserGoldExchangeRate)
  async userGoldExchangeRate(@CurrentUser() user: User) {
    return await this.prisma.userGoldExchangeRate.findFirstOrThrow({
      where: {
        userId: user.id,
      },
    });
  }
}

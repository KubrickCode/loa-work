import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'node:path';
import { MinimumWageModule } from './wage/wage.module';
import { ContentModule } from './content/content.module';
import { ItemModule } from './item/item.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { ExchangeRateModule } from './exchange-rate/exchange-rate.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => ({
        autoSchemaFile: join(process.cwd(), 'schema.graphql'),
        context: ({ req }) => ({
          req,
        }),
        debug: true,
        playground: true,
        sortSchema: true,
      }),
    }),
    MinimumWageModule,
    ContentModule,
    ItemModule,
    CommonModule,
    AuthModule,
    ExchangeRateModule,
    UserModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'node:path';
import { ContentModule } from './content/content.module';
import { ItemModule } from './item/item.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { ExchangeRateModule } from './exchange-rate/exchange-rate.module';
import { UserModule } from './user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MonitoringModule } from './monitoring/monitoring.module';

@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => ({
        autoSchemaFile: join(process.cwd(), 'schema.graphql'),
        context: ({ req, res }) => ({
          req,
          res,
        }),
        debug: true,
        playground: true,
        sortSchema: true,
        introspection: true,
        cache: 'bounded',
      }),
    }),
    ContentModule,
    ItemModule,
    CommonModule,
    AuthModule,
    ExchangeRateModule,
    UserModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend'),
    }),
    MonitoringModule,
  ],
})
export class AppModule {}

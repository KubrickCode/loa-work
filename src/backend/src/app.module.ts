import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'node:path';
import { MinimumWageModule } from './wage/wage.module';
import { ContentModule } from './content/content.module';
import './enums';

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
  ],
})
export class AppModule {}

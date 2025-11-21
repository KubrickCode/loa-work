import { randomUUID } from "node:crypto";
import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { ClsModule } from "nestjs-cls";
import { PrismaModule } from "./prisma";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "node:path";
import { ContentModule } from "./content/content.module";
import { ItemModule } from "./item/item.module";
import { CommonModule } from "./common/common.module";
import { AuthModule } from "./auth/auth.module";
import { ExchangeRateModule } from "./exchange-rate/exchange-rate.module";
import { UserModule } from "./user/user.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { MonitoringModule } from "./monitoring/monitoring.module";
import { AllExceptionsFilter } from "./common/filter";
import { formatGraphQLError } from "./common/filter/graphql-format-error";
import { NODE_ENV } from "./common/constants/env.constants";

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: {
        generateId: true,
        idGenerator: () => randomUUID(),
        mount: true,
      },
    }),
    PrismaModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => ({
        autoSchemaFile: join(process.cwd(), "schema.graphql"),
        buildSchemaOptions: {
          numberScalarMode: "integer",
        },
        cache: "bounded",
        context: ({ req, res }) => ({
          req,
          res,
        }),
        debug: process.env.NODE_ENV !== NODE_ENV.PRODUCTION,
        formatError: formatGraphQLError,
        introspection: true,
        playground: process.env.NODE_ENV !== NODE_ENV.PRODUCTION,
        sortSchema: true,
      }),
    }),
    ContentModule,
    ItemModule,
    CommonModule,
    AuthModule,
    ExchangeRateModule,
    UserModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "frontend"),
    }),
    MonitoringModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}

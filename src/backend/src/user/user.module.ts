import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma";
import { UserResolver } from "./user.resolver";

@Module({
  imports: [PrismaModule],
  providers: [UserResolver],
})
export class UserModule {}

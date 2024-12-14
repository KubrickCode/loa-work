import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma';

@Module({
  imports: [PrismaModule],
  providers: [],
})
export class UserModule {}

import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { Content } from '../object/content.object';

@Resolver()
export class ContentQuery {
  constructor(private prisma: PrismaService) {}

  @Query(() => Content)
  async content(@Args('id', { type: () => Int }) id: number) {
    return await this.prisma.content.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }
}

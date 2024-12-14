import { UseGuards } from '@nestjs/common';
import {
  Args,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';
import { PrismaService } from 'src/prisma';
import { UserContentService } from '../service/user-content.service';

@InputType()
class UserContentDurationEditInput {
  @Field()
  id: number;

  @Field()
  value: number;
}

@ObjectType()
class UserContentDurationEditResult {
  @Field(() => Boolean)
  ok: boolean;
}

@Resolver()
export class UserContentDurationEditMutation {
  constructor(
    private prisma: PrismaService,
    private userContentService: UserContentService,
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => UserContentDurationEditResult)
  async userContentDurationEdit(
    @Args('input') input: UserContentDurationEditInput,
  ) {
    const { id, value } = input;

    await this.userContentService.validateUserContentDuration(id);

    await this.prisma.userContentDuration.update({
      where: { id },
      data: { value },
    });

    return { ok: true };
  }
}

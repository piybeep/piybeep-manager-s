import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Source {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

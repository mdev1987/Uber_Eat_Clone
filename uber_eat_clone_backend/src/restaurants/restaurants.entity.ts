import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Restaurant {
  @Field()
  name: string;

  @Field({ nullable: true })
  isVegan?: boolean;

  @Field()
  address: string;

  @Field()
  ownerName: string;
}

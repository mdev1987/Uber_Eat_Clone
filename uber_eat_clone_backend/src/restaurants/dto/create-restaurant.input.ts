import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRestaurantInput {
  @Field()
  name: string;

  @Field()
  isVegan: boolean;

  @Field()
  address: string;

  @Field()
  ownerName: string;
}

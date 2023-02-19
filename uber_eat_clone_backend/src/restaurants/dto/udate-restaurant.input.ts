import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsNumberString } from 'class-validator';
import { CreateRestaurantDto } from './create-restaurant.input';

@InputType()
export class UpdateRestaurantDto extends PartialType(
  CreateRestaurantDto,
  InputType,
) {
  @Field(() => ID)
  @IsNumberString()
  id: number;
}

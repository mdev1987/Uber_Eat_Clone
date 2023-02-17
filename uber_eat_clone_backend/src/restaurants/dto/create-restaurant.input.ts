import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, Length, MinLength } from 'class-validator';

@ArgsType()
export class CreateRestaurantDto {
  @Field()
  @Length(2, 50)
  name: string;

  @Field()
  @IsBoolean()
  isVegan: boolean;

  @Field()
  @MinLength(5)
  address: string;

  @Field()
  @MinLength(3)
  ownerName: string;
}

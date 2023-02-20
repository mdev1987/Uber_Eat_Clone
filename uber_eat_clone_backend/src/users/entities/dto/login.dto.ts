import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Users } from '../user.entity';

@InputType()
export class LoginInput extends PickType(
  Users,
  ['email', 'password'],
  InputType,
) {}

@ObjectType()
export class LoginOutput {
  @Field()
  token: string;
}

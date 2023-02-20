import { InputType, PickType } from '@nestjs/graphql';
import { Users } from '../user.entity';

@InputType()
export class CreateUserDto extends PickType(
  Users,
  ['email', 'password', 'role'],
  InputType,
) {}

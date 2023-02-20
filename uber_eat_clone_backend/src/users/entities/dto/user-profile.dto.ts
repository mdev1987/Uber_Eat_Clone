import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Users } from '../user.entity';

@ObjectType()
export class UserProfile extends PickType(
  Users,
  ['id', 'email', 'role'],
  InputType,
) {}

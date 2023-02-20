import {
  Field,
  ID,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { CreateUserDto } from './create-user.dto';

@InputType()
export class EditProfile extends PartialType(CreateUserDto, InputType) {}

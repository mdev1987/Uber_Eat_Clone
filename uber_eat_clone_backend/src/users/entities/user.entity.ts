import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IsEmail, IsEnum, MinLength } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';

export enum UserRole {
  CLIENT = 'client',
  OWNER = 'owner',
  DELIVERY = 'delivery',
}

registerEnumType(UserRole, { name: 'UserRole' });

@ObjectType()
@Entity('users')
export class Users extends BaseEntity {
  @Column({ unique: true })
  @Field()
  @IsEmail()
  email: string;

  @Column()
  @Field()
  @MinLength(5)
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  @Field(() => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hashSync(this.password, 10);
  }

  async checkPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

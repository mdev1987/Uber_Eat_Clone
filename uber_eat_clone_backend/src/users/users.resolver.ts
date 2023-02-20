import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { Users } from './entities/user.entity';
import { CreateUserDto } from './entities/dto/create-user.dto';
import { LoginInput, LoginOutput } from './entities/dto/login.dto';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { UserProfile } from './entities/dto/user-profile.dto';
import { EditProfile } from './entities/dto/edit-user.dto';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // ------ Queries -------

  @Query(() => [Users])
  getUsers() {
    return this.usersService.getUsers();
  }

  @Query(() => LoginOutput)
  loginUser(@Args('login') user: LoginInput) {
    return this.usersService.loginUser(user);
  }

  @UseGuards(AuthGuard)
  @Query(() => UserProfile)
  currentUser(@AuthUser() user) {
    return this.usersService.getUserById(user.id);
  }

  @Query(() => UserProfile)
  userProfile(@Args('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  // ------ Mutations ------

  @Mutation(() => LoginOutput)
  signupUser(@Args('singup') user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => UserProfile)
  editProfile(@AuthUser() user, @Args('profile') profile: EditProfile) {
    return this.usersService.updateUserProfile(user, profile);
  }
}

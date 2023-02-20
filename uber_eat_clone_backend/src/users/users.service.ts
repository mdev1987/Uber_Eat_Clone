import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './entities/dto/create-user.dto';
import { LoginInput } from './entities/dto/login.dto';
import { Users } from './entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepo: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}

  async getUsers() {
    return await this.usersRepo.find();
  }

  async getUserById(id: number) {
    const user = await this.usersRepo.findOneBy({ id: id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.usersRepo.findOneBy({ email: email });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async createUser(userData: CreateUserDto) {
    const usr = await this.usersRepo.findOneBy({ email: userData.email });
    if (usr) throw new BadRequestException('Email already exists!');
    let user = this.usersRepo.create(userData);
    user = await this.usersRepo.save(user);
    return this.jwtService.createToken({ id: user.id, email: user.email });
  }

  async loginUser(userData: LoginInput) {
    const user = await this.getUserByEmail(userData.email);
    const isValidPassword = await user.checkPassword(userData.password);
    if (!isValidPassword)
      throw new BadRequestException('Passwords is not valid');
    return this.jwtService.createToken({ id: user.id, email: user.email });
  }

  async updateUserProfile(usr, profile) {
    console.log(usr);
    const user = await this.getUserById(usr.id);
    Object.assign(user, profile);
    return await this.usersRepo.save(user);
  }
}

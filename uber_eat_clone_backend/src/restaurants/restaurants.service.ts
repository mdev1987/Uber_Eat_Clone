import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.input';
import { UpdateRestaurantDto } from './dto/udate-restaurant.input';
import { Restaurant } from './entities/restaurants.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepo: Repository<Restaurant>,
  ) {}

  async getAll() {
    return await this.restaurantRepo.find();
  }

  async getById(id: number) {
    const restaurant = await this.restaurantRepo.findOneBy({ id: id });
    if (!restaurant) throw new NotFoundException('Restaurant not found');
    return restaurant;
  }

  async createRestaurant(restaurantData: CreateRestaurantDto) {
    const restaurant = this.restaurantRepo.create(restaurantData);
    return await this.restaurantRepo.save(restaurant);
  }

  async updateRestaurant(restaurantData: UpdateRestaurantDto) {
    const restaurant = await this.getById(restaurantData.id);
    const { id, ...restRestaurantData } = restaurantData;
    Object.assign(restaurant, restRestaurantData);
    return await this.restaurantRepo.save(restaurant);
  }

  async deleteRestaurant(id: number) {
    const restaurant = await this.getById(id);
    const result = await this.restaurantRepo.remove(restaurant);
    Object.assign(result, { id: id });
    return result;
  }
}

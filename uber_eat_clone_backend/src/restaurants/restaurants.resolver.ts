import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurantDto } from './dto/create-restaurant.input';
import { UpdateRestaurantDto } from './dto/udate-restaurant.input';
import { Restaurant } from './entities/restaurants.entity';
import { RestaurantsService } from './restaurants.service';
@Resolver()
export class RestaurantsResolver {
  constructor(private readonly restaurantsService: RestaurantsService) {}
  @Query(() => [Restaurant])
  getRestaurants() {
    return this.restaurantsService.getAll();
  }

  @Mutation(() => Restaurant)
  createRestaurant(@Args('restaurant') restaurant: CreateRestaurantDto) {
    return this.restaurantsService.createRestaurant(restaurant);
  }

  @Mutation(() => Restaurant)
  updateRestaurant(@Args('restaurant') restaurant: UpdateRestaurantDto) {
    return this.restaurantsService.updateRestaurant(restaurant);
  }

  @Mutation(() => Restaurant)
  deleteRestaurant(@Args('id', ParseIntPipe) id: number) {
    return this.restaurantsService.deleteRestaurant(id);
  }
}

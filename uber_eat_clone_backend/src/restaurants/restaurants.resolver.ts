import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { Restaurant } from './restaurants.entity';

@Resolver()
export class RestaurantsResolver {
  @Query(() => [Restaurant])
  getRestaurants(@Args('veganOnly') veganOnly: boolean) {
    const restaurants = new Restaurant();
    restaurants.name = 'Restaurants';
    restaurants.isVegan = veganOnly;
    return [restaurants];
  }

  @Mutation(() => Restaurant)
  createRestaurant(
    @Args('createRestaurant') createRestaurant: CreateRestaurantInput,
  ) {
    const restaurant = new Restaurant();
    Object.assign(restaurant, createRestaurant);
    return restaurant;
  }
}

import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { CartService } from './cart.service';

import { AddCartDto } from './dto/add-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async addToCart(
    @Body()
    body: AddCartDto,
  ) {
    return this.cartService.addToCart(body);
  }

  @Get(':userId')
  async getCart(
    @Param('userId')
    userId: string,
  ) {
    return this.cartService.getCart(userId);
  }

  @Patch(':userId/:productId')
  async updateQuantity(
    @Param('userId')
    userId: string,

    @Param('productId')
    productId: string,

    @Body()
    body: UpdateCartDto,
  ) {
    return this.cartService.updateQuantity(
      userId,

      productId,

      body,
    );
  }

  @Delete(':userId/clear')
  async clearCart(
    @Param('userId')
    userId: string,
  ) {
    return this.cartService.clearCart(userId);
  }

  @Delete(':userId/:productId')
  async removeItem(
    @Param('userId')
    userId: string,

    @Param('productId')
    productId: string,
  ) {
    return this.cartService.removeItem(
      userId,

      productId,
    );
  }
}

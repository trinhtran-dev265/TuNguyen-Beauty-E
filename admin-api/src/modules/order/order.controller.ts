import { Controller, Get, Patch, Param, Body, Post } from '@nestjs/common';

import { OrderService } from './order.service';

import { UpdateOrderDto } from './dto/update-order.dto';
import { CheckoutDto } from './dto/checkout.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getOrders() {
    return this.orderService.getOrders();
  }

  @Get(':id')
  async getOrderById(
    @Param('id')
    id: string,
  ) {
    return this.orderService.getOrderById(id);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id')
    id: string,

    @Body()
    body: UpdateOrderDto,
  ) {
    return this.orderService.updateStatus(
      id,

      body,
    );
  }

  @Post('checkout')
  async checkout(
    @Body()
    body: CheckoutDto,
  ) {
    return this.orderService.checkout(body.userId);
  }

  @Get('/user/:userId')
  async getOrdersByUser(
    @Param('userId')
    userId: string,
  ) {
    return this.orderService.getOrdersByUser(userId);
  }
}

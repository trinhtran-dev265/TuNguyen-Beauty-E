import { Module } from '@nestjs/common';
import { UsersModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';
import { CartModule } from './modules/cart/cart.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [
    UsersModule,
    ProductModule,
    OrderModule,
    CartModule,
    DashboardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

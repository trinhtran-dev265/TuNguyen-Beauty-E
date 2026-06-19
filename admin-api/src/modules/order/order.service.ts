import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { firebaseAdmin } from 'src/firebase/firebase-admin';

import { UpdateOrderDto } from './dto/update-order.dto';

import { ApiResponse } from 'src/common/response/api-response';

import { ORDER_MESSAGE } from 'src/common/constants/order-message.constant';

@Injectable()
export class OrderService {
  async getOrders() {
    try {
      const snapshot = await firebaseAdmin
        .firestore()
        .collection('orders')
        .get();

      const orders = snapshot.docs.map((doc) => ({
        id: doc.id,

        ...doc.data(),

        createdAt: doc.data().createdAt?.toDate(),

        updatedAt: doc.data().updatedAt?.toDate(),
      }));

      return new ApiResponse(
        200,

        ORDER_MESSAGE.GET_SUCCESS,

        orders,
      );
    } catch {
      throw new HttpException(
        new ApiResponse(
          500,

          ORDER_MESSAGE.UNKNOWN_ERROR,
        ),

        500,
      );
    }
  }

  async getOrderById(id: string) {
    const order = await firebaseAdmin
      .firestore()
      .collection('orders')
      .doc(id)
      .get();

    if (!order.exists) {
      throw new HttpException(
        new ApiResponse(
          404,

          ORDER_MESSAGE.NOT_FOUND,
        ),

        404,
      );
    }

    return {
      id: order.id,

      ...order.data(),
    };
  }

  async updateStatus(
    id: string,

    data: UpdateOrderDto,
  ) {
    const orderRef = firebaseAdmin.firestore().collection('orders').doc(id);

    const order = await orderRef.get();

    if (!order.exists) {
      throw new HttpException(
        new ApiResponse(
          404,

          ORDER_MESSAGE.NOT_FOUND,
        ),

        404,
      );
    }

    await orderRef.update({
      status: data.status,

      updatedAt: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
    });

    return new ApiResponse(
      200,

      ORDER_MESSAGE.UPDATE_SUCCESS,
    );
  }

  async checkout(userId: string) {
    const cartRef = firebaseAdmin.firestore().collection('carts').doc(userId);

    const cartDoc = await cartRef.get();

    if (!cartDoc.exists) {
      throw new HttpException(
        new ApiResponse(
          HttpStatus.NOT_FOUND,

          'Giỏ hàng trống',
        ),

        HttpStatus.NOT_FOUND,
      );
    }

    const cartData = cartDoc.data();

    const items = cartData?.items || [];

    if (items.length === 0) {
      throw new HttpException(
        new ApiResponse(
          HttpStatus.BAD_REQUEST,

          'Giỏ hàng trống',
        ),

        HttpStatus.BAD_REQUEST,
      );
    }

    const total = items.reduce(
      (
        sum: number,

        item: {
          price: number;
          quantity: number;
        },
      ) => sum + item.price * item.quantity,

      0,
    );

    const timestamp = firebaseAdmin.firestore.FieldValue.serverTimestamp();

    const orderRef = firebaseAdmin.firestore().collection('orders').doc();

    await orderRef.set({
      customerId: userId,

      products: items,

      total,

      status: 'Pending',

      createdAt: timestamp,

      updatedAt: timestamp,
    });

    await cartRef.delete();

    return new ApiResponse(
      HttpStatus.CREATED,

      ORDER_MESSAGE.CHECKOUT_SUCCESS,

      {
        orderId: orderRef.id,
      },
    );
  }

  async getOrdersByUser(userId: string) {
    const snapshot = await firebaseAdmin
      .firestore()
      .collection('orders')
      .where('customerId', '==', userId)
      .get();

    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,

      ...doc.data(),

      createdAt: doc.data().createdAt?.toDate(),

      updatedAt: doc.data().updatedAt?.toDate(),
    }));

    return new ApiResponse(200, ORDER_MESSAGE.GET_SUCCESS, orders);
  }
}

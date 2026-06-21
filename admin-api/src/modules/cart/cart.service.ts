import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { firebaseAdmin } from 'src/firebase/firebase-admin';

import { AddCartDto } from './dto/add-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

import { ApiResponse } from 'src/common/response/api-response';
import { CART_MESSAGE } from 'src/common/constants/cart-message.contant';

@Injectable()
export class CartService {
  async addToCart(data: AddCartDto) {
    const cartRef = firebaseAdmin
      .firestore()
      .collection('carts')
      .doc(data.userId);

    const cartDoc = await cartRef.get();

    const timestamp = firebaseAdmin.firestore.FieldValue.serverTimestamp();

    if (!cartDoc.exists) {
      await cartRef.set({
        items: [
          {
            productId: data.productId,

            name: data.name,

            image: data.image,

            price: data.price,

            quantity: data.quantity,
          },
        ],

        updatedAt: timestamp,
      });
    } else {
      const cartData = cartDoc.data();

      const items = cartData?.items || [];

      const existingIndex = items.findIndex(
        (item: { productId: string }) => item.productId === data.productId,
      );

      if (existingIndex > -1) {
        items[existingIndex].quantity += data.quantity;
      } else {
        items.push({
          productId: data.productId,

          name: data.name,

          image: data.image,

          price: data.price,

          quantity: data.quantity,
        });
      }

      await cartRef.update({
        items,

        updatedAt: timestamp,
      });
    }

    return new ApiResponse(
      HttpStatus.OK,

      CART_MESSAGE.ADD_SUCCESS,
    );
  }

  async getCart(userId: string) {
    const cart = await firebaseAdmin
      .firestore()
      .collection('carts')
      .doc(userId)
      .get();

    if (!cart.exists) {
      return new ApiResponse(200, CART_MESSAGE.GET_SUCCESS, {
        items: [],
      });
    }

    return new ApiResponse(200, CART_MESSAGE.GET_SUCCESS, cart.data());
  }

  async updateQuantity(
    userId: string,

    productId: string,

    data: UpdateCartDto,
  ) {
    const cartRef = firebaseAdmin.firestore().collection('carts').doc(userId);

    const cart = await cartRef.get();

    if (!cart.exists) {
      throw new HttpException(
        new ApiResponse(
          HttpStatus.NOT_FOUND,

          CART_MESSAGE.NOT_FOUND,
        ),

        HttpStatus.NOT_FOUND,
      );
    }

    const items = cart.data()?.items || [];

    const updatedItems = items.map((item: { productId: string }) => {
      if (item.productId === productId) {
        return {
          ...item,

          quantity: data.quantity,
        };
      }

      return item;
    });

    await cartRef.update({
      items: updatedItems,

      updatedAt: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
    });

    return new ApiResponse(
      HttpStatus.OK,

      CART_MESSAGE.UPDATE_SUCCESS,
    );
  }

  async removeItem(
    userId: string,

    productId: string,
  ) {
    const cartRef = firebaseAdmin.firestore().collection('carts').doc(userId);

    const cart = await cartRef.get();

    if (!cart.exists) {
      throw new HttpException(
        new ApiResponse(
          HttpStatus.NOT_FOUND,

          CART_MESSAGE.NOT_FOUND,
        ),

        HttpStatus.NOT_FOUND,
      );
    }

    const items = cart.data()?.items || [];

    const filteredItems = items.filter(
      (item: { productId: string }) => item.productId !== productId,
    );

    await cartRef.update({
      items: filteredItems,

      updatedAt: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
    });

    return new ApiResponse(
      HttpStatus.OK,

      CART_MESSAGE.DELETE_SUCCESS,
    );
  }

  async clearCart(userId: string) {
    await firebaseAdmin.firestore().collection('carts').doc(userId).delete();

    return new ApiResponse(
      HttpStatus.OK,

      CART_MESSAGE.CLEAR_SUCCESS,
    );
  }
}

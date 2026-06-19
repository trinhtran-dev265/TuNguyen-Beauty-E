import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { firebaseAdmin } from 'src/firebase/firebase-admin';

import { CreateProductDto } from './dto/create-product.dto';

import { UpdateProductDto } from './dto/update-product.dto';

import { ApiResponse } from 'src/common/response/api-response';

import { PRODUCT_MESSAGE } from 'src/common/constants/product-message.constant';

@Injectable()
export class ProductService {
  async create(data: CreateProductDto) {
    try {
      const timestamp = firebaseAdmin.firestore.FieldValue.serverTimestamp();

      const productRef = firebaseAdmin.firestore().collection('products').doc();

      await productRef.set({
        name: data.name,

        description: data.description,

        category: data.category,

        skinType: data.skinType,

        price: data.price,

        stock: data.stock,

        image: data.image,

        isActive: true,

        createdAt: timestamp,

        updatedAt: timestamp,
      });

      return new ApiResponse(
        201,

        PRODUCT_MESSAGE.CREATE_SUCCESS,

        {
          id: productRef.id,
        },
      );
    } catch (error) {
      console.log(error);

      throw new HttpException(
        new ApiResponse(
          500,

          PRODUCT_MESSAGE.UNKNOWN_ERROR,
        ),

        500,
      );
    }
  }

  async getProducts() {
    const snapshot = await firebaseAdmin
      .firestore()
      .collection('products')
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,

      ...doc.data(),

      createdAt: doc.data().createdAt?.toDate(),

      updatedAt: doc.data().updatedAt?.toDate(),
    }));
  }

  async getProductById(id: string) {
    const product = await firebaseAdmin
      .firestore()
      .collection('products')
      .doc(id)
      .get();

    if (!product.exists) {
      throw new HttpException(
        new ApiResponse(404, PRODUCT_MESSAGE.NOT_FOUND),

        404,
      );
    }

    return {
      id: product.id,

      ...product.data(),

      createdAt: product.data()?.createdAt?.toDate(),

      updatedAt: product.data()?.updatedAt?.toDate(),
    };
  }

  async update(
    id: string,

    data: UpdateProductDto,
  ) {
    const productRef = firebaseAdmin.firestore().collection('products').doc(id);

    const product = await productRef.get();

    if (!product.exists) {
      throw new HttpException(
        new ApiResponse(
          404,

          PRODUCT_MESSAGE.NOT_FOUND,
        ),

        404,
      );
    }

    await productRef.update({
      ...data,

      updatedAt: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
    });

    return new ApiResponse(
      200,

      PRODUCT_MESSAGE.UPDATE_SUCCESS,
    );
  }

  async toggleStatus(id: string) {
    const productRef = firebaseAdmin.firestore().collection('products').doc(id);

    const product = await productRef.get();

    if (!product.exists) {
      throw new HttpException(
        new ApiResponse(404, PRODUCT_MESSAGE.NOT_FOUND),

        404,
      );
    }

    const currentStatus = product.data()?.isActive;

    await productRef.update({
      isActive: !currentStatus,

      updatedAt: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
    });

    return new ApiResponse(
      200,

      PRODUCT_MESSAGE.UPDATE_SUCCESS,
    );
  }

  async delete(id: string) {
    await firebaseAdmin.firestore().collection('products').doc(id).delete();

    return new ApiResponse(
      200,

      PRODUCT_MESSAGE.DELETE_SUCCESS,
    );
  }
}

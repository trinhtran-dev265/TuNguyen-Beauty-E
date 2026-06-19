import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import { firebaseAdmin } from 'src/firebase/firebase-admin';
import { AUTH_MESSAGE } from 'src/common/constants/auth-message.constant';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse } from 'src/common/response/api-response';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  async createUser(data: CreateUserDto) {
    try {
      const user = await firebaseAdmin.auth().createUser({
        email: data.email,
        password: data.password,
        displayName: data.displayName,
      });

      const timestamp = firebaseAdmin.firestore.FieldValue.serverTimestamp();

      await firebaseAdmin.firestore().collection('users').doc(user.uid).set({
        email: data.email,
        displayName: data.displayName,
        role: data.role,
        disabled: false,
        createdAt: timestamp,
        updatedAt: timestamp,
      });

      return {
        uid: user.uid,
      };
    } catch (error: unknown) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === 'auth/email-already-exists'
      ) {
        throw new ConflictException(AUTH_MESSAGE.EMAIL_EXISTED);
      }

      throw error;
    }
  }

  async getUsers() {
    const snapshot = await firebaseAdmin.firestore().collection('users').get();

    return snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        uid: doc.id,

        ...data,

        createdAt: data.createdAt?.toDate(),

        updatedAt: data.updatedAt?.toDate(),
      };
    });
  }

  async updateUser(uid: string, data: UpdateUserDto) {
    const updateData: Record<string, unknown> = {
      updatedAt: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
    };

    const authData: {
      email?: string;
      displayName?: string;
    } = {};

    if (data.displayName) {
      updateData.displayName = data.displayName;

      authData.displayName = data.displayName;
    }

    if (data.email) {
      updateData.email = data.email;

      authData.email = data.email;
    }

    if (data.role) {
      updateData.role = data.role;
    }

    await firebaseAdmin
      .firestore()
      .collection('users')
      .doc(uid)
      .update(updateData);

    // update Auth
    await firebaseAdmin.auth().updateUser(uid, authData);

    return new ApiResponse(200, 'Cập nhật thành công');
  }

  async updateStatus(uid: string, disabled: boolean) {
    try {
      await firebaseAdmin.auth().updateUser(uid, {
        disabled,
      });

      await firebaseAdmin.firestore().collection('users').doc(uid).update({
        disabled,

        updatedAt: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
      });

      return new ApiResponse(
        HttpStatus.OK,
        disabled ? 'Khóa tài khoản thành công' : 'Mở khóa tài khoản thành công',
      );
    } catch {
      throw new HttpException(
        new ApiResponse(HttpStatus.NOT_FOUND, AUTH_MESSAGE.USER_NOT_FOUND),
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deleteUser(uid: string) {
    try {
      await firebaseAdmin.auth().deleteUser(uid);

      await firebaseAdmin.firestore().collection('users').doc(uid).delete();

      return new ApiResponse(HttpStatus.OK, AUTH_MESSAGE.DELETE_SUCCESS);
    } catch {
      throw new HttpException(
        new ApiResponse(HttpStatus.NOT_FOUND, AUTH_MESSAGE.USER_NOT_FOUND),
        HttpStatus.NOT_FOUND,
      );
    }
  }
}

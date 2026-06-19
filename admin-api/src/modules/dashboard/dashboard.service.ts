import { Injectable } from '@nestjs/common';

import { firebaseAdmin } from 'src/firebase/firebase-admin';

import { ApiResponse } from 'src/common/response/api-response';

@Injectable()
export class DashboardService {
  async getStatistics() {
    const [usersSnapshot, productsSnapshot, ordersSnapshot] = await Promise.all(
      [
        firebaseAdmin.firestore().collection('users').get(),

        firebaseAdmin.firestore().collection('products').get(),

        firebaseAdmin.firestore().collection('orders').get(),
      ],
    );

    const totalRevenue = ordersSnapshot.docs.reduce(
      (sum, doc) => sum + (doc.data().total || 0),

      0,
    );

    return new ApiResponse(
      200,

      'Dashboard Statistics',

      {
        totalUsers: usersSnapshot.size,

        totalProducts: productsSnapshot.size,

        totalOrders: ordersSnapshot.size,

        totalRevenue,
      },
    );
  }
}

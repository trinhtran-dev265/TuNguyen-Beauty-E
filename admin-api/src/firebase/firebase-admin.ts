import * as admin from 'firebase-admin';
import serviceAccount from '../config/tunguyen-a8956-firebase-adminsdk-fbsvc-8fcbb4dce7.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const firebaseAdmin = admin;

export { firebaseAdmin };

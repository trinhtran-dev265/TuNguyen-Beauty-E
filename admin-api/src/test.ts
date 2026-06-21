import { firebaseAdmin } from "./firebase/firebase-admin";

async function test() {
  const snapshot = await firebaseAdmin
    .firestore()
    .collection('products')
    .get();

  console.log(snapshot.size);
}

test();
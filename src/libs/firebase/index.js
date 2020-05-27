import * as admin from 'firebase-admin';

const firebaseAdmin = admin.initializeApp({
  databaseURL: process.env.FIREBASE_URL,
  storageBucket: process.env.FIREBASE_BUCKET_ID,
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: 'testing',
  }),
});

export { firebaseAdmin };

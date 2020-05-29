import * as admin from 'firebase-admin';
import serviceAccountJson from './google-service-account.json';

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccountJson),
  databaseURL: process.env.FIREBASE_URL,
});

export { firebaseAdmin };

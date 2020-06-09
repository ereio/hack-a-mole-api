import * as admin from 'firebase-admin';

// Requires a google service account for a firebase project
// This may be given to you before starting the interview project
import serviceAccountJson from './google-service-account.json';

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccountJson),
  databaseURL: process.env.FIREBASE_URL,
});

export { firebaseAdmin };

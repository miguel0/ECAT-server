import * as admin from 'firebase-admin';

export async function initialize() {
    admin.initializeApp(
      {
        credential: admin.credential.applicationDefault()
      }
    );
}
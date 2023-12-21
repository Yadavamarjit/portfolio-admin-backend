import { initializeApp } from "firebase/app";
import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_BUCKET,
  FIREBASE_DATABASE_URL,
  FIREBASE_MESSAGE_SENDER_ID,
  FIREBASE_PROJECT_ID,
} from "./utils/envs.js";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGE_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

const initializeFirebase = () => {
  return initializeApp(firebaseConfig);
};

export { initializeFirebase };

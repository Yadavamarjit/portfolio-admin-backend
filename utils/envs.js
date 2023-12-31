import env from "dotenv";
env.config();
export const {
  PORT,
  DB_URI,
  SECRET_KEY,
  FIREBASE_APP_ID,
  FIREBASE_MESSAGE_SENDER_ID,
  FIREBASE_BUCKET,
  FIREBASE_PROJECT_ID,
  FIREBASE_DATABASE_URL,
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
} = process.env;

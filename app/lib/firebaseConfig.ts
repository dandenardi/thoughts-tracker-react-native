import Constants from "expo-constants";
import { initializeApp, getApps } from "firebase/app";

const extra = Constants.expoConfig?.extra ?? Constants.manifest?.extra ?? {};

const {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
} = extra;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

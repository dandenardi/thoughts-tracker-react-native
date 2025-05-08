import {initializeApp} from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
} from '@env';

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

// Inicializando o Firebase com a configuração
initializeApp(firebaseConfig);

// Exportando o módulo de autenticação
export {auth};

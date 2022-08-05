import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDxi5W4En4ExrisdwewFI9R9P6S5sH78ow',
  authDomain: 'movies-rlp.firebaseapp.com',
  projectId: 'movies-rlp',
  storageBucket: 'movies-rlp.appspot.com',
  messagingSenderId: '352417444906',
  appId: '1:352417444906:web:566d540b31530a1b5bff53',
  measurementId: 'G-M5VT5TLJLG',
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;

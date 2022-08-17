import { initializeApp } from 'firebase/app';
import { getFirestore, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC0CZhEbkwwWnPcdnrAfs-0MCCPdKozG_0',
  authDomain: 'thehometerminal.firebaseapp.com',
  projectId: 'thehometerminal',
  storageBucket: 'thehometerminal.appspot.com',
  messagingSenderId: '366798757465',
  appId: '1:366798757465:web:9d41b901e30f31d9badb48',
};

// initalize firebase app
const app = initializeApp(firebaseConfig);

// initialize firestore database
const db = getFirestore(app);

// initialize firebase auth
const auth = getAuth(app);

// initialize firebase storage
const storage = getStorage(app);

// timestamp
const timestamp = Timestamp.fromDate(new Date());

export { app, db, auth, storage, timestamp };

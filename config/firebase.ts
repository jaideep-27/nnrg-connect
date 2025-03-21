import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDnVqHy4vXBXNwQxl0VRhS-8QkCgLC2v5A",
  authDomain: "nnrg-connect.firebaseapp.com",
  projectId: "nnrg-connect",
  storageBucket: "nnrg-connect.appspot.com",
  messagingSenderId: "343239136814",
  appId: "1:343239136814:web:8a9b9b9b9b9b9b9b9b9b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };

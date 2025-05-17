import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "@firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "My_api",
  authDomain: "lab6-7a637.firebaseapp.com",
  projectId: "lab6-7a637",
  storageBucket: "lab6-7a637.firebasestorage.app",
  messagingSenderId: "788069096305",
  appId: "1:788069096305:web:8819970e8ffa2b0344f4d0",
  measurementId: "G-2JX5FY1TEC"
};

const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const auth = getAuth(app);

export { auth };

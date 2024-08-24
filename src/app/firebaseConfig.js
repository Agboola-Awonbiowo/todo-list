import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAas7FbeHfxwl4jSXZml-euuaigy697Vdo",
  authDomain: "todo-list-app-74000.firebaseapp.com",
  projectId: "todo-list-app-74000",
  storageBucket: "todo-list-app-74000.appspot.com",
  messagingSenderId: "597807843507",
  appId: "1:597807843507:web:288b88222766d7f63e48c6",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export { db };

import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAttDXBu4UWWscW0rPPouPFieVKGY34Q8o",
  authDomain: "next-instagram-6c494.firebaseapp.com",
  projectId: "next-instagram-6c494",
  storageBucket: "next-instagram-6c494.appspot.com",
  messagingSenderId: "418155890210",
  appId: "1:418155890210:web:a94b48dc4c1e4d8241ac7b",
  measurementId: "G-8RZZFT83YL",
}

const firebase = initializeApp(firebaseConfig)
const db = getFirestore(firebase)
const storage = getStorage(firebase)
export { db, storage }

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import fs from "fs";

const firebaseConfig = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function test() {
  try {
    const docRef = await addDoc(collection(db, "receipts"), {
      test: true,
      createdAt: serverTimestamp()
    });
    console.log("Success! Doc ID:", docRef.id);
  } catch (error) {
    console.error("Error:", error);
  }
}
test();

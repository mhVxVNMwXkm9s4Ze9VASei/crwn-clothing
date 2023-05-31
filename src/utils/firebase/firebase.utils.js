import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMdOwpZIjjLRdERqLa9Rrtj3BJ-_eTyn0",
  authDomain: "crwn-clothing-db-dd798.firebaseapp.com",
  projectId: "crwn-clothing-db-dd798",
  storageBucket: "crwn-clothing-db-dd798.appspot.com",
  messagingSenderId: "348171440596",
  appId: "1:348171440596:web:b042cac17d42c62d9a0641"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(
        userDocRef,
        {
          displayName,
          email,
          createdAt
        }
      );
    } catch (error) {
      console.log("Error creating the user.", error.message);
    }
  }

  return userDocRef;
}

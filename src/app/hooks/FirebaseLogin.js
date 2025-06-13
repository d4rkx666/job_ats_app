import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/services/firebase";
import { doc, getDoc } from "firebase/firestore";

// Firebase login function
export async function FirebaseLogin(email, password, login, error_message, current_work) {

   // Log in user from firebase
   const userCredential = await signInWithEmailAndPassword(auth, email, password);
   const userId = await userCredential.user.uid;
   const token = await userCredential.user.getIdToken();

   // Get info from firestore
   const userDoc = await getDoc(doc(db, "users", userId));

   if (userDoc.exists()) {
      const newData = userDoc.data();
      await login(newData, token); // set user info to localstorage
      if(current_work){
         window.close();
      }
   } else {
      throw new Error(error_message);
   }
}
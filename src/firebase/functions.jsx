import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export const saveUserToFirestore = async (user) => {
  try {
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: user.displayName || name,
      email: user.email,
      mobile: user.phoneNumber || mobile,
    });
  } catch (err) {
    console.error("Error saving user to Firestore:", err);
  }
};

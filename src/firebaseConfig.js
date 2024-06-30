import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, doc, updateDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgJaKT2vIM26sEYkXSUn2cdsKoe72W_44",
  authDomain: "gourmetai-c3818.firebaseapp.com",
  projectId: "gourmetai-c3818",
  storageBucket: "gourmetai-c3818.appspot.com",
  messagingSenderId: "434846086463",
  appId: "1:434846086463:web:3fc3d18f7cda2bf7de8f8a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Ensure Firestore has the user document
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, {
      displayName: user.displayName,
      photoURL: user.photoURL,
      email: user.email
    }, { merge: true });

    return user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

const updateUserProfile = async (uid, data) => {
  try {
    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, data);
  } catch (error) {
    console.error("Error updating Firestore user document:", error);
    throw error;
  }
};

const uploadAvatar = async (file, userId) => {
  try {
    const storageRef = ref(storage, `avatars/${userId}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading avatar:", error);
    throw error;
  }
};

export { auth, db, signInWithGoogle, logOut, updateUserProfile, uploadAvatar };
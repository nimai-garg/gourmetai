// Import Firebase functions
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updatePassword as firebaseUpdatePassword, 
  deleteUser 
} from "firebase/auth";
import { getFirestore, doc, setDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

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

const createUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Optionally add additional user data to Firestore
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, {
      email: user.email,
      // Add other fields if needed
    });

    return user;
  } catch (error) {
    console.error("Error creating user:", error.message); // Log any errors
    throw error;
  }
};

const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in with email:", error);
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

const updatePassword = async (newPassword) => {
  const user = auth.currentUser;
  if (user) {
    try {
      await firebaseUpdatePassword(user, newPassword);
    } catch (error) {
      console.error("Error updating password:", error);
      throw error;
    }
  } else {
    throw new Error("No user is signed in.");
  }
};

const deleteUserAccount = async () => {
  const user = auth.currentUser;
  if (user) {
    try {
      await deleteUser(user);
    } catch (error) {
      console.error("Error deleting user account:", error);
      throw error;
    }
  } else {
    throw new Error("No user is signed in.");
  }
};

export { auth, db, signInWithGoogle, logOut, createUser, signInWithEmail, updateUserProfile, uploadAvatar, updatePassword, deleteUserAccount };
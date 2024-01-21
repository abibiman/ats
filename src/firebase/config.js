
import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updatePassword , reauthenticateWithCredential, EmailAuthProvider
} from "firebase/auth";
import {
  getFirestore,doc,addDoc,collection,
  setDoc
} from "firebase/firestore";
import { getStorage} from 'firebase/storage';
import Swal from 'sweetalert2'



const firebaseConfig = {
  apiKey: "AIzaSyAHI2kpfT4gSpIuWxjOLiuyU5O1pozZwuY",
  authDomain: "abibiman-transportation.firebaseapp.com",
  projectId: "abibiman-transportation",
  storageBucket: "abibiman-transportation.appspot.com",
  messagingSenderId: "306696537811",
  appId: "1:306696537811:web:53fb6b59396ce7c132f626",
  measurementId: "G-W1RWF0R5SB"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider()



const signInWithGoogle = async () => {
  signInWithPopup(auth, googleProvider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
};

const signInWithFacebook = async () => {
  try {
    const res = await signInWithPopup(auth, facebookProvider);
  } catch (err) {
    console.log(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (err) {
    Swal.fire("Error", "Wrong Email or Password", "error");

  }
};

const registerWithEmailAndPassword = async (email,password,name,phone) => {
  try {
    console.log(name,phone)
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "Users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      phone
    });

  } catch (err) {
    console.log(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset link sent!");
  } catch (err) {
    console.log(err.message);
  }
};

const logout = () => {
  signOut(auth);
};


const updateUserPassword = updatePassword;
const reautenticate = reauthenticateWithCredential;
const emailAuthProvider = EmailAuthProvider;





export {
  auth,
  db,
  signInWithGoogle,
  signInWithFacebook,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  updateUserPassword,
  reautenticate,
  emailAuthProvider,



};
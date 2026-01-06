import { db } from "../firebase/firebase-config.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const auth = getAuth();
const provider = new GoogleAuthProvider();

// Sign Up
export async function signup(email, password, role, name) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  await setDoc(doc(db, "users", user.uid), { name, role });
  return user;
}

// Login
export async function login(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

// Google Login
export async function googleLogin() {
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  // Check if user exists in Firestore, if not create
  const userDoc = await getDoc(doc(db, "users", user.uid));
  if (!userDoc.exists()) {
    await setDoc(doc(db, "users", user.uid), { name: user.displayName, role: "user" });
  }
  return user;
}

// Redirect based on role
// Redirect based on role
export async function redirectUser(user) {
  const userDoc = await getDoc(doc(db, "users", user.uid));
  const role = userDoc.data().role;

  if (role === "user") {
    window.location.href = "../public/map.html";
  } else {
    window.location.href = "../public/business.html";
  }
}


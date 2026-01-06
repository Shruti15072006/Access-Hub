import { db } from "../firebase/firebase-config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

console.log("Firestore test script loaded");

// Create User
document.getElementById("createUserBtn").onclick = async () => {
  const name = document.getElementById("userName").value;
  const role = document.getElementById("userRole").value;

  if (!name || !role) return alert("Enter name and role");

  try {
    const docRef = await addDoc(collection(db, "users"), { name, role });
    alert(`User created with ID: ${docRef.id}`);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Create Place
document.getElementById("createPlaceBtn").onclick = async () => {
  const name = document.getElementById("placeName").value;
  const wheelchair = document.getElementById("wheelchair").checked;

  if (!name) return alert("Enter place name");

  try {
    const docRef = await addDoc(collection(db, "places"), { name, wheelchair });
    alert(`Place created with ID: ${docRef.id}`);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Create Review
document.getElementById("createReviewBtn").onclick = async () => {
  const placeId = document.getElementById("reviewPlaceId").value;
  const rating = parseInt(document.getElementById("reviewRating").value);
  const comment = document.getElementById("reviewComment").value;

  if (!placeId || !rating || !comment) return alert("Fill all review fields");

  try {
    const docRef = await addDoc(collection(db, "reviews"), { placeId, rating, comment });
    alert(`Review created with ID: ${docRef.id}`);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

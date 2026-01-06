import { db } from "../firebase/firebase-config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.getElementById("submitBusinessBtn").onclick = async () => {
  const name = document.getElementById("placeName").value;
  const type = document.getElementById("placeType").value;
  const ramp = document.getElementById("ramp").checked;
  const wheelchair = document.getElementById("wheelchair").checked;
  const toilet = document.getElementById("toilet").checked;
  const braille = document.getElementById("braille").checked;
  const notes = document.getElementById("notes").value;

  if (!name) return alert("Place name is required");

  try {
    await addDoc(collection(db, "places"), {
      name,
      type,
      ramp,
      wheelchair,
      toilet,
      braille,
      notes,
      rating: 0 // Initial rating
    });

    alert("Place submitted successfully!");
    // Clear form
    document.getElementById("placeName").value = "";
    document.getElementById("placeType").value = "Cafe";
    document.getElementById("ramp").checked = false;
    document.getElementById("wheelchair").checked = false;
    document.getElementById("toilet").checked = false;
    document.getElementById("braille").checked = false;
    document.getElementById("notes").value = "";
  } catch (e) {
    console.error("Error submitting place: ", e);
    alert("Error submitting place. Check console.");
  }
};

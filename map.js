import { db } from "../firebase/firebase-config.js";
import { collection, getDocs, addDoc, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let map;
let markers = [];
const infoWindow = new google.maps.InfoWindow();

// Initialize Google Map
async function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 28.6139, lng: 77.209 }, // Delhi default
    zoom: 12
  });

  await loadPlaces();
}

// Load places from Firestore and create markers
export async function loadPlaces() {
  // Clear previous markers
  markers.forEach(marker => marker.setMap(null));
  markers = [];

  try {
    const placesSnap = await getDocs(collection(db, "places"));

    placesSnap.forEach((docSnap) => {
      const data = docSnap.data();

      // Random lat/lng if not provided
      const lat = data.lat || 28.61 + Math.random() * 0.05;
      const lng = data.lng || 77.20 + Math.random() * 0.05;

      // Marker color based on rating
      let color;
      if (data.rating >= 4) color = "green";
      else if (data.rating >= 2) color = "yellow";
      else color = "red";

      const marker = new google.maps.Marker({
        position: { lat, lng },
        map,
        title: data.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: color,
          fillOpacity: 0.8,
          strokeWeight: 1,
        },
      });

      // Click marker to show place details + review form
      marker.addListener("click", () => {
        const content = `
          <div style="font-size:14px; line-height:1.4;">
            <strong>${data.name}</strong><br>
            Ramp: ${data.ramp ? "Yes" : "No"}<br>
            Wheelchair: ${data.wheelchair ? "Yes" : "No"}<br>
            Accessible Toilet: ${data.toilet ? "Yes" : "No"}<br>
            Braille: ${data.braille ? "Yes" : "No"}<br>
            Notes: ${data.notes || "N/A"}<br>
            Rating: ${data.rating || "N/A"} ⭐<br><br>
            <input type="number" id="reviewRating" placeholder="Your rating (1-5)" min="1" max="5" style="width:80px">
            <input type="text" id="reviewComment" placeholder="Your comment" style="width:180px"><br>
            <button id="submitReviewBtn">Submit Review</button>
          </div>
        `;
        infoWindow.setContent(content);
        infoWindow.open(map, marker);

        // Wait for DOM to render inside InfoWindow
        google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
          document.getElementById("submitReviewBtn").onclick = async () => {
            const rating = parseInt(document.getElementById("reviewRating").value);
            const comment = document.getElementById("reviewComment").value;

            if (!rating || !comment) return alert("Fill rating and comment");

            try {
              // Add review to Firestore
              await addDoc(collection(db, "reviews"), {
                placeId: docSnap.id,
                userId: "testUser", // Replace with actual logged-in user UID
                rating,
                comment
              });

              // Recalculate average rating
              const reviewsSnap = await getDocs(collection(db, "reviews"));
              let total = 0, count = 0;
              reviewsSnap.forEach((rDoc) => {
                if (rDoc.data().placeId === docSnap.id) {
                  total += rDoc.data().rating;
                  count++;
                }
              });
              const avgRating = total / count;

              // Update place rating in Firestore
              await setDoc(doc(db, "places", docSnap.id), { ...data, rating: avgRating });

              alert("Review submitted!");
              infoWindow.close();
              loadPlaces(); // Reload markers with updated rating
            } catch (e) {
              console.error("Error adding review: ", e);
            }
          };
        });
      });

      markers.push(marker);
    });
  } catch (error) {
    console.error("Error loading places: ", error);
  }
}

// Basic search filter
document.getElementById("searchInput").addEventListener("input", (e) => {
  const search = e.target.value.toLowerCase();
  markers.forEach((marker) => {
    const match = marker.getTitle().toLowerCase().includes(search);
    marker.setVisible(match);
  });
});

// Initialize map after window loads
window.onload = initMap;

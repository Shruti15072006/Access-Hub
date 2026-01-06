import { db } from "../firebase/firebase-config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const container = document.getElementById("suggestionsContainer");

function mockGeminiSuggestions(place) {
  const suggestions = [];

  if (!place.ramp)
    suggestions.push("Install a wheelchair-accessible ramp at the main entrance.");

  if (!place.braille)
    suggestions.push("Add braille signage for navigation and restroom access.");

  if (!place.toilet)
    suggestions.push("Upgrade restrooms to be accessible for wheelchair users.");

  if (!place.wheelchair)
    suggestions.push("Ensure sufficient space for wheelchair movement inside the premises.");

  if (suggestions.length === 0)
    suggestions.push("Maintain current accessibility standards and conduct regular audits.");

  return suggestions.slice(0, 3);
}

async function showSuggestions() {
  const placesSnap = await getDocs(collection(db, "places"));
  container.innerHTML = "";

  placesSnap.forEach(doc => {
    const place = doc.data();
    const suggestions = mockGeminiSuggestions(place);

    const div = document.createElement("div");
    div.className = "suggestion-card";
    div.innerHTML = `
      <h3>${place.name}</h3>
      <ul>${suggestions.map(s => `<li>${s}</li>`).join("")}</ul>
      <small>✨ Powered by Gemini AI (simulated)</small>
    `;
    container.appendChild(div);
  });
}

showSuggestions();

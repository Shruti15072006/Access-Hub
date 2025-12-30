# Access-Hub
AccessHub: A platform connecting differently-abled users with accessible places, allowing reviews, ratings, and AI suggestions for businesses.
 # AccessHub

AccessHub is a web application designed to improve accessibility awareness and support for businesses and public spaces. Users can explore places, check accessibility features, and submit reviews, while businesses can register their accessibility status and receive AI-generated improvement suggestions.

---

## Features

### User Features
- **Sign Up / Login**: Register with email/password or Google account.
- **Map View**: View all registered places on Google Maps with markers.
  - Color-coded markers based on accessibility ratings.
  - Search functionality to filter places.
- **Place Details**: Click on a marker to see detailed accessibility info.
- **Submit Reviews**: Users can rate and leave comments for places.
- **Logout**: Easy logout to return to home page.

### Business Features
- **Business Registration**: Add a business/place with accessibility features:
  - Ramp, Wheelchair, Accessible Toilet, Braille signage.
- **Notes**: Add any additional accessibility info.
- **AI Suggestions**: View simulated Gemini AI suggestions for improving accessibility.
- **Navigation**: Quick links to return to home page or AI suggestions page.

---

## Project Structure

AccessHub/
│
├─ public/ # Static files (HTML, CSS)
│ ├─ index.html
│ ├─ signup.html
│ ├─ login.html
│ ├─ map.html
│ ├─ business.html
│ ├─ gemini.html
│ └─ style.css
│
├─ src/ # JavaScript modules
│ ├─ auth.js # Authentication logic
│ ├─ business.js # Business form submission
│ ├─ gemini.js # AI suggestion simulation
│ └─ map.js # Google Maps integration
│
├─ firebase/ # Firebase configuration
│ └─ firebase-config.js
│
├─ assets/ # Optional: images, logos
├─ AI/ # Placeholder for AI integration
└─ README.md


---

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript (ES6 Modules)
- **Backend / Database**: Firebase Firestore & Firebase Auth
- **Google Services**: Google Maps API
- **AI Integration (Optional)**: Gemini AI / Simulated AI Suggestions

---

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository_url>
   cd AccessHub

   
2. **Configure Firebase**

Create a Firebase project.

Enable Authentication (Email/Password & Google).

Enable Firestore database.

Replace Firebase config in firebase/firebase-config.js.

3. **Run the project**

Open index.html in a browser (use a local server like VS Code Live Server for proper module support).

4. **Navigation Flow**

Home Page (index.html): Sign Up / Login / Login with Google.

Sign Up Page (signup.html): Users → map.html, Businesses → business.html.

Map Page (map.html): Displays places on Google Map with reviews.

Business Page (business.html): Submit new business details + AI suggestions.

AI Suggestions Page (gemini.html): View accessibility improvement suggestions.





Usage
User Flow

Sign up as a user.

View places on the map.

Click on a marker to see details.

Submit a review to improve ratings.

Business Flow

Sign up as a business.

Fill in the accessibility form.

Click the AI suggestions button to view improvement tips.

Notes

Gemini AI integration is simulated for demonstration purposes.

Ratings are averaged automatically and reflected on map marker colors:

Green: Rating ≥ 4

Yellow: Rating ≥ 2

Red: Rating < 2


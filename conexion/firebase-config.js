// conexion/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCZoSIdEZIZ8vFPU_8X4Lj3Eg5Fz0_zwrQ",
  authDomain: "miprimerapp-d64d2.firebaseapp.com",
  projectId: "miprimerapp-d64d2",
  storageBucket: "miprimerapp-d64d2.appspot.com",  // <-- aquí estaba mal `.app` ❌
  messagingSenderId: "405856968212",
  appId: "1:405856968212:web:7c5bef3e383659fa20d101"
};

// Inicializar Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

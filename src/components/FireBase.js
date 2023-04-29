import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getDatabase } from "firebase/database";
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDcZcGmr_FWj9SsKuyJbmtSQWSk_nusNKU",
    authDomain: "noteapplication-5a6bb.firebaseapp.com",
    projectId: "noteapplication-5a6bb",
    storageBucket: "noteapplication-5a6bb.appspot.com",
    messagingSenderId: "394195030436",
    appId: "1:394195030436:web:a5481b4862ea3643e97131",
    measurementId: "G-8SX46H2709"
  };


  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);

  export const db = getDatabase(app);


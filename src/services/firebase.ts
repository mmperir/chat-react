import firebase from "firebase";

let app: firebase.app.App;

if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: "AIzaSyBqV2P2GsV_EWbDXVi1AR6GMXhv-fDCtn0",
    authDomain: "chat-react-dd5ae.firebaseapp.com",
    projectId: "chat-react-dd5ae",
    storageBucket: "chat-react-dd5ae.appspot.com",
    messagingSenderId: "991447987696",
    appId: "1:991447987696:web:0e6b256c105a164a831935",
    measurementId: "G-RLWYYNLYEG",
  };

  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const FirebaseAuth = app.auth();

const FirebaseFirestore = app.firestore();

export { FirebaseAuth, FirebaseFirestore };

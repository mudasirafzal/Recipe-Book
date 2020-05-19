  import * as firebase from 'firebase/app'
  import "firebase/storage"

  // Your web app's Firebase configuration
  const config = {
    apiKey: "AIzaSyD1yAC_HVuv2l2PlpdXSGVyf3WAFuLJXsU",
    authDomain: "fir-cookbook-49f2a.firebaseapp.com",
    databaseURL: "https://cors-anywhere.herokuapp.com/https://fir-cookbook-49f2a.firebaseio.com",
    projectId: "fir-cookbook-49f2a",
    storageBucket: "fir-cookbook-49f2a.appspot.com",
    messagingSenderId: "325495887601",
    appId: "1:325495887601:web:036a35c3c1c9dd3f03fb50"
  };
  // Initialize Firebase
  export const app = firebase.initializeApp(config);
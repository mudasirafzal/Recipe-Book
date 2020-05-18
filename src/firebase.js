  import firebase from 'firebase'
  // Your web app's Firebase configuration
  const config = {
    apiKey: "AIzaSyD1yAC_HVuv2l2PlpdXSGVyf3WAFuLJXsU",
    authDomain: "fir-cookbook-49f2a.firebaseapp.com",
    databaseURL: "https://fir-cookbook-49f2a.firebaseio.com",
    projectId: "fir-cookbook-49f2a",
    storageBucket: "fir-cookbook-49f2a.appspot.com",
    messagingSenderId: "325495887601",
    appId: "1:325495887601:web:036a35c3c1c9dd3f03fb50"
  };
  // Initialize Firebase
  firebase.initializeApp(config);
  export default firebase;
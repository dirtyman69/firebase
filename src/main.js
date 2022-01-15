import Vue from 'vue'
import App from './App.vue'





// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5fFvNJFypWT7hdDqBafMFY1KtBY3Dfws",
  authDomain: "fir-31a9a.firebaseapp.com",
  projectId: "fir-31a9a",
  storageBucket: "fir-31a9a.appspot.com",
  messagingSenderId: "862448924439",
  appId: "1:862448924439:web:c6b18156d2380e3d4f2952"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
db
// Get a list of cities from your database
async function getCities(db) {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}

export default {getCities};

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { query, collection, endAt, orderBy, startAt, onSnapshot, getFirestore, getDocs, doc, addDoc, setDoc, updateDoc, where } from "@firebase/firestore";
import Constants from 'expo-constants';
const geofire = require("geofire-common")

// add firebase config
/*const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId
};*/
const firebaseConfig = {
  apiKey: "AIzaSyAAhzSqfeYVBD6rL9Fl5K1kmMj6hA3NWV0",
  authDomain: "party-near-you-710cf.firebaseapp.com",
  projectId: "party-near-you-710cf",
  storageBucket: "party-near-you-710cf.appspot.com",
  messagingSenderId: "1049403930099",
  appId: "1:1049403930099:web:972607c2a6677807918e86",
  measurementId: "G-6RD2P9HVC0"
};

// initialize firebase
initializeApp(firebaseConfig);

// initialize auth
const auth = getAuth();
const firestore = getFirestore()

export function createTestDoc() {
  addDoc(collection(firestore, "parties"), {name: "test party"})
}

export function listenParties(coords, radius) {
  var partyDocs = []
  const bounds = geofire.geohashQueryBounds([coords.latitude, coords.longitude], radius);
  const boundPromises = [];
  for (const b of bounds) {
      const q = query(collection(firestore, "parties"), orderBy("geohash"), startAt(b[0]), endAt(b[1]))
      //const q = query(collection(firestore, "parties"))
  /*const q = firestore.collection('parties')
      .orderBy('geohash')
      .startAt(b[0])
      .endAt(b[1]);*/

      boundPromises.push(getDocs(q))
      /*, (querySnapshot) => {
          var docs = []
          querySnapshot.forEach((snap) => docs.push({...snap.data(), id: snap.id}))
          console.log(docs.length)
          var updatedDocs = [...partyDocs]
          updatedDocs = updatedDocs.filter(doc => docs.findIndex(d => d.id == doc.id) == -1)
          partyDocs = [...updatedDocs, ...docs]
          callback(partyDocs)
      }));*/
  }
  return Promise.all(boundPromises)
}

export function attendParty(parties, coords) {
  const uid = auth.currentUser.uid
  if (parties.length > 0 && parties[0].distance < 0.1) {
    const update = {}
    update["user_"+uid] = true
    return updateDoc(doc(firestore, "parties", parties[0].id), update)
  } else {
    return new Promise((resolve, reject) => {
      const geohash = geofire.geohashForLocation([coords.latitude, coords.longitude])
      const newDoc = {geohash, loc: coords}
      newDoc[uid] = true
      addDoc(collection(firestore, "parties"), newDoc).then(() => resolve())
      
    })
    
  }
}

export function leaveParty(id) {
  const uid = auth.currentUser.uid
  const update = {}
  update["user_"+uid] = false
  return updateDoc(doc(firestore, "parties", id), update)
}

export function distance(coords1, coords2) {
  return geofire.distanceBetween([coords1.latitude, coords1.longitude], [coords2.latitude, coords2.longitude])
}

export function partiesListener (uid, callback) {
  onSnapshot(query(collection(firestore, "parties"), where("user_"+uid, "==", true)), callback)
}

export { auth, firestore };

import { query, collection, endAt, orderBy, startAt, onSnapshot, getFirestore, getDocs } from "@firebase/firestore";
import { firestore } from "./firebase";
const geofire = require("geofire-common")

export function listenParties(coords, radius) {
    var partyDocs = []
    const bounds = geofire.geohashQueryBounds([coords.latitude, coords.longitude], radius);
    const boundPromises = [];
    for (const b of bounds) {
        const q = query(collection(getFirestore(), "parties"), orderBy("geohash"), startAt(b[0]), endAt(b[1]))
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

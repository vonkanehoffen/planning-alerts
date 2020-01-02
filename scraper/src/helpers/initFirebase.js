import firebase from "firebase-admin";
import { GeoFirestore } from "geofirestore";
import config from "../../config";

firebase.initializeApp({
  credential: firebase.credential.cert(config.serviceAccountKey)
});

const firestore = firebase.firestore();

export function initGeoCollection(collectionPath) {
  const geoFirestore = new GeoFirestore(firestore);
  return geoFirestore.collection(collectionPath);
}

export function initCollection(collectionPath) {
  return firestore.collection(collectionPath);
}

import firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyDQSX4Odykxq61fZLyg4ENVNjf65Ldf340",
  authDomain: "fir-sample-e53cf.firebaseapp.com",
  projectId: "fir-sample-e53cf",
  storageBucket: "fir-sample-e53cf.appspot.com",
  messagingSenderId: "944661340781",
  appId: "1:944661340781:web:b755142210a49381c41564"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig) 

const db = firebase.firestore();
export const auth = firebase.auth();
export default firebase;

export const getFirebaseItems = async () => {
  try {
    const snapshot = await db
      .collection("todos")
      .get();
    const items = snapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id })
    );
    return items;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export const addFirebaseItem = async (item) => {
  try {
    const todoRef = db.collection("todos");
    await todoRef.add(item);
  } catch (err) {
    console.log(err);
  }
}

export const updateFirebaseItem = async (item, id) => {
  try {
    const todoRef = db.collection("todos").doc(id);
    await todoRef.update(item);
  } catch (err) {
    console.log(err);
  }
}

export const clearFirebaseItem = async (item) => {
  const todoRef = db.collection("todos").doc(item.id);
  await todoRef.delete().then(function () {
  }).catch(function (err) {
    console.log(err);
  });
}; 
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, updateDoc, getDocs, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import uniqid from 'uniqid';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA1Lqa96CtQs2pRTJpL2R0hCkMsV5MOEfQ",
    authDomain: "kocopink-a6326.firebaseapp.com",
    projectId: "kocopink-a6326",
    storageBucket: "kocopink-a6326.appspot.com",
    messagingSenderId: "122787514780",
    appId: "1:122787514780:web:c68ae0b8c46489c7c96059"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);
export const productos = collection(db, "productos");

onAuthStateChanged(auth, async (usuarioFirebase) => {
    if (usuarioFirebase) {
        const uid = usuarioFirebase.uid;
        localStorage.setItem('usuarioFirebase', uid)
        const dataUsers = await queryData('usuarios')
        const users = dataUsers.docs
        let id = ''
        users.forEach(async (doc) => {
            if (doc.data().email === usuarioFirebase.email && !doc.data().uid) {
                id = doc.id
                await updateData('usuarios', id, { uid: uid })
            }
            if (doc.data().email === usuarioFirebase.email) {
                localStorage.setItem('rol', doc.data().rol)
            }
        })
    }
});

export async function crearUsuario(email, rol, password) {
    try {
        const id = uniqid()
        await setDoc(doc(db, "usuarios", id), {
            email: email,
            rol: rol,
            password: password
        });
    } catch (error) {
        console.log(error)
    }
}

export async function updateData(collection, document, collectionObject) {
    const docRef = doc(db, collection, document);
    await updateDoc(docRef, collectionObject);
}

export async function queryData(collectionName) {
    let queryCollection = collection(db, collectionName)
    return await getDocs(queryCollection)
}






export default firebaseApp;
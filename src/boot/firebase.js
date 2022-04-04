import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'

// Agregar configuración firebase:
const firebaseConfig = {
  apiKey: 'AIzaSyCLs0fHDkgJDfGF8wISwNrlYNAqZUoTBXU',
  authDomain: 'gymapp-40596.firebaseapp.com',
  projectId: 'gymapp-40596',
  storageBucket: 'gymapp-40596.appspot.com',
  messagingSenderId: '40599583754',
  appId: '1:40599583754:web:6214cd2f2edfde6096f3f3',
  measurementId: 'G-JNE2TQ6W82'
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAuth = firebaseApp.auth()
const db = firebase.firestore()
const storage = firebase.storage()

export { firebaseApp, firebaseAuth, db, storage, firebase }

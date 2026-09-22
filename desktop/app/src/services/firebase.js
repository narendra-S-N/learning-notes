import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAwXgC8oJLF8m_j2x9Npj6c1B99cFmMwtM',
  authDomain: 'tutorials-7d663.firebaseapp.com',
  projectId: 'tutorials-7d663',
  storageBucket: 'tutorials-7d663.firebasestorage.app',
  messagingSenderId: '797074958648',
  appId: '1:797074958648:web:cc11828e641749f322b9cd',
  measurementId: 'G-N116MG5SXD',
}

const firebaseApp = initializeApp(firebaseConfig)
getAnalytics(firebaseApp)

export const db = getFirestore(firebaseApp)

// import firebase from 'firebase/app'
import firebase from '@firebase/app'
import 'firebase/firebase-auth'
import 'firebase/storage'

// set firebase config
const firebaseConfig = ({
    apiKey: "AIzaSyCNlUokbGheiMI28NDE9r7XGj2ObnRvf7I",
    authDomain: "belio-mblwts.firebaseapp.com",
    databaseURL: "https://belio-mblwts.firebaseio.com",
    projectId: "belio-mblwts",
    storageBucket: "belio-mblwts.appspot.com",
    messagingSenderId: "342801265148",
    appId: "1:342801265148:web:ad891a3c70c0e619180279",
    measurementId: "G-3K9EZBP5GK"
});

const fb = firebase.initializeApp(firebaseConfig)
const storage = firebase.storage()

export { fb, storage }
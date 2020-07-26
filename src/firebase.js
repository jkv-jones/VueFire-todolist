import Firebase from 'firebase'
 
let config ={
    apiKey: "AIzaSyDdMhInYYpJFk8eCYMYmNLYT2PlLEr1bO0",
    authDomain: "todolist-c0e13.firebaseapp.com",
    databaseURL: "https://todolist-c0e13.firebaseio.com",
    projectId: "todolist-c0e13",
    storageBucket: "todolist-c0e13.appspot.com",
    messagingSenderId: "289860298297",
    appId: "1:289860298297:web:d3a3e1a6ae962698998fe8",
    measurementId: "G-7CNRCFXDCE"
}

let app= Firebase.initializeApp(config);
export let db= app.firestore();

export let todosCollection = db.collection('todos');

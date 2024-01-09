import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8TnnRXthu_rOB7jo4Y9SkrI6d5LuMrfo",
  authDomain: "react-blog-app-7487a.firebaseapp.com",
  projectId: "react-blog-app-7487a",
  storageBucket: "react-blog-app-7487a.appspot.com",
  messagingSenderId: "42844810831",
  appId: "1:42844810831:web:e97087c5a20516c03b043a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
// import firebase from 'firebase/app';
import './App.css';
import Main from './Components/Main';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
    // Set the configuration for your app
    // TODO: Replace with your app's config object
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    /* const firebaseConfig = {
        apiKey: 'AIzaSyAeqMDqEP_1DapCbNDAsWi3vE589zAY3pg',
        authDomain: 'hotel-booking-8c03a.firebaseapp.com',
        databaseURL: 'https://hotel-booking-8c03a-default-rtdb.firebaseio.com',
        projectId: 'hotel-booking-8c03a',
        storageBucket: 'hotel-booking-8c03a.appspot.com',
        messagingSenderId: '775155769072',
        appId: '1:775155769072:web:28b18f82282f4beb31ec35',
        measurementId: 'G-DY755BNP49',
    };

    firebase.initializeApp({ firebaseConfig }); */

    return (
        <div>
            <Provider store={store}>
                <BrowserRouter>
                    <Main />
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;

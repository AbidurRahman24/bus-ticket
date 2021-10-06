import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
// firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }else {
    firebase.app();
  }
  

const GoogleLogin = () => {

    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
      })
      const [loggedInUser, setLoggedInUser ] = useContext(UserContext)
      let history = useHistory();
      let location = useLocation();
  
      let { from } = location.state || { from: { pathname: "/" } };

      const provider = new firebase.auth.GoogleAuthProvider();
      const handleSignIn = () => {
        firebase.auth().signInWithPopup(provider)
        .then(res => {
          const {displayName, photoURL, email} = res.user;
          const signedInUser = {
            isSignedIn: true,
            name: displayName,
            email: email,
            photo: photoURL
          }
          setUser(signedInUser);
          setLoggedInUser(signedInUser)
          history.replace(from)
    
        })
        .catch(err => {
          console.log(err);
          console.log(err.message);
        })
      }
    
      const handleSignOut = () => {
        firebase.auth().signOut()
        .then(res => {
          const signedOutUser = {
            isSignedIn: false,
            name: '',
            email: '',
            photo: ''
          }
          setUser(signedOutUser);
          console.log(res);
        }).catch(err => {
          console.log(err);
        });
      }
    return (
        <div className='d-flex justify-content-center'>
            { user.isSignedIn ? <button className='btn btn-primary' onClick={handleSignOut}>Sign Out with Google</button> :
        <button className='btn btn-primary' onClick={handleSignIn}>Sign In with Google</button>
      }
      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}!</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt=""/>
        </div>
      }
        </div>
    );
};

export default GoogleLogin;
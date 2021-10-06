import React, { useContext, useState } from 'react';
import './Login.css'
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import GoogleLogin from './GoogleLogin';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }



const Login = () => {
  const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false,
    })
    const [loggedInUser, setLoggedInUser ] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };
  const provider = new firebase.auth.GoogleAuthProvider();
    const handleSignIn = () => {
        firebase.auth().signInWithPopup(provider)
            .then(res => {
                const { displayName, photoURL, email } = res.user;
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

const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === 'email') {
        isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
        const isPasswordValid = e.target.value.length > 6;
        const passwordHasNumber = /\d{1}/.test(e.target.value);
        isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
        const newUserInfo = { ...user };
        newUserInfo[e.target.name] = e.target.value;
        setUser(newUserInfo);
    }
}
const handleSubmit = (e) => {
    if (user.email && user.password) {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((res) => {
                const newUserInfo = { ...user };
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo);
                updateUserName(user.name);
                console.log('sign in user info', res.user);
            })
            .catch((error) => {
                const newUserInfo = { ...user };
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo);
            });

    }
    if (!newUser && user.email && user.password) {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUserInfo = { ...user };
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo);
                setLoggedInUser(newUserInfo)
                history.replace(from)
                console.log('sign in user info', res.user);
            })
            .catch((error) => {
                const newUserInfo = { ...user };
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo);
            });
    }
    e.preventDefault()
}
const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name
    }).then(() => {
        console.log('update successfully');
    }).catch((error) => {
        console.log(error);
    });
}


    return (
        <div>
            <div class="signup-form">
                <form onSubmit={handleSubmit} method="post">
                  {
                    newUser ? <h2>Create Account</h2> : <h2>Login</h2>
                  }
                    
                    <div class="form-group">
                        <div class="input-group">
                            
                            {
                            newUser &&
                                    <input type="text" onBlur={handleBlur} class="form-control" name="name" placeholder="Username" required="required" /> 
                            }
                            
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            
                            <input type="email" onBlur={handleBlur} class="form-control" name="email" placeholder="Email Address" required="required" />
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <input type="password" onBlur={handleBlur} class="form-control" name="password" placeholder="Password" required="required" />
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                        {
                            newUser &&
                            <input type="password" onBlur={handleBlur} class="form-control" name="confirm_password" placeholder="Confirm Password" required="required" />
                            }
                            
                        </div>
                    </div>
                    <div class="form-group">
                    <input type="submit" class="btn btn-primary btn-block btn-lg" value={newUser ? 'Create Account' : 'Login'} />
                    </div>
                    <p class="small text-center">By clicking the Sign Up button, you agree to our <br /><a href="/">Terms &amp; Conditions</a>, and <a href="/">Privacy Policy</a>.</p>
                </form>
                {
                  newUser ? <div class="text-center text-white">Already have an account? <input type='checkbox' onChange={() => setNewUser(!newUser)} name="newUser"/>Login here</div> :
                  <div class="text-center text-white">Don't have an account <input type='checkbox' onChange={() => setNewUser(!newUser)} name="newUser"/>Creat an account</div>
                }
            </div>
            <p style={{ color: 'red' }}>{user.error}</p>
      {user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} successfully</p>}

                <div>
                  <GoogleLogin/>
                </div>

        </div>
    );
};

export default Login;
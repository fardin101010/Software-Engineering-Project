import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const AuthContext = createContext(null);
const auth = getAuth(app);
import PropTypes from 'prop-types';
import app from "../Firebase/firebase.config";
import axios from "axios";

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, currentUser => {
    //         setUser(currentUser);
    //         setLoading(false);
    //         const loggedUser = { email: currentUser.email }
    //         if (currentUser) {
    //             axios.post('https://job-finder-server-lake.vercel.app/jwt', loggedUser, {
    //                 withCredentials: true
    //             })
    //                 .then(res => {
    //                     console.log(res.data);
    //                 })
    //         }
    //     });
    //     return () => {
    //         return unsubscribe();
    //     }
    // }, [])

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, currentUser => {
    //         const userEmail = currentUser?.email || user?.email;
    //         const loggedUser = { email: userEmail };
    //         setUser(currentUser);
    //         console.log('current user', currentUser);
    //         setLoading(false);
    //         // if user exists then issue a token
    //         if (currentUser) {
    //             axios.post('https://job-finder-server-lake.vercel.app/jwt', loggedUser, { withCredentials: true })
    //                 .then(res => {
    //                     console.log('token response', res.data);
    //                 })
    //         }
    //         else {
    //             axios.post('https://job-finder-server-lake.vercel.app/logout', loggedUser, {
    //                 withCredentials: true
    //             })
    //                 .then(res => {
    //                     console.log(res.data);
    //                 })
    //         }
    //     });
    //     return () => {
    //         return unsubscribe();
    //     }
    // }, [])



    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        setLoading
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {
                children
            }

        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {

    children: PropTypes.object.isRequired,

}

export default AuthProvider;
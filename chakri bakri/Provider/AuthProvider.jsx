import { createContext, useContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import UseAxiosPublic from "../Page/Hook/UseAxiosPublic";
import app from "../Firebase/firebase.config";
import { sendEmailVerification } from "firebase/auth";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = UseAxiosPublic();

    // Create user function with email verification
    const createUser = async (email, password, name, photo) => {
        setLoading(true);
        try {
            // Register user with email and password
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const currentUser = result.user;
            
            // Send email verification to the user
            await sendEmailVerification(currentUser);
            
            // Update the user profile with their name and photo
            await updateProfile(currentUser, {
                displayName: name,
                photoURL: photo,
            });

            // Save user to the database
            const userInfo = { name, email, photoURL: photo, isVerified: false };  // Default to unverified
            await axiosPublic.post('/users', userInfo);

            return result;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Update user profile (name and photo)
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        });
    };

    // Sign-in function with email verification check
    const signIn = async (email, password) => {
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const currentUser = result.user;

            if (!currentUser.emailVerified) {
                throw new Error("Please verify your email before logging in.");
            }

            return result;
        } catch (error) {
            console.error("Error signing in:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Log-out function
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    // Google Sign-In function
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // Monitor the authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser && currentUser.emailVerified) {
                setUser(currentUser);

                // Send a request to your backend to fetch JWT token for the authenticated user
                axiosPublic.post('jwt/', { email: currentUser.email })
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                        }
                    });
            } else {
                setUser(null);
                localStorage.removeItem('access-token');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [axiosPublic]);

    // Provide authentication context to the rest of the app
    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        updateUserProfile,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

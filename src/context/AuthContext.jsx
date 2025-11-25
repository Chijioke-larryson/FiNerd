import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { useState, useEffect, useContext, createContext } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [globalUser, setGlobalUser] = useState(null);
    const [globalData, setGlobalData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    function logout() {
        setGlobalUser(null);
        setGlobalData({});
        return signOut(auth);
    }

    const value = { globalUser, globalData, setGlobalData, isLoading, signup, login, logout };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setGlobalUser(user);

            if (!user) {
                setGlobalData({});
                return;
            }

            try {
                setIsLoading(true);
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setGlobalData(docSnap.data()); // <-- load Firestore data
                } else {
                    setGlobalData({});
                }
            } catch (err) {
                console.error(err.message);
            } finally {
                setIsLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);


    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

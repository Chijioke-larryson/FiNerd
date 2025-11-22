import { useEffect, useState, useContext, createContext } from "react";
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}
export const Authentication = (props) => {
    const { globalUser, isLoading } = useAuth();
    const navigate = useNavigate();
    const { handleCloseModal } = props;

    useEffect(() => {
        if (!isLoading && globalUser) {
            // Redirect immediately if user is logged in
            navigate("/dashboard"); // or any page you want
            handleCloseModal?.(); // close the modal if it's open
        }
    }, [globalUser, isLoading, isLoading, useNavigate]);

    // rest of your Authentication code
};

export function AuthProvider({ children }) {
    const [globalUser, setGlobalUser] = useState(null);
    const [globalData, setGlobalData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    async function signup(email, password) {

        try{
            return await  createUserWithEmailAndPassword(auth, email, password);
        }catch (e) {
            console.error("Signup Error:", e.message);
            throw e;

        }

    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    function logout() {
        setGlobalUser(null);
        setGlobalData(null);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setGlobalUser(user);

            console.log('CURRENT USER: ', user)

            if (!user) {
                console.log('No active user')
                setGlobalData(null);
                return;
            }

            try {
                setIsLoading(true);

                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                let firebaseData = {};
                if (docSnap.exists()) {
                    console.log("Found User Data");
                    firebaseData = docSnap.data();
                }

                setGlobalData(firebaseData);
            } catch (e) {
                console.log(e.message);
            } finally {
                setIsLoading(false);
            }
        });

        return () => {
            unsubscribe()
        };
    }, []);

    const value = {
        globalUser,
        globalData,
        setGlobalData,
        isLoading,
        signup,
        login,
        resetPassword,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

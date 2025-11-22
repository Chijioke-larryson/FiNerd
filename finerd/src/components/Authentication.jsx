import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

export const Authentication = ({ handleCloseModal }) => {
    const [isRegistration, setIsRegistration] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [error, setError] = useState(null);

    const { signup, login } = useAuth();

    // ----------------------------
    // HANDLE MAIN AUTH BUTTON
    // ----------------------------
    async function handleAuthenticate() {
        setError(null);

        // Basic validation
        if (!email.includes("@") || password.length < 6) {
            setError("Enter a valid email and a password of at least 6 characters.");
            return;
        }

        try {
            setIsAuthenticating(true);

            if (isRegistration) {
                // SIGN UP
                await signup(email, password);
            } else {
                // LOGIN
                await login(email, password);
            }

            handleCloseModal();
        } catch (error) {
            console.log(error.code);

            // Firebase error handling
            switch (error.code) {
                case "auth/user-not-found":
                    setError("No account found with this email.");
                    break;

                case "auth/wrong-password":
                    setError("Incorrect password.");
                    break;

                case "auth/invalid-email":
                    setError("Invalid email format.");
                    break;

                case "auth/invalid-credential":
                    setError("Invalid credentials");
                    break;

                case "auth/email-already-in-use":
                    setError("Login");
                    break;



                case "auth/too-many-requests":
                    setError("Too many attempts. Try again later.");
                    break;

                default:
                    setError("An unknown error occurred.");
            }
        } finally {
            setIsAuthenticating(false);
        }
    }

    return (
        <>
            {/* HEADER */}
            <h2 className="sign-up-text">
                {isRegistration ? "Sign Up" : "Login"}
            </h2>

            <p>{isRegistration ? "Create an account" : "Sign in to your account"}</p>

            {/* INPUTS */}
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
            />

            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="******"
                type="password"
            />

            {/* ERROR DISPLAY */}
            {error && <div className="error-box shake">{error}</div>}

            {/* SUBMIT BUTTON */}
            <button onClick={handleAuthenticate} disabled={isAuthenticating}>
                {isAuthenticating ? "Authenticating..." : "Submit"}
            </button>

            {/* SWITCH BETWEEN LOGIN / SIGN UP */}
            <div className="register-content">
                <p>
                    {isRegistration
                        ? "Already have an account?"
                        : "Don’t have an account?"}
                </p>

                <button
                    onClick={() => {
                        setIsRegistration(!isRegistration);
                        setError(null); // Clear errors when switching
                    }}
                >
                    {isRegistration ? "Sign In" : "Sign Up"}
                </button>
            </div>
        </>
    );
};

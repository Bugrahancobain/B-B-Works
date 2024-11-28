"use client";

import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./login.css"

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const router = useRouter();
    const locale = "en"; // Varsayılan dil

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Firebase giriş işlemi
            await signInWithEmailAndPassword(auth, email, password);
            router.push(`/${locale}/admin`);
            console.log("Redirected to admin page"); // Başarılı girişte admin sayfasına yönlendir
        } catch (err) {
            setError("Invalid email or password. Please try again.");
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            setError("Please enter your email address first.");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("Password reset email sent! Please check your inbox.");
            setError(null); // Hata mesajını temizle
        } catch (err) {
            setError("Failed to send password reset email. Please try again.");
        }
    };

    return (
        <div className="loginPageMain">

            <form className="formClass" onSubmit={handleLogin}>
                <h1>Login</h1>
                <div className="loginPageInputDiv">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {message && <p style={{ color: "green" }}>{message}</p>}
                </div>
                <div className="loginPageBtnDiv">
                    <button type="submit">Login</button>

                    <button onClick={handleForgotPassword} style={{ marginTop: "10px" }}>
                        Forgot Password?
                    </button>
                </div>
            </form>
        </div>
    );
}
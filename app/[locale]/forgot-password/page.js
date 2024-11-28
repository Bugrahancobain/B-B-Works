"use client";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("Password reset email sent! Check your inbox.");
        } catch (err) {
            setMessage("Error sending reset email. Please try again.");
        }
    };

    return (
        <div>
            <h1>Forgot Password</h1>
            <form onSubmit={handleResetPassword}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Send Reset Email</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
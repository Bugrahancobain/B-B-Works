import admin from "firebase-admin";

let serviceAccount;

try {
    serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK);
} catch (error) {
    console.error("Error parsing FIREBASE_ADMIN_SDK environment variable:", error);
    throw new Error("FIREBASE_ADMIN_SDK environment variable is not set or is invalid.");
}

// Admin SDK'yı tekrar başlatmayı önlemek için
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL, // Realtime Database URL
    });
}
const adminRTDB = admin.database(); // Realtime Database erişimi

export { adminRTDB };


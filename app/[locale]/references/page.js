import React from "react";
import { adminRTDB } from "../../../firebaseAdmin";
import ReferencesGrid from "./ReferencesGrid"; // Client Component

// Server-side Firebase'den referansları çekmek için
export async function fetchReferences() {
    try {
        const snapshot = await adminRTDB.ref("references").once("value");
        const data = snapshot.val();
        const referencesArray = data
            ? Object.entries(data).map(([id, reference]) => ({ id, ...reference }))
            : [];
        return referencesArray;
    } catch (error) {
        console.error("Error fetching references:", error);
        throw new Error("Could not fetch references");
    }
}

export default async function ReferencesPage({ params }) {
    const locale = params?.locale || "en";
    const references = await fetchReferences();

    // Referansları Client Component'e geçiyoruz
    return <ReferencesGrid references={references} locale={locale} />;
}
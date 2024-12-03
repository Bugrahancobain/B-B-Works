import React from "react";
import { adminRTDB } from "../../../../firebaseAdmin";
import ReferenceDetailClient from "./ReferenceDetailClient";

export async function fetchReferenceData(id) {
    try {
        // Tek bir referansı çek
        const snapshot = await adminRTDB.ref(`references/${id}`).once("value");
        const reference = snapshot.val();

        // Tüm referansları çek
        const allReferencesSnapshot = await adminRTDB.ref("references").once("value");
        const allReferences = allReferencesSnapshot.val();
        const referencesArray = allReferences
            ? Object.entries(allReferences).map(([id, ref]) => ({ id, ...ref }))
            : [];

        return { reference, references: referencesArray };
    } catch (error) {
        console.error("Error fetching reference data:", error);
        throw new Error("Could not fetch reference data");
    }
}

export default async function ReferenceDetailPage({ params }) {
    const id = params?.id;
    const locale = params?.locale || "en";

    const { reference, references } = await fetchReferenceData(id);

    if (!reference) {
        throw new Error("Reference not found");
    }

    return (
        <ReferenceDetailClient
            reference={reference}
            references={references}
            locale={locale} // locale açıkça iletiliyor
        />
    );
}
// app/[locale]/ourServices/page.js
import React from "react";
import { adminRTDB } from "../../../firebaseAdmin"; // Firebase Admin
import OurServicesClient from "./OurServicesClient"; // İstemci bileşeni
import "./ourServices.css";

export async function fetchServicesAndReferences() {
    try {
        const [servicesSnapshot, referencesSnapshot] = await Promise.all([
            adminRTDB.ref("services").once("value"),
            adminRTDB.ref("references").once("value"),
        ]);

        const servicesData = servicesSnapshot.val();
        const referencesData = referencesSnapshot.val();

        const services = servicesData
            ? Object.entries(servicesData).map(([id, service]) => ({ id, ...service }))
            : [];
        const referencesCount = referencesData ? Object.keys(referencesData).length : 0;

        return { services, referencesCount };
    } catch (error) {
        console.error("Error fetching data:", error);
        return { services: [], referencesCount: 0 };
    }
}

export default async function OurServicesPage({ params }) {
    const locale = params?.locale || "en";
    const { services, referencesCount } = await fetchServicesAndReferences();

    return (
        <OurServicesClient
            locale={locale}
            services={services}
            referencesCount={referencesCount}
        />
    );
}
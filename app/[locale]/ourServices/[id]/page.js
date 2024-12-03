import React from "react";
import { adminRTDB } from "../../../../firebaseAdmin";
import ServiceDetailClient from "./ServiceDetailClient";

export async function fetchServiceData(id) {
    try {
        // Tekil hizmeti çek
        const serviceSnapshot = await adminRTDB.ref(`services/${id}`).once("value");
        const serviceData = serviceSnapshot.val();

        // Eğer hizmet bulunamazsa
        if (!serviceData) {
            return { service: null, services: [] };
        }

        // Tüm hizmetleri çek
        const allServicesSnapshot = await adminRTDB.ref("services").once("value");
        const allServicesData = allServicesSnapshot.val();

        const services = allServicesData
            ? Object.entries(allServicesData).map(([id, service]) => ({ id, ...service }))
            : [];

        return { service: { id, ...serviceData }, services };
    } catch (error) {
        console.error("Error fetching service data:", error);
        return { service: null, services: [] };
    }
}

export default async function ServiceDetailPage({ params }) {
    const { id } = params;
    const locale = params?.locale || "en";

    const { service, services } = await fetchServiceData(id);

    if (!service) {
        return <p>Service not found</p>;
    }

    return (
        <ServiceDetailClient
            locale={locale}
            service={service}
            services={services}
        />
    );
}
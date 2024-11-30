"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { realtimeDb } from "../../../../firebase"; // Firebase bağlantısı
import { ref, onValue } from "firebase/database";
import "./serviceDetail.css";

function ServiceDetailPage({ params }) {
    // Dinamik parametreleri çöz
    const resolvedParams = React.use(params);
    const id = resolvedParams?.id; // Hizmet ID'si
    const locale = resolvedParams?.locale || "en"; // Varsayılan dil 'en'

    const router = useRouter();
    const [service, setService] = useState(null);

    useEffect(() => {
        if (!id) return;

        const serviceRef = ref(realtimeDb, `services/${id}`);
        onValue(serviceRef, (snapshot) => {
            const data = snapshot.val();
            if (!data) {
                // Veri yoksa geri yönlendir
                router.push(`/${locale}/ourServices`);
            } else {
                setService(data);
            }
        });
    }, [id, locale]);

    if (!service) {
        return <p>Loading...</p>; // Veri yüklenirken gösterilecek içerik
    }

    return (
        <div className="serviceDetailPage">
            <div className="serviceDetailHeader">
                <h1>{service.title[locale]}</h1>
                <img src={service.image} alt={service.title[locale]} />
            </div>
            <div className="serviceDetailContent">
                <h3>Short Description:</h3>
                <p>{service.shortDescription[locale]}</p>

                <h3>Details:</h3>
                <p>{service.details[locale]}</p>
            </div>
        </div>
    );
}

export default ServiceDetailPage;
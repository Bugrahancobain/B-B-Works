"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { realtimeDb } from "../../../../firebase"; // Firebase bağlantısı
import { ref, onValue } from "firebase/database";
import { FaTwitter, FaFacebook, FaInstagram, FaGlobe, FaChevronDown } from "react-icons/fa";
import "./referenceDetail.css";

function ReferenceDetailPage({ params }) {

    const resolvedParams = React.use(params);
    const id = resolvedParams?.id; // Hizmet ID'si
    const locale = resolvedParams?.locale || "en"; // Varsayılan dil 'en'
    const router = useRouter();
    const [reference, setReference] = useState(null);

    useEffect(() => {
        if (!id) return;

        const referenceRef = ref(realtimeDb, `references/${id}`);
        onValue(referenceRef, (snapshot) => {
            const data = snapshot.val();
            if (!data) {
                // Eğer referans bulunamazsa, kullanıcıyı referanslar listesine yönlendirin
                router.push(`/${locale}/references`);
            } else {
                setReference(data);
            }
        });
    }, [id]);

    if (!reference) {
        return <p>Loading...</p>;
    }

    return (
        <div className="referenceDetailPage">
            <div className="referenceDetailHeader">
                <h1>{reference.companyName}</h1>
                <img src={reference.image} alt={reference.companyName} />
            </div>
            <div className="referenceDetailContent">
                <h3>Sektör:</h3>
                <p>{reference.sector[locale]}</p>

                <h3>Detaylar:</h3>
                <p>{reference.details?.[locale]}</p>

                <h3>Çalışma Tarihi:</h3>
                <p>{reference.dateAdded}</p>

                <div className="referenceDetailIcons">
                    {reference.website && (
                        <a href={reference.website} target="_blank" rel="noopener noreferrer">
                            <FaGlobe />
                        </a>
                    )}
                    {reference.twitter && (
                        <a href={reference.twitter} target="_blank" rel="noopener noreferrer">
                            <FaTwitter />
                        </a>
                    )}
                    {reference.facebook && (
                        <a href={reference.facebook} target="_blank" rel="noopener noreferrer">
                            <FaFacebook />
                        </a>
                    )}
                    {reference.instagram && (
                        <a href={reference.instagram} target="_blank" rel="noopener noreferrer">
                            <FaInstagram />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ReferenceDetailPage;
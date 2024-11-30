"use client";

import React, { useState, useEffect } from "react";
import { realtimeDb } from "../../../firebase";
import { ref, onValue } from "firebase/database";
import { FaTwitter, FaFacebook, FaInstagram, FaGlobe, FaChevronDown } from "react-icons/fa";
import "./references.css";
import Link from "next/link";
import { useRouter } from "next/navigation"; // useRouter ekleniyor

function ReferencesPage({ params }) {
    const [references, setReferences] = useState([]);
    const resolvedParams = React.use(params); // `params` çözülüyor
    const locale = resolvedParams.locale || "en"; // Varsayılan dil 'en'

    const router = useRouter(); // useRouter hook'u tanımlandı
    // Firebase'den referansları çekme
    useEffect(() => {
        const referencesRef = ref(realtimeDb, "references");

        onValue(referencesRef, (snapshot) => {
            const data = snapshot.val();
            const referencesArray = data
                ? Object.entries(data).map(([id, reference]) => ({ id, ...reference }))
                : [];
            setReferences(referencesArray);
        });
    }, []);

    return (
        <div className="referencesPage">
            <div className="referencePageHeaderDiv">
                <h1>References List</h1>
                <FaChevronDown />
            </div>
            <div className="referencesGrid">
                {references.map((reference) => (
                    <div
                        key={reference.id}
                        className="referenceCard"
                        onClick={() => router.push(`/${locale}/references/${reference.id}`)}
                        style={{ cursor: "pointer" }}
                    >
                        <img
                            src={reference.image}
                            alt={reference.companyName}
                            className="referenceCardImage"
                        />
                        <div className="referenceCardDetails">
                            <p>Şirket:</p>
                            <h3 className="referenceCardTitle">{reference.companyName}</h3>
                        </div>
                        <hr />
                        <div className="referenceCardDetails">
                            <p>Sektör:</p>
                            <p className="referenceCardSector">{reference.sector[locale]}</p>
                        </div>
                        <hr />
                        <div className="referenceCardDetails">
                            <p>Çalışma Tarihi</p>
                            <p className="referenceCardDate">{reference.dateAdded}</p>
                        </div>
                        <div className="referenceCardIcons">
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
                ))}
            </div>
        </div>
    );
}

export default ReferencesPage;
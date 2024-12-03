"use client";

import React, { useState, useEffect } from "react";
import { realtimeDb } from "../../../firebase";
import { ref, onValue } from "firebase/database";
import { FaTwitter, FaFacebook, FaInstagram, FaLink, FaChevronDown } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import "./references.css";
import { useRouter } from "next/navigation"; // useRouter ekleniyor
import { useTranslations } from "next-intl";

function ReferencesPage({ params }) {
    const t = useTranslations("ReferencesPage");

    const resolvedParams = React.use(params); // `params` çözülüyor
    const locale = resolvedParams.locale || "en"; // Varsayılan dil 'en'
    const [references, setReferences] = useState([]);

    const router = useRouter(); // useRouter hook'u tanımlandı

    // Firebase'den referansları çekme
    useEffect(() => {
        const referencesRef = ref(realtimeDb, "references");

        onValue(referencesRef, (snapshot) => {
            const data = snapshot.val();
            const referencesArray = data
                ? Object.entries(data).map(([id, reference]) => ({ id, ...reference }))
                : [];
            // Tarihe göre sıralama: En son eklenen en başa
            referencesArray.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
            setReferences(referencesArray);
        });
    }, []);

    return (
        <div className="referencesPage">
            <div className="referencePageHeaderDiv">
                <h1>{t("referencesListTitle")}</h1>
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
                            <p>{t("company")}:</p>
                            <h3 className="referenceCardTitle">{reference.companyName}</h3>
                        </div>
                        <hr />
                        <div className="referenceCardDetails">
                            <p>{t("sector")}:</p>
                            <p className="referenceCardSector">{reference.sector[locale]}</p>
                        </div>
                        <hr />
                        <div className="referenceCardDetails">
                            <p>{t("workingDate")}:</p>
                            <p className="referenceCardDate">{new Date(reference.dateAdded).toLocaleDateString(locale)}</p>
                        </div>
                        <div className="referenceCardIcons">
                            {reference.instagram && (
                                <a
                                    href={reference.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <FaInstagram />
                                </a>
                            )}
                            {reference.facebook && (
                                <a
                                    href={reference.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <FaFacebook />
                                </a>
                            )}
                            {reference.twitter && (
                                <a
                                    href={reference.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <FaTwitter />
                                </a>
                            )}
                            {reference.email && (
                                <a
                                    href={`mailto:${reference.email}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <IoIosMail />
                                </a>
                            )}
                            {reference.website && (
                                <a
                                    href={reference.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <FaLink />
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
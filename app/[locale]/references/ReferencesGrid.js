"use client";

import React from "react";
import { FaTwitter, FaFacebook, FaInstagram, FaLink, FaChevronDown } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { useTranslations } from "next-intl";
import "./references.css";

function ReferencesGrid({ references, locale }) {
    const t = useTranslations("ReferencesPage");

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
                        onClick={() => (window.location.href = `/${locale}/references/${reference.id}`)}
                        style={{ cursor: "pointer" }}
                    >
                        <img
                            src={reference.image}
                            alt={`B&B_${reference.companyName}`}
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
                            <p className="referenceCardDate">
                                {new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(new Date(reference.dateAdded))}
                            </p>
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

export default ReferencesGrid;
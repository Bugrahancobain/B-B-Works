"use client";
import withAuth from "../../../../components/withAuth";

import React, { useState, useEffect } from "react";
import AdminSidebar from "../../../../components/AdminSidebar";
import { Editor } from "@tinymce/tinymce-react"; // TinyMCE Editörü
import { realtimeDb } from "../../../../firebase";
import { ref, set, onValue, remove } from "firebase/database";
import "./adminReferences.css";

function Page({ params }) {
    const resolvedParams = React.use(params);
    const locale = resolvedParams?.locale || "en";

    const [references, setReferences] = useState([]);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editReferenceId, setEditReferenceId] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState("en"); // Dil seçimi
    const [newReference, setNewReference] = useState({
        image: "",
        companyName: "",
        sector: { en: "", tr: "" },
        dateAdded: "",
        website: "https://",
        instagram: "",
        twitter: "",
        facebook: "",
        email: "",
        details: { en: "", tr: "" },
    });

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

    const handleAddReference = () => {
        const newReferenceKey = editMode ? editReferenceId : Date.now().toString();
        const referencesRef = ref(realtimeDb, `references/${newReferenceKey}`);

        const currentDate = new Date().toISOString(); // ISO 8601 formatında tarih

        const referenceToSave = {
            ...newReference,
            dateAdded: editMode ? newReference.dateAdded : currentDate, // Tarihi ISO 8601 formatında kaydet
        };

        set(referencesRef, referenceToSave)
            .then(() => {
                setPopupOpen(false);
                setNewReference({
                    image: "",
                    companyName: "",
                    sector: { en: "", tr: "" },
                    dateAdded: "",
                    website: "https://",
                    instagram: "",
                    twitter: "",
                    facebook: "",
                    email: "",
                    details: { en: "", tr: "" },
                });
                setEditMode(false);
                setEditReferenceId(null);
            })
            .catch((error) => {
                console.error("Referans eklenirken/düzenlenirken hata oluştu:", error);
            });
    };

    const handleEditReference = (id) => {
        const referenceToEdit = references.find((reference) => reference.id === id);
        if (referenceToEdit) {
            setNewReference(referenceToEdit);
            setEditReferenceId(id);
            setEditMode(true);
            setPopupOpen(true);
        }
    };

    const handleDeleteReference = (id) => {
        const referencesRef = ref(realtimeDb, `references/${id}`);
        remove(referencesRef).catch((error) => {
            console.error("Referans silinirken hata oluştu:", error);
        });
    };

    return (
        <div className="adminReferencesMain">
            <AdminSidebar locale={locale} />
            <div className="adminReferencesContent">
                <button
                    className="adminReferencesAddButton"
                    onClick={() => {
                        setEditMode(false);
                        setNewReference({
                            image: "",
                            companyName: "",
                            sector: { en: "", tr: "" },
                            dateAdded: "",
                            website: "https://",
                            instagram: "",
                            twitter: "",
                            facebook: "",
                            email: "",
                            details: { en: "", tr: "" },
                        });
                        setPopupOpen(true);
                    }}
                >
                    + Referans Ekle
                </button>

                {isPopupOpen && (
                    <div className="adminReferencesPopup">
                        <h2>{editMode ? "Referansı Düzenle" : "Yeni Referans Ekle"}</h2>
                        <input
                            type="text"
                            placeholder="Resim Linki"
                            value={newReference.image}
                            onChange={(e) => setNewReference({ ...newReference, image: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Firma İsmi"
                            value={newReference.companyName}
                            onChange={(e) => setNewReference({ ...newReference, companyName: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder={`Sektör (${selectedLanguage.toUpperCase()})`}
                            value={newReference.sector[selectedLanguage]}
                            onChange={(e) =>
                                setNewReference({
                                    ...newReference,
                                    sector: { ...newReference.sector, [selectedLanguage]: e.target.value },
                                })
                            }
                        />
                        <input
                            type="text"
                            placeholder="Website"
                            value={newReference.website}
                            onChange={(e) => setNewReference({ ...newReference, website: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Instagram"
                            value={newReference.instagram}
                            onChange={(e) => setNewReference({ ...newReference, instagram: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Twitter"
                            value={newReference.twitter}
                            onChange={(e) => setNewReference({ ...newReference, twitter: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Facebook"
                            value={newReference.facebook}
                            onChange={(e) => setNewReference({ ...newReference, facebook: e.target.value })}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={newReference.email}
                            onChange={(e) => setNewReference({ ...newReference, email: e.target.value })}
                        />
                        <select
                            value={selectedLanguage}
                            onChange={(e) => setSelectedLanguage(e.target.value)}
                            className="languageSelector"
                        >
                            <option value="en">English</option>
                            <option value="tr">Türkçe</option>
                        </select>
                        <h4>Detaylar ({selectedLanguage.toUpperCase()})</h4>
                        <Editor
                            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                            value={newReference.details[selectedLanguage]}
                            onEditorChange={(content) =>
                                setNewReference({
                                    ...newReference,
                                    details: { ...newReference.details, [selectedLanguage]: content },
                                })
                            }
                            init={{
                                height: 200,
                                menubar: false,
                                plugins: [
                                    "advlist autolink lists link image charmap print preview anchor",
                                    "searchreplace visualblocks code fullscreen",
                                    "insertdatetime media table paste code help wordcount",
                                ],
                                toolbar:
                                    "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code",
                            }}
                        />

                        <div className="adminReferencesPopupActions">
                            <button onClick={handleAddReference}>
                                {editMode ? "Kaydet" : "Ekle"}
                            </button>
                            <button onClick={() => setPopupOpen(false)}>Çık</button>
                        </div>
                    </div>
                )}

                <div className="adminReferencesGrid">
                    {references.map((reference) => (
                        <div key={reference.id} className="adminReferencesCard">
                            <img src={reference.image} alt={`B&B_${reference.companyName}`} />
                            <h3>{reference.companyName}</h3>
                            <p>{locale === "en" ? reference.sector.en : reference.sector.tr}</p>
                            <p>{reference.dateAdded}</p>
                            <div className="adminReferencesCardActions">
                                <button onClick={() => handleEditReference(reference.id)}>Düzenle</button>
                                <button onClick={() => handleDeleteReference(reference.id)}>Sil</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default withAuth(Page);
"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "../../../../components/AdminSidebar";
import { realtimeDb } from "../../../../firebase";
import { ref, set, onValue, remove } from "firebase/database";
import "./adminServices.css";

function Page({ params }) {
    const resolvedParams = React.use(params);
    const locale = resolvedParams?.locale || "en";

    const [services, setServices] = useState([]);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editServiceId, setEditServiceId] = useState(null);
    const [newService, setNewService] = useState({
        image: "",
        title: { en: "", tr: "" }, // Başlık dillere ayrıldı
        shortDescription: { en: "", tr: "" }, // Kısa açıklama dillere ayrıldı
        details: { en: "", tr: "" },
    });

    useEffect(() => {
        const servicesRef = ref(realtimeDb, "services");

        onValue(servicesRef, (snapshot) => {
            const data = snapshot.val();
            const servicesArray = data
                ? Object.entries(data).map(([id, service]) => ({ id, ...service }))
                : [];
            setServices(servicesArray);
        });
    }, []);

    const handleAddService = () => {
        const newServiceKey = editMode ? editServiceId : Date.now().toString();
        const servicesRef = ref(realtimeDb, `services/${newServiceKey}`);

        set(servicesRef, newService)
            .then(() => {
                setPopupOpen(false);
                setNewService({
                    image: "",
                    title: { en: "", tr: "" },
                    shortDescription: { en: "", tr: "" },
                    details: { en: "", tr: "" },
                });
                setEditMode(false);
                setEditServiceId(null);
            })
            .catch((error) => {
                console.error("Hizmet eklenirken/düzenlenirken hata oluştu:", error);
            });
    };

    const handleEditService = (id) => {
        const serviceToEdit = services.find((service) => service.id === id);
        if (serviceToEdit) {
            setNewService(serviceToEdit);
            setEditServiceId(id);
            setEditMode(true);
            setPopupOpen(true);
        }
    };

    const handleDeleteService = (id) => {
        const servicesRef = ref(realtimeDb, `services/${id}`);
        remove(servicesRef).catch((error) => {
            console.error("Hizmet silinirken hata oluştu:", error);
        });
    };

    return (
        <div className="adminServicesMain">
            <div>
                <AdminSidebar locale={locale} />
            </div>
            <div className="adminServicesContent">
                <button
                    className="adminServicesAddButton"
                    onClick={() => {
                        setEditMode(false);
                        setNewService({
                            image: "",
                            title: { en: "", tr: "" },
                            shortDescription: { en: "", tr: "" },
                            details: { en: "", tr: "" },
                        });
                        setPopupOpen(true);
                    }}
                >
                    + Hizmet Ekle
                </button>

                {isPopupOpen && (
                    <div className="adminServicesPopup">
                        <h2>{editMode ? "Hizmeti Düzenle" : "Yeni Hizmet Ekle"}</h2>
                        <input
                            type="text"
                            placeholder="Resim Linki"
                            value={newService.image}
                            onChange={(e) => setNewService({ ...newService, image: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Başlık (EN)"
                            value={newService.title.en}
                            onChange={(e) =>
                                setNewService({ ...newService, title: { ...newService.title, en: e.target.value } })
                            }
                        />
                        <input
                            type="text"
                            placeholder="Başlık (TR)"
                            value={newService.title.tr}
                            onChange={(e) =>
                                setNewService({ ...newService, title: { ...newService.title, tr: e.target.value } })
                            }
                        />
                        <textarea
                            placeholder="Kısa Açıklama (EN)"
                            value={newService.shortDescription.en}
                            onChange={(e) =>
                                setNewService({
                                    ...newService,
                                    shortDescription: { ...newService.shortDescription, en: e.target.value },
                                })
                            }
                        />
                        <textarea
                            placeholder="Kısa Açıklama (TR)"
                            value={newService.shortDescription.tr}
                            onChange={(e) =>
                                setNewService({
                                    ...newService,
                                    shortDescription: { ...newService.shortDescription, tr: e.target.value },
                                })
                            }
                        />
                        <textarea
                            placeholder="Detay (EN)"
                            value={newService.details.en}
                            onChange={(e) =>
                                setNewService({ ...newService, details: { ...newService.details, en: e.target.value } })
                            }
                        />
                        <textarea
                            placeholder="Detay (TR)"
                            value={newService.details.tr}
                            onChange={(e) =>
                                setNewService({ ...newService, details: { ...newService.details, tr: e.target.value } })
                            }
                        />
                        <div className="adminServicesPopupActions">
                            <button onClick={handleAddService}>
                                {editMode ? "Kaydet" : "Ekle"}
                            </button>
                            <button onClick={() => setPopupOpen(false)}>Çık</button>
                        </div>
                    </div>
                )}

                <div className="adminServicesGrid">
                    {services.map((service) => (
                        <div key={service.id} className="adminServicesCard">
                            <img src={service.image} alt={locale === "en" ? service.title.en : service.title.tr} />
                            <h3>{locale === "en" ? service.title.en : service.title.tr}</h3>
                            <p>{locale === "en" ? service.shortDescription.en : service.shortDescription.tr}</p>
                            <div className="adminServicesCardActions">
                                <button onClick={() => handleEditService(service.id)}>Düzenle</button>
                                <button onClick={() => handleDeleteService(service.id)}>Sil</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Page;
"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "../../../../components/AdminSidebar";
import { ref, onValue, remove, update } from "firebase/database";
import { realtimeDb } from "../../../../firebase";
import "./adminContact.css";

function AdminContactPage({ params }) {
    const resolvedParams = React.use(params);
    const locale = resolvedParams?.locale || "en";
    const [meetings, setMeetings] = useState([]);
    const [editMeeting, setEditMeeting] = useState(null); // Düzenlenen toplantı bilgileri
    const [isPopupOpen, setPopupOpen] = useState(false);

    useEffect(() => {
        const meetingsRef = ref(realtimeDb, "meetings");

        onValue(meetingsRef, (snapshot) => {
            const data = snapshot.val();
            const meetingsArray = data
                ? Object.entries(data).map(([id, meeting]) => ({ id, ...meeting }))
                : [];
            setMeetings(meetingsArray);
        });
    }, []);

    const handleDeleteMeeting = (id) => {
        const meetingRef = ref(realtimeDb, `meetings/${id}`);
        remove(meetingRef).catch((error) => {
            console.error("Randevu silinirken hata oluştu:", error);
        });
    };

    const handleEditMeeting = (meeting) => {
        setEditMeeting(meeting);
        setPopupOpen(true);
    };

    const handleSaveMeeting = () => {
        if (editMeeting) {
            const meetingRef = ref(realtimeDb, `meetings/${editMeeting.id}`);
            update(meetingRef, editMeeting)
                .then(() => {
                    setPopupOpen(false);
                    setEditMeeting(null);
                })
                .catch((error) => {
                    console.error("Randevu güncellenirken hata oluştu:", error);
                });
        }
    };

    const handleUpdateStatus = (id, newStatus) => {
        const meetingRef = ref(realtimeDb, `meetings/${id}`);
        update(meetingRef, { status: newStatus })
            .then(() => {
                console.log(`Randevu durumu güncellendi: ${newStatus}`);
            })
            .catch((error) => {
                console.error("Durum güncellenirken hata oluştu:", error);
            });
    };

    return (
        <div className="adminContactPage">
            <div>
                <AdminSidebar locale={locale} />
            </div>
            <div className="adminContactContent">
                <h1>Randevu Talepleri</h1>
                <div className="meetingsTable">
                    {meetings.map((meeting) => (
                        <div key={meeting.id} className="meetingCard">
                            <div className="meetingDetails">
                                <h3>Konu: {meeting.topic}</h3>
                                <p>
                                    {meeting.firstName} {meeting.lastName}
                                </p>
                                <p>Tarih: {meeting.date} - Saat: {meeting.time}</p>
                                <p>E-posta: {meeting.email}</p>
                                <p>Telefon: {meeting.phone}</p>
                                <p>Ek Bilgiler: {meeting.extraInfo}</p>
                            </div>
                            <div className="meetingActions">
                                <div>
                                    <button onClick={() => handleEditMeeting(meeting)}>
                                        Düzenle
                                    </button>
                                    <button onClick={() => handleDeleteMeeting(meeting.id)}>
                                        Sil
                                    </button>
                                </div>
                                <select
                                    className="statusDropdown"
                                    value={meeting.status || "Görüşme Bekliyor"}
                                    onChange={(e) => handleUpdateStatus(meeting.id, e.target.value)}
                                >
                                    <option value="Görüşme Bekliyor">Görüşme Bekliyor</option>
                                    <option value="Görüşme Gerçekleşti">Görüşme Gerçekleşti</option>
                                    <option value="İptal Edildi">İptal Edildi</option>
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
                {isPopupOpen && (
                    <div className="popupOverlay">
                        <div className="popupContent">
                            <h2>Randevuyu Düzenle</h2>
                            <input
                                type="text"
                                placeholder="Ad"
                                value={editMeeting?.firstName || ""}
                                onChange={(e) =>
                                    setEditMeeting({ ...editMeeting, firstName: e.target.value })
                                }
                            />
                            <input
                                type="text"
                                placeholder="Soyad"
                                value={editMeeting?.lastName || ""}
                                onChange={(e) =>
                                    setEditMeeting({ ...editMeeting, lastName: e.target.value })
                                }
                            />
                            <input
                                type="email"
                                placeholder="E-posta"
                                value={editMeeting?.email || ""}
                                onChange={(e) =>
                                    setEditMeeting({ ...editMeeting, email: e.target.value })
                                }
                            />
                            <input
                                type="tel"
                                placeholder="Telefon"
                                value={editMeeting?.phone || ""}
                                onChange={(e) =>
                                    setEditMeeting({ ...editMeeting, phone: e.target.value })
                                }
                            />
                            <input
                                type="text"
                                placeholder="Konu"
                                value={editMeeting?.topic || ""}
                                onChange={(e) =>
                                    setEditMeeting({ ...editMeeting, topic: e.target.value })
                                }
                            />
                            <textarea
                                placeholder="Ek Bilgiler"
                                value={editMeeting?.extraInfo || ""}
                                onChange={(e) =>
                                    setEditMeeting({ ...editMeeting, extraInfo: e.target.value })
                                }
                            ></textarea>
                            <div className="dateTimePicker">
                                <input
                                    type="date"
                                    value={editMeeting?.date || ""}
                                    onChange={(e) =>
                                        setEditMeeting({ ...editMeeting, date: e.target.value })
                                    }
                                />
                                <input
                                    type="time"
                                    value={editMeeting?.time || ""}
                                    onChange={(e) =>
                                        setEditMeeting({ ...editMeeting, time: e.target.value })
                                    }
                                />
                            </div>
                            <div className="popupActions">
                                <button onClick={handleSaveMeeting}>Kaydet</button>
                                <button onClick={() => setPopupOpen(false)}>İptal</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminContactPage;
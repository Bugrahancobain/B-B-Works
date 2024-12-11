"use client";

import React, { useState, useEffect, useRef } from "react";
import { ref, push, onValue } from "firebase/database";
import { realtimeDb } from "../../../firebase";
import "./contact.css";
import { FaChevronDown, FaMapMarkerAlt, FaUser, FaEnvelope, FaPhone, FaInfoCircle, FaPencilAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { MdPhoneIphone } from "react-icons/md";
import emailjs from "emailjs-com";
import { useTranslations } from "next-intl";
import Company from "../../../components/Company";


function ContactPage({ locale }) {

    const t = useTranslations("ContactPage");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        topic: "",
        extraInfo: "",
        date: "",
        time: "",
    });
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, // EmailJS servis ID
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, // EmailJS şablon ID
                form.current,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY // EmailJS public key
            )
            .then(
                (result) => {
                    alert("Mesaj başarıyla gönderildi!");
                    console.log(result.text);
                },
                (error) => {
                    alert("Mesaj gönderilirken hata oluştu!");
                    console.log(error.text);
                }
            );

        e.target.reset();
    };

    const [bookedSlots, setBookedSlots] = useState({}); // Dolu tarih-saat bilgilerini tutar
    const today = new Date(); // Bugünün tarihi
    today.setDate(today.getDate() + 2); // Bugünün tarihine 1 gün ekleyerek yarını bul
    const minDate = today.toISOString().split("T")[0]; // Tarihi yyyy-mm-dd formatına çevir

    const timeSlots = [
        "09:00-10:00",
        "10:00-11:00",
        "11:00-12:00",
        "13:00-14:00",
        "14:00-15:00",
        "15:00-16:00",
        "16:00-17:00",
    ];

    useEffect(() => {
        const meetingsRef = ref(realtimeDb, "meetings");

        // Firebase'den mevcut randevuları çek
        onValue(meetingsRef, (snapshot) => {
            const data = snapshot.val();
            const slots = {};

            if (data) {
                Object.values(data).forEach((meeting) => {
                    const { date, time } = meeting;
                    if (!slots[date]) {
                        slots[date] = [];
                    }
                    slots[date].push(time); // Seçilen saatleri kaydet
                });
            }
            setBookedSlots(slots); // Dolu saatleri state'e ata
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Firebase'e veri gönder
        const meetingsRef = ref(realtimeDb, "meetings");
        push(meetingsRef, formData)
            .then(() => {
                alert("Randevu talebiniz başarıyla gönderildi ve kaydedildi.");
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    topic: "",
                    extraInfo: "",
                    date: "",
                    time: "",
                });

                // EmailJS ile e-posta gönder
                emailjs
                    .sendForm(
                        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, // EmailJS Servis ID
                        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID2, // EmailJS Template ID
                        e.target, // Formun DOM referansı
                        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY // EmailJS Public Key
                    )
                    .then(
                        (result) => {
                            console.log(result.text);
                        },
                        (error) => {
                            alert("Mesaj gönderilirken hata oluştu!");
                            console.log(error.text);
                        }
                    );

                // Formu sıfırla
                e.target.reset();
            })
            .catch((error) => {
                console.error("Randevu gönderimi sırasında hata oluştu:", error);
            });
    };

    const contactMapRef = useRef(null);

    const handleScrollToMap = () => {
        contactMapRef.current.scrollIntoView({
            behavior: "smooth", // Yavaş kaydırma
            block: "start", // Öğenin üst kısmına kaydır
        });
    };

    const contactFormRef = useRef(null);

    const handleScrollToForm = () => {
        contactFormRef.current.scrollIntoView({
            behavior: "smooth", // Yavaş kaydırma
            block: "start", // Öğenin üst kısmına kaydır
        });
    };

    const contactMeetRef = useRef(null);

    const handleScrollToMeet = () => {
        contactMeetRef.current.scrollIntoView({
            behavior: "smooth", // Yavaş kaydırma
            block: "start", // Öğenin üst kısmına kaydır
        });
    };

    return (
        <div className="contactPageMain">
            <div>
                <div className="contactPageHeaderDiv">
                    <h1>{t("header")}</h1>
                    <FaChevronDown />
                </div>
                <div className="contactInfoDiv">
                    <div className="contactInfoUnderDiv">
                        <img src="https://panda.axiomthemes.com/wp-content/uploads/2021/11/wall-clock.svg" alt="B&B" />
                        <h3>{t("openHoursTitle")}</h3>
                        <p>{t("weekdays")}</p>
                        <p>{t("weekend")}</p>
                    </div>
                    <div className="contactInfoUnderDiv">
                        <img src="https://panda.axiomthemes.com/wp-content/uploads/2021/11/map.svg" alt="B&B" />
                        <h3>{t("addressTitle")}</h3>
                        <p>{t("addressDetails")}</p>
                        <p className="contactInfoLink" onClick={handleScrollToMap}>{t("checkLocation")}</p>
                    </div>
                    <div className="contactInfoUnderDiv">
                        <img src="https://panda.axiomthemes.com/wp-content/uploads/2021/11/telephone.svg" alt="B&B" />
                        <h3>{t("getInTouchTitle")}</h3>
                        <p>{t("telephone")}</p>
                        <p>{t("email")}</p>
                        <p className="contactInfoLink" onClick={handleScrollToForm}>{t("contactForm")}</p>
                    </div>
                    <div className="contactInfoUnderDiv">
                        <img style={{ height: "65px", width: "60px" }} src="https://www.svgrepo.com/show/262819/webcam.svg" alt="B&B" />
                        <h3>{t("getInMeetTitle")}</h3>
                        <p>{t("getInMeetDetails")}</p>
                        <p className="contactInfoLink" onClick={handleScrollToMeet}>{t("makeAppointment")}</p>
                    </div>
                </div>
                <div>
                    <iframe id="contactMap"
                        ref={contactMapRef} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d226.8861816036283!2d29.004054768244856!3d41.04349134575663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7a1ef4af9c1%3A0xb37fbdf6699c99f7!2sKartal%20heykeli!5e0!3m2!1str!2str!4v1732572007805!5m2!1str!2str" width="100%" height="450" style={{ border: "0" }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
            <div className="contactFormDiv" ref={contactFormRef}>
                <div className="contactFormText" >
                    <h3>{t("contactUsTitle")}</h3>
                    <h2>{t("contactUsSubtitle")}</h2>
                    <h4>{t("contactUsDescription")}</h4>
                    <div className="contactMarkt">
                        <FaMapMarkerAlt className="contactSvg" />
                        <p>{t("contactInfoAddress")}</p>
                    </div>
                    <div className="contactMarkt">
                        <MdPhoneIphone className="contactSvg" />
                        <p>{t("contactInfoPhone")}</p>
                    </div>
                    <div className="contactMarkt">
                        <IoIosMail className="contactSvg" />
                        <p>{t("contactInfoEmail")}</p>
                    </div>
                </div>
                <div className="formClassTest">
                    <form ref={form} onSubmit={sendEmail} className="contactForm">
                        <div className="formGroup">
                            <FaUser className="formIcon" />
                            <input type="text" name="user_name" placeholder={t("formName")} required />
                        </div>
                        <div className="formGroup">
                            <FaEnvelope className="formIcon" />
                            <input type="email" name="user_email" placeholder={t("formEmail")} required />
                        </div>
                        <div className="formGroup">
                            <FaPhone className="formIcon" />
                            <input type="tel" name="user_phone" placeholder={t("formPhone")} required />
                        </div>
                        <div className="formGroup">
                            <FaInfoCircle className="formIcon" />
                            <input type="text" name="user_subject" placeholder={t("formSubject")} required />
                        </div>
                        <div className="formGroup">
                            <FaPencilAlt className="formIcon" />
                            <textarea name="message" placeholder={t("formMessage")} required></textarea>
                        </div>
                        <button type="submit" className="submitButton">
                            {t("formSubmit")}
                        </button>
                    </form>
                </div>
            </div>
            <Company />
            <div className="meetPage" ref={contactMeetRef}>
                <div className="meetFormText">
                    <h3>{t("meetUsTitle")}</h3>
                    <h2>{t("meetUsSubtitle")}</h2>
                    <h4>{t("meetUsDescription")}</h4>
                </div>
                <form onSubmit={handleSubmit} ref={form} className="meetForm">
                    <div className="meetFormGroup">
                        <FaUser className="meetFormIcon" />
                        <input
                            type="text"
                            placeholder={t("formName")}
                            value={formData.firstName}
                            name="user_name"
                            onChange={(e) =>
                                setFormData({ ...formData, firstName: e.target.value })
                            }
                            required
                        />
                    </div>
                    <div className="meetFormGroup">
                        <FaEnvelope className="meetFormIcon" />
                        <input
                            type="email"
                            placeholder={t("formEmail")}
                            value={formData.email}
                            name="user_email"
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                            required
                        />
                    </div>
                    <div className="meetFormGroup">
                        <FaPhone className="meetFormIcon" />
                        <input
                            type="tel"
                            placeholder={t("formPhone")}
                            value={formData.phone}
                            name="user_phone"
                            onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value })
                            }
                            required
                        />
                    </div>
                    <div className="meetFormGroup">
                        <FaInfoCircle className="meetFormIcon" />
                        <input
                            type="text"
                            placeholder={t("formSubject")}
                            value={formData.topic}
                            name="user_subject"
                            onChange={(e) =>
                                setFormData({ ...formData, topic: e.target.value })
                            }
                            required
                        />
                    </div>
                    <div className="meetFormGroup">
                        <FaPencilAlt className="meetFormIcon" />
                        <textarea
                            placeholder={t("meetFormExtraInfo")}
                            value={formData.extraInfo}
                            name="message"
                            onChange={(e) =>
                                setFormData({ ...formData, extraInfo: e.target.value })
                            }
                        ></textarea>
                    </div>
                    <div className="meetDateTimePicker">
                        <input
                            type="date"
                            value={formData.date}
                            name="user_date"
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            required
                            min={minDate} // Yalnızca yarından itibaren seçim yapılabilir
                        />
                        <select
                            value={formData.time}
                            name="user_hour"
                            onChange={(e) =>
                                setFormData({ ...formData, time: e.target.value })
                            }
                            required
                            disabled={!formData.date} // Tarih seçilmeden saat seçimi yapılmasın
                        >
                            <option value="">{t("selectTime")}</option>
                            {timeSlots.map((slot, index) => (
                                <option
                                    key={index}
                                    value={slot}
                                    disabled={
                                        bookedSlots[formData.date]?.includes(slot) // Doluysa seçilemez
                                    }
                                >
                                    {slot}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className="meetSubmitButton" type="submit" disabled={!formData.date || !formData.time}>
                        {t("meetFormSubmit")}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ContactPage;
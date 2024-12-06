"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";
import AdminSidebar from "../../../components/AdminSidebar";
import { useTranslations } from "next-intl";
import "./adminHomePage.css";

export default function AdminPage({ params }) {
    const t = useTranslations("AdminPage");
    const locale = params?.locale || "en"; // Eğer params varsa locale değerini al

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                window.location.href = `/${locale}/login`;
                alert(t("redirecting"));
            } else {
                setUser(currentUser);
            }
        });

        return () => unsubscribe();
    }, [locale, t]);

    if (!user) {
        return <div>{t("loading")}</div>;
    }

    return (
        <div className="adminHomeMain">
            <div className="adminSideBar">
                <AdminSidebar locale={locale} />
            </div>
            <div>
                <h1>{t("header")}</h1>
                <p>
                    {t("welcome")}, {user.email}
                </p>
            </div>
        </div>
    );
}
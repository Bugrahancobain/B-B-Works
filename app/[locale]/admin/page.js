"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";
import AdminSidebar from "../../../components/AdminSidebar";
import { use } from "react";
import "./adminHomePage.css";

export default function AdminPage({ params }) {
    const resolvedParams = use(params); // `params` nesnesini çözmek için `use` kullanılıyor
    const locale = resolvedParams?.locale || 'en'; // Çözülen parametreden `locale` alınıyor

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                // Kullanıcı yoksa giriş sayfasına yönlendirme
                window.location.href = `/${locale}/login`;
            } else {
                setUser(currentUser);
            }
        });

        return () => unsubscribe();
    }, [locale]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="adminHomeMain">
            <div className="adminSideBar">
                <AdminSidebar locale={locale} />
            </div>
            <div>
                <h1>Admin Panel</h1>
                <p>Merhabalar, {user.email}</p>
            </div>
        </div>
    );
}
"use client";
import React from "react";
import Link from "next/link";
import "../componentsStyle/AdminSideBar.css";
import { useTranslations } from "next-intl";
import { getAuth, signOut } from "firebase/auth"; // Firebase'den gerekli metodları alın
import { useRouter } from "next/navigation"; // Next.js yönlendirme için

function AdminSidebar({ locale }) {
    const t = useTranslations("AdminSidebar");
    const router = useRouter(); // Next.js yönlendirme için router

    const handleLogout = async () => {
        const auth = getAuth(); // Firebase Authentication örneğini alın
        try {
            await signOut(auth); // Oturum kapatma işlemini gerçekleştir
            router.push(`/${locale}/login`); // Çıkış yaptıktan sonra login sayfasına yönlendirin
        } catch (error) {
            console.error("Çıkış yapma hatası:", error.message); // Hata durumunda log yazdırın
        }
    };

    return (
        <div className="AdminSideBarMain">
            <div className="adminSideBarLinkDiv">
                <Link className="adminSideBarLink" href={`/${locale}/admin/services`}>
                    {t("services")}
                </Link>
                <Link className="adminSideBarLink" href={`/${locale}/admin/references`}>
                    {t("references")}
                </Link>
                <Link className="adminSideBarLink" href={`/${locale}/admin/blog`}>
                    {t("blog")}
                </Link>
                <Link className="adminSideBarLink" href={`/${locale}/admin/meeting`}>
                    {t("meeting")}
                </Link>
            </div>
            <div className="adminSideBarLinkDiv">
                {/* Logout işlemi için tıklanabilir bir div */}
                <div
                    className="adminSideBarLink adminQuickLink"
                    onClick={handleLogout} // Çıkış işlevini buraya bağlayın
                    role="button"
                    tabIndex={0}
                >
                    {t("logout")}
                </div>
            </div>
        </div>
    );
}

export default AdminSidebar;
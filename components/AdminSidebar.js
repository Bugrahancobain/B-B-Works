"use client";
import React from "react";
import Link from "next/link";
import "../componentsStyle/AdminSideBar.css";
import { useTranslations } from "next-intl";

function AdminSidebar({ locale }) {
    const t = useTranslations("AdminSidebar");

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
                <Link className="adminSideBarLink adminQuickLink" href={`/${locale}/login`}>
                    {t("logout")}
                </Link>
            </div>
        </div>
    );
}

export default AdminSidebar;
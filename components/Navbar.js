"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import "../componentsStyle/Navbar.css";

const Navbar = ({ locale }) => {
  const t = useTranslations("NavbarLinks");
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (e) => {
    const newLocale = e.target.value;
    const path = pathname.split("/").slice(2).join("/");
    router.push(`/${newLocale}/${path}`);
  };

  return (
    <div className="navbarMain">
      <div className="navbarLogoDiv">
        <Link className="navbarLinkLogo" href={`/${locale}/`}>
          B&B Works
        </Link>
      </div>
      <div className="navbarLinks">
        <Link
          className={`navbarLink ${pathname === `/${locale}` || pathname === `/${locale}/` ? "active" : ""
            }`}
          href={`/${locale}/`}
        >
          {t("home")}
        </Link>
        <Link
          className={`navbarLink ${pathname === `/${locale}/aboutUs` ? "active" : ""
            }`}
          href={`/${locale}/aboutUs`}
        >
          {t("about")}
        </Link>
        <Link
          className={`navbarLink ${pathname === `/${locale}/ourServices` ? "active" : ""
            }`}
          href={`/${locale}/ourServices`}
        >
          {t("ourServices")}
        </Link>
        <Link
          className={`navbarLink ${pathname === `/${locale}/references` ? "active" : ""
            }`}
          href={`/${locale}/references`}
        >
          {t("references")}
        </Link>
        <Link
          className={`navbarLink ${pathname === `/${locale}/blog` ? "active" : ""
            }`}
          href={`/${locale}/blog`}
        >
          {t("blog")}
        </Link>
        <Link
          className={`navbarLink ${pathname === `/${locale}/contact` ? "active" : ""
            }`}
          href={`/${locale}/contact`}
        >
          {t("contact")}
        </Link>

        <select
          className="navbarLangOption"
          value={locale}
          onChange={handleLanguageChange}
        >
          <option value="en">EN</option>
          <option value="tr">TR</option>
        </select>
      </div>
    </div>
  );
};

export default Navbar;
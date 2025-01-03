"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Burger menü ikonları
import "../componentsStyle/Navbar.css";

const Navbar = ({ locale }) => {
  const t = useTranslations("NavbarLinks");
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setMenuOpen] = useState(false); // Menü açık/kapalı durumu

  const handleLanguageChange = (e) => {
    const newLocale = e.target.value;
    const path = pathname.split("/").slice(2).join("/");
    router.push(`/${newLocale}/${path}`);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen); // Menü durumunu değiştir
  };

  return (
    <div className="navbarMain">
      <div className="navbarLogoDiv">
        <Link className="navbarLinkLogo" href={`/${locale}/`}>
          <img src="/B&B_Banner_Logo.png" alt="" />
        </Link>
      </div>

      {/* Burger Menü İkonu */}
      <div className="burgerMenuIcon" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Menü */}
      <div className={`navbarLinks ${isMenuOpen ? "open" : ""}`}>
        <Link
          className={`navbarLink ${pathname === `/${locale}` || pathname === `/${locale}/` ? "active" : ""
            }`}
          href={`/${locale}/`}
          onClick={toggleMenu} // Mobil menüde tıklandığında menüyü kapat
        >
          {t("home")}
        </Link>
        <Link
          className={`navbarLink ${pathname === `/${locale}/aboutUs` ? "active" : ""
            }`}
          href={`/${locale}/aboutUs`}
          onClick={toggleMenu}
        >
          {t("about")}
        </Link>
        <Link
          className={`navbarLink ${pathname === `/${locale}/ourServices` ? "active" : ""
            }`}
          href={`/${locale}/ourServices`}
          onClick={toggleMenu}
        >
          {t("ourServices")}
        </Link>
        <Link
          className={`navbarLink ${pathname === `/${locale}/references` ? "active" : ""
            }`}
          href={`/${locale}/references`}
          onClick={toggleMenu}
        >
          {t("references")}
        </Link>
        <Link
          className={`navbarLink ${pathname === `/${locale}/blog` ? "active" : ""
            }`}
          href={`/${locale}/blog`}
          onClick={toggleMenu}
        >
          {t("blog")}
        </Link>
        <Link
          className={`navbarLink ${pathname === `/${locale}/contact` ? "active" : ""
            }`}
          href={`/${locale}/contact`}
          onClick={toggleMenu}
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
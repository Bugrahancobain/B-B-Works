"use client";
import React from "react";
import "../componentsStyle/Footer.css";
import { FaInstagram, FaLinkedin, FaFacebookSquare } from "react-icons/fa";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Footer({ params }) {
    const t = useTranslations("FooterLinks");
    const pathname = usePathname();
    const locale = params?.locale || "en"; // Varsayılan dil 'en'
    const thisYear = new Date().getFullYear();

    return (
        <div className="footerMain">
            <div className="footerNav">
                <div className="footerAdressDiv">
                    <h3>{t("office")}</h3>
                    <p>{t("address")}</p>
                    <p>{t("email")}</p>
                    <h3>{t("phone")}</h3>
                </div>
                <div className="footerLinks">
                    <h3>{t("links")}</h3>
                    <Link
                        className={`footerNavbarLink ${pathname === `/${locale}` || pathname === `/${locale}/` ? "active" : ""
                            }`}
                        href={`/${locale}/`}
                    >
                        {t("home")}
                    </Link>
                    <Link
                        className={`footerNavbarLink ${pathname === `/${locale}/aboutUs` ? "active" : ""
                            }`}
                        href={`/${locale}/aboutUs`}
                    >
                        {t("about")}
                    </Link>
                    <Link
                        className={`footerNavbarLink ${pathname === `/${locale}/ourServices` ? "active" : ""
                            }`}
                        href={`/${locale}/ourServices`}
                    >
                        {t("ourServices")}
                    </Link>
                    <Link
                        className={`footerNavbarLink ${pathname === `/${locale}/references` ? "active" : ""
                            }`}
                        href={`/${locale}/references`}
                    >
                        {t("references")}
                    </Link>
                    <Link
                        className={`footerNavbarLink ${pathname === `/${locale}/blog` ? "active" : ""
                            }`}
                        href={`/${locale}/blog`}
                    >
                        {t("blog")}
                    </Link>
                    <Link
                        className={`footerNavbarLink ${pathname === `/${locale}/contact` ? "active" : ""
                            }`}
                        href={`/${locale}/contact`}
                    >
                        {t("contact")}
                    </Link>
                </div>
                <Link href={`/${locale}/contact`}>
                    <div className="footerContractBtn">{t("contactWithUs")}</div>
                </Link>
            </div>
            <hr className="hrClass" />
            <div>
                <div className="socialIcons">
                    <a target="_blank" href="https://www.instagram.com/bnbworksagency/">
                        <FaInstagram className="social" />
                    </a>
                    <a target="_blank" href="#">
                        <FaLinkedin className="social" />
                    </a>
                    <a target="_blank" href="#">
                        <FaFacebookSquare className="social" />
                    </a>
                </div>
                <div className="footer">
                    {t("rights", { year: thisYear })}
                </div>
            </div>
        </div>
    );
}

export default Footer;
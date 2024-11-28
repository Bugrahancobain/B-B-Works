"use client";
import { useTranslations } from "next-intl";
import Navbar from "../../components/Navbar";

export default function Home() {
  const t = useTranslations("HomePage");
  return (
    <div>
      <h1>{t("homeTitle")}</h1>
    </div>
  );
}
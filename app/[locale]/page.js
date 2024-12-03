"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Company from "../../components/Company";
import { ref, onValue } from "firebase/database";
import { realtimeDb } from "../../firebase"; // Firebase bağlantısı
import CountUp from "react-countup";
import { IoIosMail } from "react-icons/io";
import "./HomePage.css"


export default function Home({ params }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const resolvedParams = React.use(params); // `params` çözülüyor
  const locale = resolvedParams.locale || "en"; // Varsayılan dil 'en'
  const [referenceCount, setReferenceCount] = useState(0);
  const t = useTranslations("HomePage");
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleEx, setIsVisibleEx] = useState(false);
  const [blogs, setBlogs] = useState([]);


  useEffect(() => {
    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const offsetX = (centerX - e.clientX) * 0.01;
      const offsetY = (centerY - e.clientY) * 0.01;

      setOffset({ x: offsetX, y: offsetY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const [services, setServices] = useState([]);

  // Firebase'den hizmet verilerini çekme
  useEffect(() => {
    const servicesRef = ref(realtimeDb, "services");

    onValue(servicesRef, (snapshot) => {
      const data = snapshot.val();
      const servicesArray = data
        ? Object.entries(data).map(([id, service]) => ({ id, ...service }))
        : [];
      setServices(servicesArray);
    });
  }, []);
  useEffect(() => {
    const referencesRef = ref(realtimeDb, "references");
    onValue(referencesRef, (snapshot) => {
      const data = snapshot.val();
      const count = data ? Object.keys(data).length : 0;
      setReferenceCount(count);
    });
  }, []);

  const peopleCount = referenceCount * 23;

  useEffect(() => {
    const handleScroll = () => {
      const barsDiv = document.querySelector(".homePageBarsDiv");
      const exsDiv = document.querySelector(".servicesPageExperiences");

      if (barsDiv) {
        const rectBars = barsDiv.getBoundingClientRect();
        if (rectBars.top < window.innerHeight - 100 && rectBars.bottom >= 0) {
          setIsVisible(true);
        }
      }

      if (exsDiv) {
        const rectExs = exsDiv.getBoundingClientRect();
        if (rectExs.top < window.innerHeight - 100 && rectExs.bottom >= 0) {
          setIsVisibleEx(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const bars = [
    { title: "Design", percentage: 90 },
    { title: "Branding", percentage: 80 },
    { title: "Web Design", percentage: 98 },
  ];

  useEffect(() => {
    const blogsRef = ref(realtimeDb, "blogs");
    onValue(blogsRef, (snapshot) => {
      const data = snapshot.val();
      const blogsArray = data
        ? Object.entries(data).map(([id, blog]) => ({ id, ...blog }))
        : [];
      // Tarihe göre sıralama
      blogsArray.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
      setBlogs(blogsArray);
    });
  }, []);
  return (
    <div className="homePageMain">
      <div className="homePageFirstDiv">

        <div className="homePageFirstContextDiv">
          <h2>{t("headerTitle")}</h2>
          <h4>{t("headerDescription")}</h4>
          <Link href={`/${locale}/aboutUs`}>
            <div className="homePageLink">
              {t("aboutUs")}
            </div>
          </Link>
        </div>
        <div className="homePageImgDiv">
          <div
            className="homePageFirstImgDiv"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px)`,
            }}
          >
            <img
              style={{
                width: "700px",
                height: "400px",
              }}
              src="https://panda.axiomthemes.com/wp-content/uploads/2021/11/image-1-copyright.svg"
              alt="B&B"
            />
          </div>
        </div>
      </div>
      <Company />
      <div className="homePageServicesDivMain">
        <h4>{t("ourServicesTitle")}</h4>
        <h2>{t("ourServicesSubtitle")}</h2>
        <div className="homePageServicesDiv">
          {services.slice(0, 4).map((service) => (
            <Link
              key={service.id}
              href={`/${locale}/ourServices/${service.id}`}
              style={{ textDecoration: "none", color: "inherit" }} // Stil bozulmasını önlemek için
            >
              <div className="homePageServicesCardBox">
                <div className="homePageSericesImageDiv">
                  <img src={service.image} alt={service.title[locale]} />
                </div>
                <div className="homePageServicesHeaders">
                  <h3>{service.title[locale]}</h3>
                  <div style={{ color: "grey", marginTop: "10px" }} dangerouslySetInnerHTML={{ __html: service.shortDescription?.[locale]?.substring(0, 75) + "..." }} />

                </div>
              </div>
            </Link>
          ))}
        </div>
        <Link href={`/${locale}/ourServices`}>
          <div className="homePageServicesLink">{t("moreFeatures")}</div>
        </Link>
      </div>
      <div className="servicesFirstDiv">
        <div className="servicesImgDiv">
          <div
            className="servicesFirstImgDiv"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px)`,
            }}
          >
            <img
              style={{
                width: "700px",
                height: "400px",
              }}
              src="https://panda.axiomthemes.com/wp-content/uploads/2021/11/image-2-copyright.svg"
              alt="B&B"
            />
          </div>
          <div
            className="servicesSecondImgDiv"
            style={{
              transform: `translate(${-offset.x}px, ${-offset.y}px)`,
            }}
          >
            <img
              src="https://panda.axiomthemes.com/wp-content/uploads/2021/11/plan-copyright.svg"
              alt="B&B"
            />
          </div>
        </div>
        <div className="servicesFirstContextDiv">
          <h3>O{t("ourServicesTitle")}</h3>
          <h2>{t("servicesSubtitle")}</h2>
          <h4>{t("servicesDescription")}</h4>
          <div className="servicesPageExperiences">
            <div className="servicesPageExperience">
              <h4>{t("experience")}</h4>
              <h2>
                {isVisibleEx ? <CountUp start={0} end={referenceCount} duration={2} /> : 0}+
              </h2>
            </div>
            <div className="servicesPagePeople">
              <h4>{t("people")}</h4>
              <h2>
                {isVisibleEx ? <CountUp start={0} end={peopleCount} duration={2} /> : 0}+
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="homePageBarFirstDiv">
        <div className="homePageAboutUsMain">
          <div className="homePageFirstContextDiv" style={{ width: "50%" }}>
            <h3>{t("aboutUs")}</h3>
            <h2>{t("aboutUsSubtitle")}</h2>
            <h4>{t("aboutUsDescription")}</h4>
            <div style={{ display: "flex", alignItems: "center", gap: "20px", marginTop: "20px" }}>
              <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "50%", width: "70px", height: "70px", textAlign: "center" }}>
                <IoIosMail style={{ fontSize: "16px", width: "100%", height: "100%" }} />
              </div>
              <div>{t("contactEmail")}</div>
            </div>
          </div>
          <div className="homePageBarsDiv">
            {bars.map((bar, index) => (
              <div key={index} className="homePageBar">
                <div className="homePageBarTitle">{bar.title}</div>
                <div className="homePageBarContainer">
                  <div
                    className="homePageBarFill"
                    style={{
                      width: isVisible ? `${bar.percentage}%` : "0%",
                      transition: "width 2s ease-in-out",
                    }}
                  ></div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="homePageBlogDiv">
        <div className="homePageBlogHeader">
          <h3>{t("blogTitle")}</h3>
          <h2>{t("blogSubtitle")}</h2>
        </div>
        <div className="homePageBlogBoxes">
          {blogs.slice(0, 3).map((blog) => (
            <Link
              key={blog.id}
              href={`/${locale}/blog/${blog.id}`}
              style={{ textDecoration: "none", color: "inherit" }} // Varsayılan stil
            >
              <div className="homePageBlogBox">
                <img className="homePageBlogImage" src={blog.image} alt={blog.title[locale]} />
                <div className="homePageBlogDate">
                  <span>{new Date(blog.dateAdded).toLocaleDateString(locale)}</span>
                </div>
                <h3 className="homePageBlogTitle">{blog.title[locale]}</h3>
              </div>
            </Link>
          ))}
        </div>
        <Link href={`/${locale}/blog`}>
          <div className="homePageServicesLink">{t("viewAllArticles")}</div>
        </Link>
      </div>
    </div >
  );
}
import { adminRTDB } from "../../firebaseAdmin";
import HomePageClient from "./HomePageClient";

// Firebase'den SSR için verileri çekmek
export async function fetchHomePageData() {
  try {
    const [servicesSnapshot, blogsSnapshot] = await Promise.all([
      adminRTDB.ref("services").once("value"),
      adminRTDB.ref("blogs").once("value"),
    ]);

    const servicesData = servicesSnapshot.val();
    const blogsData = blogsSnapshot.val();

    const services = servicesData
      ? Object.entries(servicesData).map(([id, service]) => ({ id, ...service }))
      : [];
    const blogs = blogsData
      ? Object.entries(blogsData).map(([id, blog]) => ({ id, ...blog }))
      : [];

    // Hizmetleri ve blogları tarihe göre sıralama
    blogs.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));

    return { services, blogs };
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return { services: [], blogs: [] };
  }
}

export default async function Page({ params }) {
  const { locale } = params || "en"; // Varsayılan dil
  const { services, blogs } = await fetchHomePageData();

  return (
    <HomePageClient locale={locale} services={services.slice(0, 3)} blogs={blogs.slice(0, 3)} />
  );
}
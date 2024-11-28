import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";
import { useRouter } from "next/router";

export default function RequireAuth({ children, locale }) {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                router.push(`/${locale}/login`); // Giriş yapılmamışsa login sayfasına yönlendir
            } else {
                setUser(currentUser);
            }
        });

        return () => unsubscribe();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
}
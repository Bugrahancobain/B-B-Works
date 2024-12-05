"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";
import React from "react";

export default function withAuth(Component) {
    return function AuthenticatedComponent(props) {
        const router = useRouter();
        const [user, setUser] = useState(null);
        const [loading, setLoading] = useState(true);

        // `params`'ı unwrap etmek
        const params = React.use(props.params);
        const locale = params?.locale || "en";

        useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                if (!currentUser) {
                    router.push(`/${locale}/login`);
                } else {
                    setUser(currentUser);
                }
                setLoading(false);
            });

            return () => unsubscribe();
        }, [router, locale]);

        if (loading) {
            return <div>Loading...</div>; // Yükleniyor animasyonu gösterebilirsiniz
        }

        if (!user) {
            return null; // Kullanıcı giriş yapmadıysa hiçbir şey render etmez
        }

        return <Component {...props} user={user} />;
    };
}
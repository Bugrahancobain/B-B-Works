// firebaseUtils.js
import { ref, onValue, update, get, set } from "firebase/database";
import { realtimeDb } from "./firebase";

// Dinamik bir toggleLike fonksiyonu
export const toggleLike = async (type, itemId, deviceId) => {
    try {
        const likesRef = ref(realtimeDb, `${type}/${itemId}/likes`);
        const snapshot = await get(likesRef);
        const likesData = snapshot.val() || {};

        if (likesData[deviceId]) {
            // Beğeniyi kaldır
            delete likesData[deviceId];
        } else {
            // Beğeni ekle
            likesData[deviceId] = true;
        }

        await set(likesRef, likesData);
        return likesData;
    } catch (error) {
        console.error("Error toggling like:", error);
    }
};

// Beğeni sayısını almak
export const getLikesCount = async (type, itemId) => {
    try {
        const likesRef = ref(realtimeDb, `${type}/${itemId}/likes`);
        const snapshot = await get(likesRef);
        const likesData = snapshot.val() || {};
        return Object.keys(likesData).length;
    } catch (error) {
        console.error("Error getting likes count:", error);
        return 0;
    }
};

// Kullanıcının beğeni durumunu kontrol et
export const hasLiked = async (type, itemId, deviceId) => {
    try {
        const likesRef = ref(realtimeDb, `${type}/${itemId}/likes/${deviceId}`);
        const snapshot = await get(likesRef);
        return snapshot.exists();
    } catch (error) {
        console.error("Error checking like status:", error);
        return false;
    }
};
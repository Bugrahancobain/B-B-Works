// useLikes.js
import { useState, useEffect } from "react";
import { toggleLike, getLikesCount, hasLiked } from ".//firebaseUtils";

export const useLikes = (type, itemId) => {
    const [likesCount, setLikesCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const deviceId = typeof window !== "undefined" && localStorage.getItem("deviceId");

    useEffect(() => {
        const fetchLikes = async () => {
            const count = await getLikesCount(type, itemId);
            const liked = await hasLiked(type, itemId, deviceId);
            setLikesCount(count);
            setIsLiked(liked);
        };
        fetchLikes();
    }, [type, itemId, deviceId]);

    const handleToggleLike = async () => {
        const updatedLikes = await toggleLike(type, itemId, deviceId);
        setLikesCount(Object.keys(updatedLikes || {}).length);
        setIsLiked(!isLiked);
    };

    return { likesCount, isLiked, handleToggleLike };
};
"use client";

import React, { useState, useEffect, use } from "react";
import AdminSidebar from "../../../../components/AdminSidebar";
import { realtimeDb } from "../../../../firebase";
import { ref, set, onValue, remove } from "firebase/database";
import "./adminBlog.css";

function Page({ params }) {
    const resolvedParams = use(params);
    const locale = resolvedParams?.locale || "en";

    const [blogs, setBlogs] = useState([]);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editBlogId, setEditBlogId] = useState(null);
    const [newBlog, setNewBlog] = useState({
        image: "",
        title: { en: "", tr: "" }, // Diller için başlık alanı
        content: { en: "", tr: "" }, // Diller için içerik alanı
        dateAdded: "", // Eklenme tarihi
    });

    useEffect(() => {
        const blogsRef = ref(realtimeDb, "blogs");

        onValue(blogsRef, (snapshot) => {
            const data = snapshot.val();
            const blogsArray = data
                ? Object.entries(data).map(([id, blog]) => ({ id, ...blog }))
                : [];
            setBlogs(blogsArray);
        });
    }, []);

    const handleAddBlog = () => {
        const newBlogKey = editMode ? editBlogId : Date.now().toString();
        const blogsRef = ref(realtimeDb, `blogs/${newBlogKey}`);

        const blogToSave = {
            ...newBlog,
            dateAdded: editMode ? newBlog.dateAdded : new Date().toLocaleDateString("tr-TR"), // Tarih ekleme
        };

        set(blogsRef, blogToSave)
            .then(() => {
                setPopupOpen(false);
                setNewBlog({ image: "", title: { en: "", tr: "" }, content: { en: "", tr: "" }, dateAdded: "" });
                setEditMode(false);
                setEditBlogId(null);
            })
            .catch((error) => {
                console.error("Blog eklenirken/düzenlenirken hata oluştu:", error);
            });
    };

    const handleEditBlog = (id) => {
        const blogToEdit = blogs.find((blog) => blog.id === id);
        if (blogToEdit) {
            setNewBlog(blogToEdit);
            setEditBlogId(id);
            setEditMode(true);
            setPopupOpen(true);
        }
    };

    const handleDeleteBlog = (id) => {
        const blogsRef = ref(realtimeDb, `blogs/${id}`);
        remove(blogsRef).catch((error) => {
            console.error("Blog silinirken hata oluştu:", error);
        });
    };

    return (
        <div className="adminBlogMain">
            <div>
                <AdminSidebar locale={locale} />
            </div>
            <div className="adminBlogContent">
                <button
                    className="adminBlogAddButton"
                    onClick={() => {
                        setEditMode(false);
                        setNewBlog({ image: "", title: { en: "", tr: "" }, content: { en: "", tr: "" }, dateAdded: "" });
                        setPopupOpen(true);
                    }}
                >
                    + Blog Ekle
                </button>

                {isPopupOpen && (
                    <div className="adminBlogPopup">
                        <h2>{editMode ? "Blogu Düzenle" : "Yeni Blog Ekle"}</h2>
                        <input
                            type="text"
                            placeholder="Resim Linki"
                            value={newBlog.image}
                            onChange={(e) => setNewBlog({ ...newBlog, image: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Başlık (EN)"
                            value={newBlog.title.en}
                            onChange={(e) => setNewBlog({ ...newBlog, title: { ...newBlog.title, en: e.target.value } })}
                        />
                        <input
                            type="text"
                            placeholder="Başlık (TR)"
                            value={newBlog.title.tr}
                            onChange={(e) => setNewBlog({ ...newBlog, title: { ...newBlog.title, tr: e.target.value } })}
                        />
                        {/* Not: Eğer yeni diller eklemek isterseniz yukarıdaki başlık inputlarını çoğaltabilirsiniz */}
                        <textarea
                            placeholder="İçerik (EN)"
                            value={newBlog.content.en}
                            onChange={(e) => setNewBlog({ ...newBlog, content: { ...newBlog.content, en: e.target.value } })}
                        />
                        <textarea
                            placeholder="İçerik (TR)"
                            value={newBlog.content.tr}
                            onChange={(e) => setNewBlog({ ...newBlog, content: { ...newBlog.content, tr: e.target.value } })}
                        />
                        {/* Not: Yeni diller eklemek isterseniz yukarıdaki içerik alanlarını çoğaltabilirsiniz */}
                        <div className="adminBlogPopupActions">
                            <button onClick={handleAddBlog}>
                                {editMode ? "Kaydet" : "Ekle"}
                            </button>
                            <button onClick={() => setPopupOpen(false)}>Çık</button>
                        </div>
                    </div>
                )}

                <div className="adminBlogGrid">
                    {blogs.map((blog) => (
                        <div key={blog.id} className="adminBlogCard">
                            <img src={blog.image} alt={blog.title.en} />
                            <h3>{locale === "en" ? blog.title.en : blog.title.tr}</h3>
                            <p>{blog.dateAdded}</p>
                            <div className="adminBlogCardActions">
                                <button onClick={() => handleEditBlog(blog.id)}>Düzenle</button>
                                <button onClick={() => handleDeleteBlog(blog.id)}>Sil</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Page;
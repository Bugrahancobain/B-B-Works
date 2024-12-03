"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "../../../../components/AdminSidebar";
import { Editor } from "@tinymce/tinymce-react"; // TinyMCE Editörü
import { realtimeDb } from "../../../../firebase";
import { ref, set, onValue, remove } from "firebase/database";
import "./adminBlog.css";

function Page({ params }) {
    const resolvedParams = React.use(params);
    const locale = resolvedParams?.locale || "en";

    const [blogs, setBlogs] = useState([]);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editBlogId, setEditBlogId] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState("en"); // Dil seçimi
    const [newBlog, setNewBlog] = useState({
        image: "",
        title: { en: "", tr: "" }, // Diller için başlık alanı
        content: { en: "", tr: "" }, // Diller için içerik alanı
        dateAdded: "", // Eklenme tarihi
    });

    // Tarih formatını dönüştürme fonksiyonu
    function parseDate(dateString) {
        const [day, month, year] = dateString.split(".");
        return new Date(`${year}-${month}-${day}`);
    }

    useEffect(() => {
        const blogsRef = ref(realtimeDb, "blogs");

        onValue(blogsRef, (snapshot) => {
            const data = snapshot.val();
            const blogsArray = data
                ? Object.entries(data).map(([id, blog]) => ({ id, ...blog }))
                : [];
            // Tarihe göre sıralama: En son eklenen en başa
            blogsArray.sort((a, b) => {
                const dateA = parseDate(a.dateAdded).getTime();
                const dateB = parseDate(b.dateAdded).getTime();

                if (!isNaN(dateA) && !isNaN(dateB)) {
                    return dateB - dateA; // En son eklenen en başa
                } else {
                    console.warn("Invalid date format detected:", a.dateAdded, b.dateAdded);
                    return 0; // Tarih formatı hatalıysa sıralama değişmez
                }
            });

            setBlogs(blogsArray);
        });
    }, []);

    const handleAddBlog = () => {
        const newBlogKey = editMode ? editBlogId : Date.now().toString();
        const blogsRef = ref(realtimeDb, `blogs/${newBlogKey}`);

        // Tarihi ISO 8601 formatında ayarla
        const blogToSave = {
            ...newBlog,
            dateAdded: editMode
                ? newBlog.dateAdded // Düzenleme modundaysa mevcut tarihi kullan
                : new Date().toISOString(), // Yeni ekleme ise ISO 8601 formatında tarih
        };

        set(blogsRef, blogToSave)
            .then(() => {
                setPopupOpen(false);
                setNewBlog({
                    image: "",
                    title: { en: "", tr: "" },
                    content: { en: "", tr: "" },
                    dateAdded: "",
                });
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
            <AdminSidebar locale={locale} />
            <div className="adminBlogContent">
                <button
                    className="adminBlogAddButton"
                    onClick={() => {
                        setEditMode(false);
                        setNewBlog({
                            image: "",
                            title: { en: "", tr: "" },
                            content: { en: "", tr: "" },
                            dateAdded: "",
                        });
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
                            onChange={(e) =>
                                setNewBlog({ ...newBlog, image: e.target.value })
                            }
                        />
                        <input
                            type="text"
                            placeholder={`Başlık (${selectedLanguage.toUpperCase()})`}
                            value={newBlog.title[selectedLanguage]}
                            onChange={(e) =>
                                setNewBlog({
                                    ...newBlog,
                                    title: { ...newBlog.title, [selectedLanguage]: e.target.value },
                                })
                            }
                        />
                        <select
                            value={selectedLanguage}
                            onChange={(e) => setSelectedLanguage(e.target.value)}
                            className="languageSelector"
                        >
                            <option value="en">English</option>
                            <option value="tr">Türkçe</option>
                        </select>
                        <h4>İçerik ({selectedLanguage.toUpperCase()})</h4>
                        <Editor
                            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                            value={newBlog.content[selectedLanguage]}
                            onEditorChange={(content) =>
                                setNewBlog({
                                    ...newBlog,
                                    content: { ...newBlog.content, [selectedLanguage]: content },
                                })
                            }
                            init={{
                                height: 200,
                                menubar: false,
                                plugins: [
                                    "advlist autolink lists link image charmap print preview anchor",
                                    "searchreplace visualblocks code fullscreen",
                                    "insertdatetime media table paste code help wordcount",
                                ],
                                toolbar:
                                    "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code",
                                script_url: `https://cdn.tiny.cloud/1/${process.env.NEXT_PUBLIC_TINYMCE_API_KEY}/tinymce/6/tinymce.min.js`,
                            }}
                        />

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
                            <img src={blog.image} alt={`B&B_${blog.title.en}`} />
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
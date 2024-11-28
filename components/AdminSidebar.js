import React from 'react';
import Link from 'next/link';
import "../componentsStyle/AdminSideBar.css";

function AdminSidebar({ locale }) {
    return (
        <div className='AdminSideBarMain'>
            <div className='adminSideBarLinkDiv'>
                <Link className="adminSideBarLink" href={`/${locale}/admin/services`}>Hizmet Ayarları</Link>
                <Link className="adminSideBarLink" href={`/${locale}/admin/references`}>Referans Ayarları</Link>
                <Link className="adminSideBarLink" href={`/${locale}/admin/blog`}>Blog Ayarları</Link>
                <Link className="adminSideBarLink" href={`/${locale}/admin/meeting`}>Randevu Ayarları</Link>
            </div>
            <div className='adminSideBarLinkDiv'>
                <Link className="adminSideBarLink adminQuickLink" href={`/${locale}/login`}>Çıkış</Link>
            </div>
        </div>
    );
}

export default AdminSidebar;
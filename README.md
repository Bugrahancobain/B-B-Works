# B&B Digital Agency Platform

## 📖 Introduction

**B&B Digital Agency Platform** is a comprehensive web application designed to manage blogs, services, and appointments for a digital agency. It features both user-facing pages and an admin panel, integrating Firebase for real-time database operations, localization for multi-language support, and modern UI elements for an enhanced user experience.

## ✨ Features

- **Multi-language Support**: Content available in English and Turkish.
- **Dynamic Routing**: Dynamic pages for blogs, services, and reference pages using Next.js.
- **Admin Panel**: Manage blogs, services, and appointment requests.
- **Firebase Integration**: Real-time database for storing services, blogs, and user interactions.
- **Appointment System**: Users can book and manage appointments.
- **Rich Content Editing**: Use of TinyMCE for editing service and blog descriptions.
- **Like and Share**: Interactive buttons for engaging blog content.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## 🛠️ Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **Firebase**: Authentication and real-time database.
- **Next-Intl**: Internationalization and localization for multi-language support.
- **TinyMCE**: Rich text editor for dynamic content management.
- **EmailJS**: Sending appointment confirmation and contact form emails.
- **React-Icons**: Beautiful and reusable icons.
- **CSS Modules**: Scoped styling for individual components.

## 🚀 Getting Started

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/username/project-repo.git
   cd project-repo
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and configure as follows:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY="your_firebase_api_key"
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_firebase_auth_domain"
   NEXT_PUBLIC_FIREBASE_PROJECT_ID="your_firebase_project_id"
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your_firebase_storage_bucket"
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your_firebase_messaging_sender_id"
   NEXT_PUBLIC_FIREBASE_APP_ID="your_firebase_app_id"
   NEXT_PUBLIC_FIREBASE_DATABASE_URL="your_firebase_database_url"
   FIREBASE_ADMIN_SDK={"type":"service_account", ...}
   NEXT_PUBLIC_EMAILJS_SERVICE_ID="your_emailjs_service_id"
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="your_emailjs_template_id"
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="your_emailjs_public_key"
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```

5. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000`.

## 📂 Folder Structure

```plaintext
├── app/
│   ├── [locale]/
│   │   ├── blog/
│   │   │   ├── [id]/page.js  # Blog detail page
│   │   │   ├── page.js       # Blog list page
│   │   ├── services/
│   │   │   ├── [id]/page.js  # Service detail page
│   │   │   ├── page.js       # Service list page
│   │   ├── admin/
│   │   │   ├── blog/page.js  # Admin blog management
│   │   │   ├── services/page.js  # Admin service management
│   │   │   ├── contact/page.js  # Admin contact management
│   │   ├── contact/page.js  # Contact form and appointment booking
│   │   ├── about/page.js  # About page
│   ├── layout.js  # Root layout
│   ├── globals.css  # Global styles
├── components/
│   ├── AdminSidebar.js  # Sidebar for admin navigation
│   ├── withAuth.js  # Higher-order component for admin authentication
│   ├── Company.js  # Company details component
├── firebase.js  # Firebase configuration
├── i18n.js  # Localization configuration
├── messages/
│   ├── en.json  # English translations
│   ├── tr.json  # Turkish translations
├── public/
├── .env  # Environment variables
├── package.json
```

## 🔧 Key Functionalities and Code Highlights

### Firebase Integration
```javascript
// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const realtimeDb = getDatabase(app);
```

### Dynamic Blog Page
```javascript
// app/[locale]/blog/[id]/page.js
import { useTranslations } from "next-intl";

export default function BlogDetail({ params }) {
    const t = useTranslations("BlogDetailPage");
    const { id } = params;

    // Fetch data dynamically from Firebase and render
    return (
        <div>
            <h1>{t("blogTitle")}</h1>
            {/* Render blog content dynamically */}
        </div>
    );
}
```

### Admin Panel Sidebar
```javascript
// components/AdminSidebar.js
const AdminSidebar = ({ locale }) => (
    <nav>
        <ul>
            <li><Link href={`/${locale}/admin/blog`}>Manage Blogs</Link></li>
            <li><Link href={`/${locale}/admin/services`}>Manage Services</Link></li>
            <li><Link href={`/${locale}/admin/contact`}>Manage Appointments</Link></li>
        </ul>
    </nav>
);

export default AdminSidebar;
```

### Adding a New Service
Admins can add services using a form with rich text editing capabilities:
```javascript
// app/[locale]/admin/services/page.js
import { Editor } from "@tinymce/tinymce-react";

const handleAddService = () => {
    const serviceRef = ref(realtimeDb, `services/${Date.now()}`);
    set(serviceRef, {
        title: "New Service",
        description: "<p>Service details</p>",
    });
};
```

## 🌐 Deployment

### Deploying on Vercel
1. Connect your GitHub repository to Vercel.
2. Add environment variables in the **Vercel Dashboard** under "Environment Variables."
3. Deploy the application directly.

## 🛠️ Troubleshooting

### Common Issues
1. **Firebase API Key Error**:
   - Ensure all Firebase environment variables are correctly added in `.env` and Vercel dashboard.

2. **404 Errors**:
   - Verify the `locale` parameter in dynamic routes like `/blog/[id]`.

3. **Editor Not Loading**:
   - Confirm the TinyMCE API key is configured in `.env`.

## 📜 License
This project is licensed under the MIT License.

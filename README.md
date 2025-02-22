# 🚀 AI-Powered Content Automation Platform

## 📌 Overview
In today's fast-paced digital world, content creators struggle with generating high-quality, engaging content consistently. Our AI-powered platform automates content creation by generating **AI images, captions, and creative post ideas** daily. It also allows **auto-posting on social media** at predefined intervals, saving time, effort, and costs.

## 🎯 Features
- 🔹 **AI-Generated Daily Content** – Automated image and caption generation based on themes.
- 🔹 **Automated Social Media Posting** – Seamless integration with social platforms.
- 🔹 **Personalized AI-crafted Posts** – Tailored content recommendations.
- 🔹 **Email Notifications** – Users receive AI-generated posts via email.
- 🔹 **User-Friendly Dashboard** – Easy-to-use interface for managing content.

## 🛠️ Tech Stack
- **Frontend:** Next.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** NextAuth.js
- **AI Services:** Gemini API / OpenAI API
- **Social Media Integration:** Instagram Graph API, Twitter API

## 🏗️ How to Run Locally

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/PriyanshuValiya/Creator-Automation.git
cd Creator-Automation
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env.local` file in the root directory and add:
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemin_api_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_secret_key
NEXT_PUBLIC_IMAGE_KEY=secret_image_api_key
EMAIL_USER=your_emil_id
EMAIL_PASS=your_password
```

### 4️⃣ Start the Development Server
#### Frontend (Next.js)
```bash
npm run dev
```
App will be running at `http://localhost:5173`

## 🚀 Future Enhancements
- Support for multiple social media platforms (LinkedIn, Facebook, TikTok)
- Advanced AI-driven content scheduling
- Monetization options for premium users

## 🤝 Contributing
We welcome contributions! Feel free to fork the repo, make changes, and submit a pull request.

## 📜 License
This project is licensed under the MIT License.

---
💡 **Empowering Content Creators with AI-Driven Automation!**

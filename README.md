# 💬 Redis Chat App

A modern real-time chat application built with **Next.js 16**, **Redis**, **Kinde Authentication**, **Pusher**, and **Cloudinary**. The app enables users to authenticate securely, exchange real-time messages, upload images, and enjoy a responsive, modern chat experience.

## 🌐 Live Demo

👉 https://redis-chat-app-wheat.vercel.app

---

## ✨ Features

- 🔐 Secure authentication with Kinde
- 💬 Real-time messaging powered by Pusher
- 🟢 Online user status
- 🖼️ Image sharing with Cloudinary
- ⚡ Fast data storage using Upstash Redis
- 🌙 Dark & Light mode support
- 📱 Fully responsive design
- 🎨 Smooth animations with Framer Motion
- ⚙️ Server Actions & App Router (Next.js 16)
- 🚀 Optimized for production deployment

---

## 🛠️ Tech Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

### Backend

- Next.js Server Actions
- Upstash Redis
- Pusher

### Authentication

- Kinde Auth

### Image Upload

- Cloudinary

### State Management

- React Query
- Zustand

### Deployment

- Vercel

---



## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/asia272/redis-chat-app.git
```

```bash
cd redis-chat-app
```

### Install dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env.local` file and add:

```env
KINDE_CLIENT_ID=
KINDE_CLIENT_SECRET=
KINDE_ISSUER_URL=

KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/auth/callback
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000

UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=

NEXT_PUBLIC_PUSHER_APP_KEY=
```

### Run the development server

```bash
npm run dev
```

Open **http://localhost:3000**

---



## 📌 Future Improvements

- ✅ Message reactions
- ✅ Typing indicators
- ✅ Read receipts
- ✅ Group chats
- ✅ Voice messages
- ✅ Push notifications

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository, create a feature branch, and submit a pull request.

---

## 👨‍💻 Author

**Asia Ashraf**

- GitHub: https://github.com/asia272
- Portfolio: https://asia-ashraf.vercel.app
.
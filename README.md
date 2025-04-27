# VocaAI Website

VocaAI is a modern, AI-powered customer service platform that provides businesses with a smart, always-on voice agent. Built with Next.js, it integrates seamlessly with the OpenAI-Realtime-API backend for real-time voice interactions, appointment scheduling, and customer support automation.

---

## 🚀 Features
- Beautiful, responsive Next.js web app
- User authentication and protected dashboard (NextAuth.js + MongoDB)
- AI agent configuration (custom system prompt, business info, agent script)
- Integration with OpenAI-Realtime-API for real-time voice and chat
- Secure environment variable management
- Modern UI/UX with Tailwind CSS

---

## 🛠️ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/dilpreet579/voca-ai.git
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory with:
```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key
OPENAI_REALTIME_API_URL=http://localhost:3001
```
- `MONGODB_URI`: Your MongoDB connection string (local or Atlas)
- `NEXTAUTH_URL`: The base URL of your app
- `NEXTAUTH_SECRET`: A random string for session encryption
- `OPENAI_REALTIME_API_URL`: URL of your OpenAI-Realtime-API backend

### 4. Start the Development Server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🔐 Authentication
- Uses NextAuth.js for secure authentication
- Supports user registration, login, and session management
- Protects sensitive routes like the dashboard and AI setup

---

## 🤖 AI Agent & Backend Integration
- The "Setup AI" page lets you define your business's system prompt and agent script
- On save, these are sent via API to the OpenAI-Realtime-API backend (`/system-message` endpoint)
- All real-time voice/chat operations use the latest prompt from the backend

---

## 📁 Project Structure
- `/src/app` — Next.js app directory (pages, API routes)
- `/src/components` — Reusable UI components
- `/src/models` — Mongoose models (User, etc.)
- `/src/lib` — Utility libraries (MongoDB connection)
- `/src/hooks` — Custom React hooks
- `/public` — Static assets

---

## 🧪 Testing & Usage
- Register a new account and log in
- Use the dashboard to view your profile and AI number
- Go to "Setup AI" to configure your agent's behavior
- The backend will immediately use your updated prompt for all calls

---

## 🚀 Deployment
- Deploy to Vercel, Netlify, or your preferred Node.js host
- Set all environment variables in your deployment dashboard
- Make sure the OpenAI-Realtime-API backend is also deployed and accessible

---

## 🤝 Credits
- Built by Dilpreet Singh
- Powered by Next.js, OpenAI, MongoDB, and Tailwind CSS

---

## 📄 License
ISC

---

**Note:** For production, ensure all secrets are strong, HTTPS is enabled, and backend URLs are correctly set.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load custom fonts.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

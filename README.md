# VocaAI - AI Receptionist
An AI-powered virtual receptionist enabling 24/7 customer support and call automation.

---

## 📖 Overview
Many small businesses miss potential customers simply because nobody is available to answer every call. Missed inquiries often mean missed appointments, missed bookings, and lost revenue.

VocaAI was built to solve that problem. It acts as an AI-powered receptionist that can answer incoming calls, respond to common customer questions, and remain available outside normal business hours.

### The Problem
Hiring and training reception staff can be expensive, especially for small businesses that receive recurring customer inquiries. Customers often call to ask the same questions:
- What are your business hours?
- Do you have availability?
- How can I book an appointment?
- What services do you offer?

When these calls go unanswered, businesses lose opportunities.

### The Solution
VocaAI provides a voice-based AI receptionist capable of handling common customer interactions automatically. The system listens to incoming requests, understands customer intent, generates contextual responses, and replies in real time through a natural voice interface.

---

## 📁 Project Structure

This repository contains both the frontend and backend applications:

- [`/frontend`](./frontend): The Next.js web application for the user dashboard and AI setup.
- [`/backend`](./backend): The Node.js/Fastify server handling real-time audio streaming between Twilio and OpenAI.

---

## 🚀 Key Features

### Real-Time Voice Conversations
- Natural voice-based interaction
- Low-latency speech processing
- Context-aware responses

### Business Information Handling
- Answers frequently asked questions
- Provides service and availability information
- Supports appointment and inquiry workflows

### Business Dashboard (Frontend)
- Call analytics and usage tracking
- Secure authentication (NextAuth.js + MongoDB)
- Conversation logging and monitoring
- Easy-to-use interface to configure your business AI agent

### Audio & AI Infrastructure (Backend)
- Real-time audio streaming from Twilio to OpenAI Realtime API.
- High-performance Fastify server with WebSocket endpoints.
- Webhook Integrations to deliver structured data from calls to external services (e.g., Make.com).

---

## 🛠️ Technology Stack
- Node.js
- OpenAI-Realtime-API
- Next.js
- TypeScript
- Fastify
- Twilio
- MongoDB
- Tailwind CSS

---

## 🧠 Key Challenges & Learnings

### Key Challenges
- Maintaining low-latency voice conversations
- Handling interruptions and conversational context correctly
- Managing real-time audio streaming between client and model
- Designing responses that feel natural and helpful
- Building reliable business analytics around AI conversations

### What I Learned
- Designing voice-first AI experiences
- Working with real-time multimodal AI systems
- Managing streaming audio and low-latency communication
- Balancing user experience with AI response quality
- Turning LLM capabilities into practical business tools

---

## ⚙️ Getting Started

To run the entire VocaAI platform locally, you will need to start both the backend and frontend servers.

### 1. Clone the Repository
```bash
git clone https://github.com/dilpreet579/voca-ai.git
cd voca-ai
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
OPENAI_API_KEY=your_openai_api_key
WEBHOOK_URL=https://your.webhook.url/endpoint
PORT=3001
```

Start the backend server:
```bash
node index.js
```

### 3. Frontend Setup

Open a new terminal, navigate to the frontend directory and install dependencies:
```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend` directory:
```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key
OPENAI_REALTIME_API_URL=http://localhost:3001
```

Start the frontend development server:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🤖 Architecture & Integration

- **Frontend Configuration:** The "Setup AI" page on the VocaAI website lets users define their business's system prompt and agent script.
- **Backend Sync:** Upon saving, the frontend sends the configuration to the backend's `/system-message` endpoint.
- **Call Handling:** When a call comes in via Twilio, the backend uses the latest synchronized prompt to drive the real-time interaction via the OpenAI Realtime API.

---

## 🚀 Deployment

- **Frontend:** Can be easily deployed to Vercel, Netlify, or any preferred Node.js host. Ensure environment variables (MongoDB URI, Auth Secret, Backend URL) are set.
- **Backend:** Can be deployed on any Node.js-compatible server or cloud platform. Expose the correct port and secure the API endpoints.

Ensure that the deployed frontend URL (`NEXTAUTH_URL`) and backend URL (`OPENAI_REALTIME_API_URL`) are correctly mapped in your production environment.

---

## 🤝 Credits

- Powered by Next.js, Node.js, Fastify, OpenAI, MongoDB, Twilio, and Tailwind CSS.

---

## 📄 License

ISC

---

**Note:** For production, ensure all secrets are strong, HTTPS is enabled, robust error handling is implemented, and backend URLs are correctly secured.

# EcoMahalla — Hyperlocal Civic & Waste Recycling Scheduler

> **EcoMahalla** is an intelligent civic tech platform designed to eliminate urban waste chaos in Tashkent and emerging municipalities. It provides citizens and municipal operators with real-time, mahalla-level collection schedules, AI-powered sorting guidance, route transparency, and crowdsourced citizen dispatch reporting.

[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)
[![React 19](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)](https://vitejs.dev)
[![TailwindCSS v4](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?logo=tailwindcss)](https://tailwindcss.com)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini-2.5_Flash-orange?logo=google)](https://ai.google.dev)

---

## 📌 Executive Summary

Municipal solid waste collection in rapidly growing urban centers suffers from severe information asymmetry:
* **The Problem:** Citizens do not know exact truck arrival days, leading to missed pickups, overflowing curbside bins, and unsegregated trash. Dispatchers lack immediate feedback loops when trucks are delayed or routes change.
* **The Solution:** EcoMahalla bridges this gap with an intuitive, bilingual (Uzbek & English) civic web portal featuring:
  1. **Hyperlocal 7-Day Collection Matrix:** Filter by district and mahalla with real-time current-day detection (`BUGUN` / `ERTAGA` badges) and categorized waste streams (Organic, Recyclables, Bulky).
  2. **Citizen Dispatch & Correction Reporting:** Direct crowdsourced reporting with automatic email dispatch to municipal coordinators.
  3. **EcoMahalla AI Civic Assistant:** Integrated Gemini-powered chatbot answering citizen inquiries regarding sorting regulations and collection schedules.
  4. **Open Municipal API Sandbox:** Ready-to-integrate REST endpoints for municipal logistics operators and civic dashboards.

---

## 🚀 Key Features & Demo Suite

| Feature | Description |
| :--- | :--- |
| **Unified 30/70 Dashboard** | 30% sticky mahalla quick-search selector + 70% spacious 3-card-per-row weekly collection calendar. |
| **Real-Time Day Tracking** | Dynamic date computation matching the user's actual calendar day (`Dushanba` – `Yakshanba`) with live status indicators. |
| **Citizen Dispatch Form** | Instant schedule discrepancy or missed-bin reporting sent directly to municipal dispatch (`sardieyeee08@gmail.com`). |
| **AI Recycling Chatbot** | Conversational assistant powered by Google Gemini to identify recyclable materials and guide waste segregation. |
| **Municipal API Sandbox** | Live interactive API testbed with copyable curl commands and JSON responses. |
| **Bilingual Support** | One-click instant switching between Uzbek (`O‘zbekcha`) and English (`English`). |

---

## 🛠️ Tech Stack & Architecture

* **Frontend Framework:** React 19 (TypeScript)
* **Build System & Bundler:** Vite
* **Styling & UI:** Tailwind CSS v4, Lucide React icons
* **Artificial Intelligence:** Google Gemini API (`@google/genai`) via secure serverless proxy
* **Backend / API:** Express / Vercel Serverless Functions (`/api/*`)
* **Email & Dispatch Integration:** FormSubmit REST integration
* **Deployment Target:** Vercel

---

## ⚡ Getting Started (Local Development)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/ecomahalla.git
cd ecomahalla
npm install --legacy-peer-deps
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```env
# Google Gemini API key for AI assistant features
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
```

### 3. Launch Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` (or the port specified in terminal).

### 4. Build for Production
```bash
npm run build
```
The compiled, production-ready static assets will be located in the `dist` directory.

---

## 🌐 Deploying to Vercel

1. Push your repository to **GitHub**.
2. Import the project into **Vercel**.
3. In project settings, add the environment variable:
   * `GEMINI_API_KEY`: *(Your Google AI Studio Gemini key)*
4. The repository already includes:
   * `.npmrc` configured with `legacy-peer-deps=true`
   * `vercel.json` with preconfigured install and build routes
5. Click **Deploy**.

---

## 📂 Project Structure

```
├── api/                      # Serverless backend functions & Gemini proxy
│   └── index.ts              # API router for chat & endpoints
├── src/
│   ├── components/
│   │   ├── DemoSuite/        # Dedicated /demo prototype modules
│   │   │   ├── AIChatbot.tsx           # Gemini-driven civic assistant
│   │   │   ├── APIAccess.tsx           # Municipal API sandbox
│   │   │   ├── DemoPage.tsx            # Fullscreen demo shell & switcher
│   │   │   ├── InteractivePrototype.tsx # 30/70 Mahalla schedule & citizen dispatch
│   │   │   └── VideoPitch.tsx          # Video presentation view
│   │   ├── HeroSection.tsx
│   │   ├── ProblemSolutionSection.tsx
│   │   ├── TeamSection.tsx
│   │   ├── TechPlanSection.tsx
│   │   └── WhyUsSection.tsx
│   ├── types.ts              # TypeScript interfaces & types
│   ├── App.tsx               # Main application container & router
│   └── main.tsx              # React DOM entry point
├── .npmrc                    # npm legacy peer dependencies setting
├── package.json              # Project dependencies & scripts
├── vercel.json               # Vercel deployment configuration
└── README.md                 # Project documentation
```

---

## 📩 Municipal Feedback & Contact

* **Lead Dispatcher / Founder:** sardieyeee08@gmail.com
* **Project Status:** MVP Prototype (Tashkent Pilot & Municipal Sandbox)

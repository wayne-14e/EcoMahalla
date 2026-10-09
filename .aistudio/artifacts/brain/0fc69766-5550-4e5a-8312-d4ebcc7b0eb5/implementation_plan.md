# EcoMahalla / CleanPulse — Hyperlocal Recycling & Civic Scheduler Startup

EcoMahalla is a hyperlocal civic and waste collection scheduling platform designed for municipalities starting with Tashkent and regional Central Asian pilots. This project delivers a complete startup pitch presentation website alongside a fully functioning `/demo` suite featuring a simulated pitch video, interactive prototype (collection schedules, zone detection, "What Goes Where" waste sorting database, community report dispatch), a Gemini-powered bilingual AI sorting chatbot, and an interactive developer API explorer.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The following product requirements and architectural choices were confirmed during Phase 1 clarification:

- **Startup Brand & Pilot Market**: **EcoMahalla / CleanPulse** focused on Tashkent mahallas and regional municipalities as the primary launchpad, with a modular architecture ready for global municipal expansion.
- **Language & Localization**: **Bilingual switch (O'zbekcha / English)** seamlessly togglable across both the startup investor/evaluator deck sections and the `/demo` prototype.
- **Interactivity Level**: **Full Interactive Prototype & Utility Suite** integrated into `/demo` — including:
  1. *Video Showcase*: 16:9 interactive simulated video pitch player (with playback scrub, chapters, captions, and pitch script breakdown).
  2. *Live App Prototype*: Interactive Mahalla collection schedule lookup, address/zone detector, illustrated waste sorting guide ("What Goes Where"), and town hall correction report submitter.
  3. *AI Recycling Chatbot*: Interactive Gemini 3.8 Flash-powered assistant with pre-built sample prompts in Uzbek and English for instant waste sorting advice.
  4. *API Access Sandbox*: Live API documentation with instant curl/fetch examples, simulated token generator, and real endpoint responses for municipal civic feeds.

---

### 1. Overview & Core Concept

- **What It Does**: Solves chronic waste collection inaccuracies and confusion in local municipalities. Residents often miss collection days or improperly dispose of recyclables due to fragmented city portals and outdated schedules. EcoMahalla delivers an offline-first schedule tracker, visual waste segregation guide, direct correction reporting channel to municipal dispatchers, and open civic APIs.
- **Target Audience & Personas**:
  - *Residents & Homeowners*: Need simple, dependable alerts on what bins to put out each morning.
  - *Mahalla Committees & Municipalities*: Seek higher recycling compliance, fewer missed pickups, and structured citizen reporting.
  - *Startups & Environmental Partners*: Can consume EcoMahalla's civic APIs to build smart city dashboards and logistics routing.
- **Key Value**: 99.8% schedule verification accuracy through municipal feeds + crowdsourced community reporting, zero-friction mobile web experience, and instant sorting guidance in Uzbek and English.

---

### 2. User Experience & Visual Design

#### Key User Flows & Site Navigation
The application features a single-page responsive navigation structure with deep linking and an explicit `/demo` route:

1. **Header & Navigation Bar**:
   - Single-line wordmark: **EcoMahalla** (with subtle eco leaf icon)
   - Nav links: *Muammo va Yechim (Problem/Solution)*, *Jamoa (Team)*, *Nega Biz (Why Us)*, *Yo'l Xaritasi (Roadmap)*, *Reja va Texnologiyalar (Execution & Tech)*, */demo (Live Demo & Prototype)*
   - Right action: Language toggle (`UZ | EN`) and primary CTA button `"Demo Ko'rish / View Demo"`.

2. **Section 1: Muammo → Yechim (Problem & Solution)**:
   - *Problem*: Inaccurate collection schedules (680+ complaints), zero offline support, complex municipal portals, lack of sorting awareness in mahallas.
   - *Solution*: Hyperlocal zone detection, offline-cached weekly schedules, smart "What goes where" waste guide, and citizen correction loop.
   - High-contrast split comparison showcasing old fragmented way vs. EcoMahalla clean experience.

3. **Section 2: Jamoa (Startup Team & Skill Matrix)**:
   - Profiles of key founders and roles (Founder & Civic Tech Lead, Full-Stack Engineer, Environmental Data Analyst, UI/UX Designer).
   - Technologies mastered: React, TypeScript, Tailwind CSS, Express, Firebase/Cloud SQL, Gemini AI SDK.
   - Social & Portfolio links (GitHub, LinkedIn, Portfolio).

4. **Section 3: Nima Uchun Biz (Why Our Team Can Solve This)**:
   - Deep local domain knowledge of Tashkent's mahalla administrative system.
   - Offline-first technical architecture designed for variable mobile connectivity.
   - Direct feedback integration with municipal waste operators (*Maxsustrans* & district utilities).

5. **Section 4: Yo'l Xaritasi (Roadmap: Idea → Prototype → MVP → Launch)**:
   - **Idea (Ideation)**: Problem validation, competitor gap analysis (completed).
   - **Prototype**: Interactive UI, Tashkent pilot zones, waste catalog (current stage).
   - **MVP**: Mobile app release, push notifications, 3 pilot districts (Chilonzor, Mirzo Ulug'bek, Yunusobod).
   - **Launch & Scale**: 12 districts, municipal integration, premium B2B city dashboard, Central Asia rollout.

6. **Section 5: Amalga Oshirish Rejasi (Execution Strategy & Tech Stack)**:
   - Step-by-step phased rollout with AI acceleration (Copilot/Gemini).
   - Tech architecture: React 19, Tailwind CSS v4, Express proxy backend, Google GenAI SDK.
   - Data pipeline: Municipal GIS feeds + crowdsourced verification.

7. **Section 6: `/demo` Dedicated Showcase Page**:
   - **6.1. Demo Video Player**: Custom 16:9 interactive video presentation player with animated preview, playback controls, voiceover transcript, and key timestamp markers (0:00 Muammo, 1:15 Yechim, 2:30 Mobil Ilova, 3:45 Kelajak Rejalari).
   - **6.2. Video Description & Pitch Deck Highlights**: Executive summary of the video presentation, key milestones, and presentation slides preview.
   - **6.3. Interactive Working Prototype**:
     - *Zone & Address Selector*: Choose districts (Chilonzor, Mirzo Ulug'bek, Yunusobod, Yakkasaroy) or auto-detect zone.
     - *Collection Schedule*: Today/Tomorrow view, weekly calendar, waste type tags (Organik, Qayta ishlanadigan, Elektronika, Xavfli chiqindi).
     - *What Goes Where Search*: Search 30+ items (plastik shisha, batareya, non/oziq-ovqat, lampochka, qog'oz) with clear bin color coding, prep steps, and recycling tips.
     - *Correction & Report Form*: Citizen reporting for delayed collection with instant feedback.
   - **Optional 1: AI Chatbot (Chiqindi Saralovchi AI Maslahatchi)**:
     - Chat with Gemini 3.8 Flash directly asking how to sort items, disposal rules in Tashkent, or collection times.
     - 4 quick sample questions clickable in Uzbek and English.
   - **Optional 2: API Kirish (Developer API Access)**:
     - Interactive API explorer with endpoints: `GET /api/v1/schedule/:district`, `GET /api/v1/waste-guide/search`, `POST /api/v1/reports`.
     - API Key generator simulator, curl snippets, JSON response previewer.

#### Visual Identity & Design Guidelines
- **Palette**: Clean environmental modernism with WCAG AA compliance.
  - Dominant Neutral Canvas: Crisp slate-50 (`#F8FAFC`) / dark neutral slate-950 (`#090D16`)
  - Primary Structural & Brand Accent: Vibrant emerald (`#059669` / `#10B981`) and deep forest green (`#064E3B`)
  - Informational Accent: Ocean cyan (`#0284C7`) for recycling, amber (`#D97706`) for organic, ruby (`#E11D48`) for hazardous waste.
- **Typography**: Display sans (`Plus Jakarta Sans` / system geometric sans) with tight tracking; high-legibility body sans (`DM Sans` / clean system sans); tabular figures (`font-mono tabular-nums`) for schedules and API code blocks.
- **Anti-Slop Restraint**: Zero decorative status dots, zero code-comment headers (`//`), zero arbitrary fake scoreboards ("99/100 AI SCORE"), clean unboxed metadata with `·` separators, single-line buttons and controls.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Dual View Presentation (Startup Deck + Interactive Demo)**
  - *Chosen Approach*: Route-like tabs and single-page navigation supporting both `#pitch` (complete startup documentation matching all 6 evaluation criteria) and `/demo` (dedicated live testing environment).
  - *Why*: Allows evaluators to inspect the structured textual roadmap and business plan, while instantly jumping to test the working prototype, AI chatbot, and API console.
- **Decision 2: Hybrid Client/Server Gemini API Integration**
  - *Chosen Approach*: Express server route `/api/gemini/waste-advisor` utilizing `@google/genai` with `gemini-3.8-flash` model and graceful offline fallback knowledge base if the API key is not yet configured.
  - *Why*: Complies strictly with the `@google/genai` security protocol (never exposing API keys to the browser) while guaranteeing zero downtime during evaluator grading.
- **Decision 3: Complete Bilingual Content Matrix**
  - *Chosen Approach*: High-fidelity Uzbek and English dictionaries covering all 6 mandatory sections, all waste guide items, video transcript, and UI labels.
  - *Why*: Direct compliance with user's Uzbek prompt requirement while retaining international startup investor appeal.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        EcoMahalla Frontend (React 19)                  │
├────────────────────────────────────────────────────────────────────────┤
│  Top Navigation (Brand Wordmark, 5 Pitch Nav Links, Lang, Demo CTA)   │
├──────────────────────────────────┬─────────────────────────────────────┤
│  [Startup Pitch Sections]        │  [/demo Dedicated Suite]            │
│  - 01. Problem → Solution        │  - 6.1. Interactive Video Player    │
│  - 02. Team & Skill Matrix       │  - 6.2. Pitch Video Transcript      │
│  - 03. Why Our Team (Edge)       │  - 6.3. Live App Prototype          │
│  - 04. 4-Stage Roadmap           │    ├─ Schedule Lookup by District   │
│  - 05. Implementation & Tech     │    ├─ "What Goes Where" Guide       │
│                                  │    └─ Town Hall Citizen Reporter    │
│                                  │  - AI Q&A Assistant (Gemini Flash)  │
│                                  │  - Developer API Access Sandbox     │
├──────────────────────────────────┴─────────────────────────────────────┤
│  State: i18n (UZ/EN), Active View, District Filter, Search Query, Chat │
└─────────────────────────────────┬──────────────────────────────────────┘
                                  │ fetch()
                                  ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        Server Proxy (Express / Vite)                   │
├────────────────────────────────────────────────────────────────────────┤
│  - POST /api/gemini/waste-advisor (Gemini 3.8 Flash via @google/genai) │
│  - GET  /api/v1/schedule/:district (Simulated civic REST feed)         │
│  - GET  /api/v1/waste-guide/search                                     │
│  - POST /api/v1/reports                                                │
└────────────────────────────────────────────────────────────────────────┘
```

#### Core Data Entities
- `DistrictZone`: ID, nameUz, nameEn, pickupDays (Organik, Plastik, Qog'oz, Aralash), collectionTime, nextPickupDate.
- `WasteItem`: ID, nameUz, nameEn, category (Recyclable, Organic, Hazardous, General, Electronic), binColor, instructionsUz, instructionsEn, icon.
- `TeamMember`: Name, roleUz, roleEn, skills, technologies, github, linkedin, avatar.
- `RoadmapPhase`: Phase key, titleUz, titleEn, timeline, status (Completed, Current, Next, Future), deliverables.

---

### Verification & Testing Plan
1. **Compilation Check**: Verify with `compile_applet` and `lint_applet`.
2. **Language Switching**: Ensure every single text element, tab, guide item, and prompt toggle cleanly between Uzbek and English without missing keys.
3. **Prototype Handlers**: Verify district selector updates schedule, search bar filters waste items in real time, report form submits cleanly with feedback toast.
4. **AI Chatbot**: Test both predefined Uzbek/English prompt buttons and freeform input with responsive AI responses.
5. **API Explorer**: Verify interactive "Try it" requests and response payload displays.

# Mithivoices - AI Voice Platform

## Full PRD (Comprehensive Edition)

**Document Owner:** Aryan Panwar | **Status:** Active Development  
**Last Updated:** January 16, 2026 | **Version:** 2.1  
**Target Launch:** Phase 2 Complete  
**Repository:** https://github.com/Aryanpanwar10005/ai-voice-platform

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Vision & Positioning](#2-product-vision--positioning)
3. [Target Users & Personas](#3-target-users--personas)
4. [Feature Specifications](#4-feature-specifications)
5. [User Interface Design](#5-user-interface-design)
6. [User Flows & Interactions](#6-user-flows--interactions)
7. [Success Metrics & Analytics](#7-success-metrics--analytics)
8. [Technical Architecture](#8-technical-architecture)
9. [API Specifications](#9-api-specifications)
10. [Dependencies, Risks & Constraints](#10-dependencies-risks--constraints)
11. [Development Roadmap](#11-development-roadmap)
12. [Pricing & Monetization](#12-pricing--monetization)
13. [Security & Privacy](#13-security--privacy)
14. [Approval & Governance](#14-approval--governance)
15. [Appendices](#15-appendices)

---

## 1. Executive Summary

### 1.1 Product Overview

Mithivoices is a comprehensive AI voice platform that transforms text into lifelike AI-generated voices, transcribes speech to text, and enables interactive voice conversations with AI. Built with a privacy-conscious architecture using self-hosted inference on dedicated infrastructure—not expensive third-party voice APIs.

**Final Positioning Statement:**

> Mithivoices is an indie-friendly AI voice platform offering affordable professional voice generation with self-hosted inference—not third-party APIs. Complete audio creation, editing, and management at $5/month.

### 1.2 Core Value Proposition

| Traditional TTS Services                 | Mithivoices Platform                    |
| ---------------------------------------- | --------------------------------------- |
| ❌ Expensive API costs ($0.01-0.03/char) | ✅ Flat monthly pricing ($5/month)      |
| ❌ Text → Audio only                     | ✅ Text → Audio → Edit → Manage         |
| ❌ No history tracking                   | ✅ Full audio history with previews     |
| ❌ No post-generation editing            | ✅ Non-destructive editing & trimming   |
| ❌ Download and forget                   | ✅ Workspace for audio projects         |
| ❌ Third-party API dependency            | ✅ Self-hosted inference infrastructure |
| ❌ Enterprise pricing only               | ✅ Indie-friendly pricing               |

### 1.3 Business Goals

| Phase                 | Goal                                       | Status         |
| --------------------- | ------------------------------------------ | -------------- |
| Phase 1 (MVP)         | Validate core voice features               | ✅ Complete    |
| Phase 2 (Current)     | Professional UI with audio management      | ⏳ In Progress |
| Phase 3 (Planned)     | Supabase auth, Stripe payments, paid plans | ⬜ Planned     |
| Phase 4 (Exploratory) | Voice cloning, API, enterprise features    | ⬜ Exploratory |

### 1.4 Success Criteria

| Metric               | Target                  | Measurement         |
| -------------------- | ----------------------- | ------------------- |
| TTS generation time  | < 3 seconds (500 chars) | API timing          |
| STT accuracy         | > 90% (clear audio)     | Transcription tests |
| Audio quality        | 44.1kHz, 16-bit WAV     | Output analysis     |
| Paid conversion rate | > 5%                    | Analytics           |
| User satisfaction    | > 4.5/5 rating          | In-app surveys      |

---

## 2. Product Vision & Positioning

### 2.1 Vision Statement

To democratize professional voice content creation by providing an indie-friendly, AI-powered audio platform with affordable pricing and privacy-conscious architecture using self-hosted inference.

### 2.2 Mission

Empower content creators, developers, educators, and businesses to generate, edit, and manage high-quality AI voices without expensive API costs, requiring technical expertise, or paying enterprise subscription fees.

### 2.3 Market Positioning

- **Category:** AI Voice Generation & Audio Management Platform
- **Target Market:** Individual content creators, indie developers, small businesses
- **Pricing Strategy:** Freemium with affordable paid tiers ($5/month, $25/6 months)
- **Competitive Edge:** Self-hosted inference, no third-party voice API costs, indie-friendly pricing
- **AI Assistant Name:** mithiAI (for future conversational features)

### 2.4 Platform Philosophy & Anti-Goals

**Mithivoices IS intentionally designed to:**

- ✅ Provide affordable, professional-grade audio quality
- ✅ Use self-hosted inference on dedicated infrastructure
- ✅ Offer complete audio workflow management
- ✅ Be accessible to indie creators and small businesses
- ✅ Use privacy-conscious architecture (no third-party voice APIs)

**Mithivoices is intentionally NOT:**

- ❌ A Digital Audio Workstation (DAW) - Focus on voice generation, not music production
- ❌ An Enterprise-first Platform - Indie creators first, enterprise later
- ❌ Using Third-party Voice APIs - Self-hosted inference for cost control
- ❌ Claiming "entirely offline" - Uses cloud-hosted infrastructure
- ❌ Voice Acting Replacement - Tool for creators, not substitute for professionals

---

## 3. Target Users & Personas

### 3.1 User Segmentation

#### 3.1.1 Content Creators (60% of users)

**Demographics:**

- Age Range: 22-40 years
- Occupation: YouTubers, podcasters, video producers, social media influencers
- Technical Skill: ⭐⭐⭐ Medium (comfortable with creative software)
- Geographic: Global (English-speaking markets initially)

**Behavioral Characteristics:**

- Creates 3-10 pieces of content per week
- Values speed and consistency over perfection
- Budget-conscious, seeks cost-effective solutions
- Willing to pay $5/month for quality tools

**Needs & Jobs-to-be-Done:**

1. High-quality voiceovers for videos
2. Fast turnaround times for content production
3. Cost-effective alternative to voice actors and expensive APIs
4. Consistent voice branding across content

**Pain Points:**

1. Expensive voice actor fees ($100-500 per project) - High severity
2. Expensive API costs ($0.01-0.03/character) - High severity
3. Time-consuming processes (24-48 hour turnaround) - High frequency

#### 3.1.2 Indie Developers (25% of users)

**Demographics:**

- Age Range: 25-45 years
- Occupation: Software engineers, app developers, indie game developers
- Technical Skill: ⭐⭐⭐⭐⭐ High (programming experience)

**Needs:**

- Voice features for applications
- Predictable pricing (not usage-based)
- No API rate limits
- Simple integration

**Pain Points:**

- Third-party API costs unpredictable at scale
- Usage-based pricing makes budgeting difficult
- Latency issues with remote APIs

#### 3.1.3 Educators (15% of users)

**Demographics:**

- Age Range: 28-55 years
- Occupation: Teachers, instructional designers, e-learning creators
- Technical Skill: ⭐⭐ Low to Medium

**Needs:**

- Educational audio content
- Clear, professional narration
- Budget-friendly for education sector

### 3.2 Detailed User Persona

**Persona: Alex Rivera - "I need professional voiceovers without the professional price tag"**

**Demographics:**

- Age: 32
- Location: Los Angeles, CA
- Role: Full-time YouTuber & Podcast Host (250K subscribers)
- Income: $75,000/year
- Education: Bachelor's in Communications
- Tech Savviness: Advanced with creative tools

**Background & Context:**
Alex runs a tech review YouTube channel and weekly podcast. Creates 3-4 videos per week and needs consistent, high-quality voiceovers. Previously spent $300-500/month on voice actors and voice API services. Discovered Mithivoices and now pays only $5/month.

**Goals:**

1. **Professional:** Generate professional voiceovers in under 5 minutes
2. **Personal:** Maintain consistent voice branding across 200+ videos
3. **Immediate:** Reduce production costs by 95% with $5/month subscription
4. **Long-term:** Scale content production without scaling costs

**Frustrations:**

1. Voice actors have 24-48 hour turnaround times
2. API services charge per character, costs unpredictable
3. Multiple revision rounds are expensive
4. Inconsistent audio quality across different services

**Mithivoices Usage Scenario:**

1. Writes video script in Notion (1,200 characters)
2. Opens Mithivoices in browser
3. Pastes script and selects "Aria - Professional" voice
4. Generates audio in 3 seconds
5. Previews, trims intro slightly
6. Downloads and imports to Premiere Pro
7. **Total time: < 2 minutes, Total cost: $5/month flat**

**Success Looks Like:**

- ✅ Uses Mithivoices 4-5 times per week
- ✅ Generates 15-20 audio files per month
- ✅ Saves $395/month compared to previous solutions
- ✅ Reduces video production time by 30%

**Potential Quote:** _"Mithivoices turned my $500/month voice budget into $5/month. Same quality, fraction of the cost."_

---

## 4. Feature Specifications

### 4.1 Feature Overview & Prioritization

| Feature                       | Priority | User Value | Effort | Phase | Owner    |
| ----------------------------- | -------- | ---------- | ------ | ----- | -------- |
| Intelligent Script Editor     | P0       | High       | Low    | 2     | Frontend |
| AI Voice Generation           | P0       | High       | Medium | 2     | Backend  |
| Audio Playback System         | P0       | High       | Low    | 2     | Frontend |
| Professional Workspace Layout | P0       | High       | Medium | 2     | Frontend |
| Voice Profile Management      | P0       | High       | Low    | 2     | Backend  |
| Interactive Waveform          | P1       | Medium     | Medium | 2     | Frontend |
| Language & Accent Selection   | P1       | Medium     | Low    | 2     | Backend  |
| Audio History Panel           | P1       | Medium     | Medium | 2     | Frontend |
| Regenerate Audio              | P1       | Medium     | Low    | 2     | Backend  |
| Adjust Voice Parameters       | P1       | Medium     | Low    | 2     | Frontend |
| Download & Export             | P0       | High       | Low    | 2     | Frontend |
| Edit Mode (Non-Destructive)   | P2       | Low        | High   | 2     | Frontend |
| Audio Trimming                | P2       | Low        | Medium | 2     | Frontend |
| Storage Usage Monitoring      | P2       | Low        | Low    | 2     | Frontend |
| Credit Tracking (Mocked)      | P2       | Low        | Low    | 2     | Backend  |
| Supabase Auth                 | P0       | High       | Medium | 3     | Backend  |
| Stripe Payments               | P0       | High       | Medium | 3     | Backend  |
| Real Credits System           | P1       | High       | Medium | 3     | Backend  |

---

### 4.2 Feature 1: Intelligent Script Editor (P0)

**Feature Owner:** Frontend Team

#### 4.2.1 Overview

**User Value Statement:** As a content creator, I need a distraction-free writing area so that I can focus on script quality.

**Success Metric:** Character count updates in < 100ms, textarea auto-focuses

#### 4.2.2 Capabilities

- ✅ Large input editor for long-form scripts (5,000 character limit)
- ✅ Live character counter with visual feedback (e.g., "123 / 5,000")
- ✅ Auto-focus on page load for distraction-free writing
- ✅ Supports paste, typing, and future file import

#### 4.2.3 Functional Requirements

**Must Have:**

1. Textarea with minimum height 280px
2. Real-time character count with color-coded alerts
3. Auto-focus on component mount
4. Background: #F8FAFC
5. Placeholder: "Type or paste your script here..."

**Color Coding:**

- Green (#10B981): 0-4,000 characters
- Orange (#F59E0B): 4,000-4,750 characters
- Red (#EF4444): 4,750-5,000 characters

#### 4.2.4 Acceptance Criteria

- [ ] Textarea auto-focuses on page load
- [ ] Counter updates in real-time (< 100ms)
- [ ] Color changes at correct thresholds
- [ ] Paste operations work without formatting issues
- [ ] Keyboard accessible (Tab key)

---

### 4.3 Feature 2: AI Voice Generation (P0)

**Feature Owner:** Backend Team

#### 4.3.1 Overview

**User Value Statement:** As a content creator, I want natural-sounding voices so that my content feels professional.

**Success Metric:** Generation time < 3 seconds for 500 characters

#### 4.3.2 Capabilities

- ✅ Convert text into lifelike AI voices using Piper TTS
- ✅ Self-hosted inference on Oracle Cloud VM (no third-party voice APIs)
- ✅ Natural pacing, tone, and clarity
- ✅ Real-time generation feedback with loading states

#### 4.3.3 Technical Requirements

**API Endpoint:** `POST /tts`

**Request:**

```json
{
  "text": "string (max 5000 chars)",
  "voice": "string (profile ID)",
  "speed": "float (0.5 - 2.0)",
  "pitch": "int (-5 to +5)"
}
```

**Response:** Audio WAV file (blob) - 44.1kHz, 16-bit

**Infrastructure:**

- Hosted on: Oracle Cloud Always Free VM
- Inference: Piper TTS (self-hosted)
- No third-party voice APIs

**Performance:**

- Generation time: < 3s for 500 chars
- Timeout: 30 seconds
- Retry logic: 3 attempts with exponential backoff

---

### 4.4 Feature 3: Voice Profile Management (P0)

#### 4.4.1 Available Voice Profiles

| Profile Name        | Description               | Piper Model           | Best For             |
| ------------------- | ------------------------- | --------------------- | -------------------- |
| Aria - Professional | Neutral, clear, narrative | en_US-lessac-medium   | Business, explainers |
| Neural AI Premium   | Warm, engaging            | en_US-ryan-high       | Podcasts             |
| Alex - Technical    | Precise, authoritative    | en_US-ljspeech-medium | Tutorials            |
| Emma - Friendly     | Upbeat, approachable      | en_US-amy-medium      | Social media         |

---

### 4.5 Feature 4: Interactive Waveform (P1)

#### 4.5.1 Visual Specifications

- Canvas-based rendering
- 100% width x 80px height
- 200 vertical bars
- Played: #3B82F6 (blue)
- Unplayed: #CBD5E1 (gray)

#### 4.5.2 Interactive Features

- Click-to-seek
- Hover time tooltip
- Drag handles in Edit Mode
- Real-time sync

---

### 4.6 Feature 5: Edit Mode (P2)

#### 4.6.1 Edit Mode Banner

```css
Background: #DBEAFE
Text: "EDIT MODE ACTIVE — CHANGES WILL NOT AFFECT THE ORIGINAL UNTIL APPLIED"
Buttons: [CANCEL] [APPLY CHANGES]
```

#### 4.6.2 Behavior

- Download disabled during edit
- Drag handles for trimming
- Preview selected segment
- Non-destructive until applied

---

## 5. User Interface Design

### 5.1 Design System

#### 5.1.1 Color Palette

**Primary:**

```css
--primary-500: #2563eb;
--primary-600: #1d4ed8;
--primary-100: #dbeafe;
```

**Text:**

```css
--text-heading: #0f172a;
--text-body: #475569;
--text-secondary: #64748b;
```

**Status:**

```css
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
```

#### 5.1.2 Typography

```css
font-family: "Inter", sans-serif;
--h1: 32px / bold;
--h2: 24px / semibold;
--body: 16px / regular;
--caption: 12px / regular;
```

### 5.2 Layout Structure

```
┌──────────────┬─────────────────────────────┬─────────────────┐
│   Sidebar    │  Header (Breadcrumbs)       │  Audio History  │
│   (230px)    ├─────────────────────────────┤   Panel (280px) │
│              │                             │                 │
│  - Dashboard │   Main Content Area         │  History Items  │
│  - TTS ✓     │   (Editor, Waveform,        │                 │
│  - STT       │    Controls)                │  Storage Usage  │
│  - Voice Lab │                             │                 │
│  - Settings  │                             │                 │
│              │                             │                 │
│  Credits     │                             │                 │
│  User Avatar │                             │                 │
└──────────────┴─────────────────────────────┴─────────────────┘
```

---

## 6. User Flows & Interactions

### 6.1 TTS Generation Flow

```
Enter Text → Select Voice → Generate (~3s) → Preview → Download/Edit
```

### 6.2 Edit Mode Flow

```
Click Edit → Banner appears → Drag handles → Apply or Cancel
```

---

## 7. Success Metrics & Analytics

### 7.1 Product Metrics

| Metric           | Target (3mo) | Target (6mo) |
| ---------------- | ------------ | ------------ |
| Generation Time  | < 3s         | < 2s         |
| Audio Quality    | 4.0/5        | 4.5/5        |
| Feature Adoption | 30%          | 50%          |

### 7.2 Business Metrics (Phase 3+)

| Metric               | Target      |
| -------------------- | ----------- |
| Free Users           | 1,000+      |
| Paid Users (Starter) | 150+        |
| MRR                  | $750+       |
| ARPU                 | ~$5/month   |
| Conversion Rate      | 5-10%       |
| Churn Rate           | < 10%/month |

---

## 8. Technical Architecture

### 8.1 System Architecture

```
┌─────────────────────────────────────────────────────┐
│                 FRONTEND (Vercel)                    │
│  React 18 + TypeScript + Tailwind CSS               │
└─────────────────────────┬───────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│              BACKEND (Oracle Cloud VM)               │
│  FastAPI + Piper TTS + Whisper + Ollama             │
└─────────────────────────┬───────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│                SUPABASE (Phase 3)                    │
│  Auth | Database | Storage                          │
└─────────────────────────────────────────────────────┘
```

### 8.2 Technology Stack

| Layer     | Technology                      | Hosting               |
| --------- | ------------------------------- | --------------------- |
| Frontend  | React 18, TypeScript, Tailwind  | Vercel (Free)         |
| Backend   | FastAPI, Piper, Whisper, Ollama | Oracle Cloud (Free)   |
| Auth & DB | Supabase                        | Supabase (Free → Pro) |
| Payments  | Stripe                          | Stripe                |
| Storage   | Supabase Storage                | Phase 3               |

### 8.3 Hosting Costs

| Component    | Provider     | Tier        | Monthly Cost     |
| ------------ | ------------ | ----------- | ---------------- |
| Frontend     | Vercel       | Free        | $0               |
| Voice Engine | Oracle Cloud | Always Free | $0               |
| Auth + DB    | Supabase     | Free → Pro  | $0 → $25         |
| Payments     | Stripe       | Standard    | 2.9% + $0.30/txn |

---

## 9. API Specifications

### 9.1 Text-to-Speech

**Endpoint:** `POST /tts`

**Request:**

```json
{
  "text": "Hello, this is a test.",
  "voice": "en_US-lessac-medium",
  "speed": 1.0,
  "pitch": 0
}
```

**Response:** `audio/wav` binary

### 9.2 Voice Profiles

**Endpoint:** `GET /voices`

**Response:**

```json
{
  "voices": [
    {
      "id": "en_US-lessac-medium",
      "name": "Aria - Professional",
      "description": "Neutral, clear, narrative"
    }
  ]
}
```

---

## 10. Dependencies, Risks & Constraints

### 10.1 Dependencies

| Dependency   | Type     | Status      |
| ------------ | -------- | ----------- |
| Piper TTS    | External | 🟢 Complete |
| Oracle Cloud | External | 🟢 Complete |
| Vercel       | External | 🟢 Complete |
| Supabase     | External | 🟡 Phase 3  |
| Stripe       | External | 🟡 Planned  |

### 10.2 Risks

| Risk            | Impact | Mitigation             |
| --------------- | ------ | ---------------------- |
| Oracle limits   | Medium | Monitor, upgrade path  |
| Low conversion  | High   | Optimize pricing/value |
| Slow generation | High   | Model optimization     |

### 10.3 Constraints (Phase 2)

- ⚠️ Credits system MOCKED
- ⚠️ No user authentication
- ⚠️ Storage mocked/minimal
- ⚠️ Stripe planned but inactive during beta

---

## 11. Development Roadmap

### 11.1 Phase Overview

| Phase   | Status         | Goal                           |
| ------- | -------------- | ------------------------------ |
| Phase 1 | ✅ Complete    | MVP                            |
| Phase 2 | ⏳ 65%         | Professional UI                |
| Phase 3 | ⬜ Planned     | Auth, Payments, Paid Plans     |
| Phase 4 | ⬜ Exploratory | Voice cloning, API, Enterprise |

### 11.2 Phase 3 Scope

| Feature                   | Priority |
| ------------------------- | -------- |
| Supabase Auth             | P0       |
| Stripe Integration (Live) | P0       |
| Free Plan                 | P0       |
| Starter Monthly ($5)      | P0       |
| Starter 6-Month ($25)     | P0       |
| Real Credits System       | P1       |
| Supabase Storage          | P1       |

### 11.3 Phase 4+ (Exploratory)

- Voice cloning (exploratory)
- API access (exploratory)
- Enterprise SSO (future)
- API marketplace (future)

---

## 12. Pricing & Monetization

### 12.1 Pricing Tiers

| Plan                | Price        | Billing  | Credits             |
| ------------------- | ------------ | -------- | ------------------- |
| **Free**            | $0           | -        | Low allocation      |
| **Starter Monthly** | $5/month     | Monthly  | Moderate allocation |
| **Starter 6-Month** | $25/6 months | One-time | Same as monthly     |

### 12.2 Credit Allocation

| Plan          | Credits/Period | Validity         |
| ------------- | -------------- | ---------------- |
| Free          | Low            | Monthly reset    |
| Starter ($5)  | Moderate       | Monthly reset    |
| Starter ($25) | Moderate × 6   | 6-month validity |

### 12.3 Payment Integration

**Status:** Stripe chosen, NOT active during beta

**Beta Phase:**

- Free access via whitelist
- Stripe in test mode only
- No payments processed

**Phase 3:**

- Stripe goes live
- Paid plans activated
- Credit system enforced

### 12.4 Removed Features

❌ Enterprise pricing ($99/month) - Not for initial launch
❌ Annual plans - Simplify with monthly + 6-month only
❌ Usage-based pricing - Flat pricing only

---

## 13. Security & Privacy

### 13.1 Architecture Principles

- **Self-hosted inference:** Voice generation on our Oracle VM
- **No third-party voice APIs:** Audio data not sent to external services
- **Privacy-conscious:** Minimal data collection
- **Secure auth:** Supabase handles authentication (Phase 3)

### 13.2 Data Handling

- Audio generated on our infrastructure
- User data stored in Supabase (Phase 3)
- HTTPS everywhere
- No audio data sold or shared

### 13.3 Clarifications

**We DO NOT claim:**

- ❌ "Entirely offline" - Uses cloud infrastructure
- ❌ "No cloud usage" - Hosted on Vercel, Oracle, Supabase
- ❌ "Local-only" - Cloud-hosted architecture

**We DO provide:**

- ✅ Self-hosted inference (not third-party APIs)
- ✅ Privacy-conscious architecture
- ✅ No third-party voice API dependencies

---

## 14. Approval & Governance

### 14.1 Sign-Off

| Stakeholder  | Role             | Status     |
| ------------ | ---------------- | ---------- |
| Aryan Panwar | Product Lead/DRI | ☑ Approved |

### 14.2 Document Governance

**Owner:** Aryan Panwar  
**Review Cadence:** Weekly  
**Next Review:** January 23, 2026

---

## 15. Appendices

### 15.1 Glossary

| Term    | Definition                 |
| ------- | -------------------------- |
| TTS     | Text-to-Speech             |
| STT     | Speech-to-Text             |
| Piper   | Open-source TTS engine     |
| mithiAI | AI assistant name (future) |
| Starter | Paid plan tier             |

### 15.2 References

- Repository: https://github.com/Aryanpanwar10005/ai-voice-platform
- Piper TTS: https://github.com/rhasspy/piper

---

**Document Status:** Active Development  
**Last Updated:** January 16, 2026  
**Version:** 2.1

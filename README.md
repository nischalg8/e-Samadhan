# e-Samadhan

## Overview

**e-Samadhan** is an e-governance platform that enables citizens to report local civic issues (water leakage, electricity outage, road damage, waste problems) by selecting a location, priority, photo, and description. An AI-assisted routing system automatically identifies the responsible government entity (e.g., KUKL, NEA, Municipality) and forwards the issue to the correct dashboard for action.

The platform improves service delivery, transparency, and accountability.

---

## Problem Statement

* Many citizens, especially younger ones, are not aware of which government entity they should direct their concerns or responses to.
* Complaints are delayed and not addressed on time
* There is limited transparency and accountability in issue resolution

---

## Solution

e-Samadhan provides:

* A **citizen-facing app** to report issues with location and evidence
* An **AI-assisted routing engine** to identify the correct authority
* **Government dashboards** for entities like KUKL and NEA
* A **points-based accountability system** for both citizens and authorities

---



## Key Features

### Citizen Side

* Login (simulated Citizen ID for MVP)
* Select location via map (GPS or pin)
* Choose issue type and priority
* Upload photo and description
* Track issue status (Submitted → In Progress → Resolved)
* Earn points for valid and correctly prioritized reports

### AI-Assisted Features

* Issue classification (water, electricity, road, waste)
* Automatic authority mapping (KUKL, NEA, Municipality)
* Priority validation based on description
* Duplicate issue detection (location + time + similarity)
* Human-in-the-loop: final authority decision remains manual

### Government Entity Dashboard

* Role-based login (KUKL, NEA, Municipality)
* View assigned issues
* Map-based visualization
* Update issue status
* Earn points for timely resolution

---


## Architecture

```
Citizen Web App
   ↓ (Issue Data: location, text, image)
Django REST API
   ↓
Rule-Based Router
   ↓ (low confidence cases)
Gemini Flash (LLM)
   ↓
Issue Management Service
   ↓
Government Dashboards
(KUKL / NEA / Municipality)
```

---

## Tech Stack

### Frontend

* React.js 
* Mapbox or Google Maps API

### Backend (Recommended)

* **Django + Django REST Framework**
* Simple, stable, and fast to build

### Database

* **SQLite**

  * Zero setup
  * Easy deployment

### AI / NLP

* Gemini Flash (free tier)
* Keyword rules + LLM fallback

### Authentication

* Simulated Citizen ID login
* Role-based access for government admins

---

## Security & Privacy

* Minimal personal data collection
* No public exposure of citizen identity
* Role-based access control
* All AI processing logged (mock audit trail)
* Privacy-by-design principles

---

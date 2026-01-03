# e-Samadhan

---

## Overview

e-Samadhan is an e-governance platform that enables citizens to report local civic issues (water leakage, electricity outage, road damage, waste problems) by selecting a location, priority, photo, and description. The system assigns the issue to the correct government authority based on the issue category (KUKL, NEA, Municipality). The platform improves service delivery, transparency, and accountability.

---

## Problem Statement

- Citizens are often unsure which government entity handles specific issues
- Complaints are delayed or go unresolved
- Transparency and accountability in issue resolution are limited

---

## Solution

e-Samadhan provides:

- A citizen-facing app to report issues with location, description, and photo
- Category-based automatic routing to the correct authority
- Government dashboards for KUKL, NEA, and Municipality
- A points-based system for citizens and authorities based on issue resolution

---

## Key Features

### Citizen Side

- Login using Citizen ID
- Select issue location on a map (OpenStreetMap)
- Choose issue type (water, electricity, road, waste) and priority
- Upload photo and description
- Track issue status (Submitted → In Progress → Resolved)
- Earn points when issues are resolved

### Government Dashboard

- Role-based login (KUKL, NEA, Municipality)
- View assigned issues
- Update issue status
- Earn points for resolved issues
- Map-based visualization of issues

---

## Architecture

```
Citizen Web App
      ↓
(Issue Data: location, category, description, photo)
      ↓
Django REST API
      ↓
Issue Assignment (Category-Based)
      ↓
Issue Management Service
      ↓
Government Dashboards (KUKL / NEA / Municipality)
```

---

## Tech Stack

### Frontend
- React.js
- OpenStreetMap for maps

### Backend
- Django + Django REST Framework

### Database
- SQLite

### Authentication
- Citizen ID login (simulated)
- Role-based access for government admins

---

## Security & Privacy

- Minimal personal data collection
- No public exposure of citizen identity
- Role-based access control
- All issue assignment and resolution logged
- Privacy-by-design principles

---

## Getting Started / How to Run

### Clone the repository

```bash
git clone <repository-url>
cd e-samadhan
```

### Backend Setup

Install Python dependencies:

```bash
pip install -r requirements.txt
```

Run Django server:

```bash
python manage.py runserver
```

The backend will run on: **http://localhost:8000**

### Frontend Setup

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start React app:

```bash
npm start
```

The frontend will run on: **http://localhost:3000**

### Access the App

Open your browser and go to: **http://localhost:3000**

Login as a citizen or government admin and start reporting/viewing issues.
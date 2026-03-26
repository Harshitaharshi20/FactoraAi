# FactorAI

FactorAI is an AI-powered misinformation detection system that detects whether text is fake or real, explains why, shows how it spreads, and discourages resharing.

FactorAI — Misinformation Detection System

## 🧠 Overview

FactorAI is an AI-powered system that detects fake content, explains why it is misleading, visualizes its spread, and helps prevent resharing.

## ✨ Features

* Fake vs Real detection
* Highlight misleading content
* Confidence score
* Spread visualization
* Reshare prevention system

## 🏗️ Tech Stack

* Frontend: Next.js
* Backend: Spring Boot
* AI Service: FastAPI

## 🚀 How It Works

User Input → AI Analysis → Explanation → Spread Graph → Prevention

## 📌 Status

Hackathon MVP 🚀
## Features
- **AI-Powered Detection**: Real-time evaluation of text to classify as REAL, UNVERIFIED, or FAKE.
- **Explainability**: Highlights sensational or misleading keywords in red.
- **Virality Tracking**: Simulates origin and spread network (e.g., WhatsApp → Twitter → Facebook).
- **Source Credibility**: Assesses credibility score.
- **Clean UI Dashboard**: Next.js frontend with TailwindCSS for a premium full-stack experience.

## Tech Stack
- **Frontend**: Next.js (React), TailwindCSS, Axios, Lucide React
- **Backend**: Spring Boot (Java 17), REST APIs, Maven
- **AI Service**: Python, FastAPI, Pydantic, Uvicorn

## Project Structure
```text
FactoraAi/
├── frontend/        (Next.js App)
├── backend/         (Spring Boot API Gateway)
├── ai-service/      (Python FastAPI AI Model)
└── README.md
```

## Setup Instructions

### 1. AI Service (Port 8000)
Navigate to the `ai-service` folder, install requirements, and run the FastAPI server:
```bash
cd ai-service
pip install -r requirements.txt
uvicorn main:app --port 8000 --reload
```

### 2. Backend Gateway (Port 8080)
Navigate to the `backend` folder and run the Spring Boot application using Maven:
```bash
cd backend
./mvnw spring-boot:run
# or if maven is installed globally:
mvn spring-boot:run
```

### 3. Frontend Dashboard (Port 3000)
Navigate to the `frontend/factoraai` directory, install dependencies, and run the development server:
```bash
cd frontend/factoraai
npm install
npm run dev
```

### 🐳 Run using Docker
If you'd like to run all three services simultaneously without configuring any local environments (like Python/Java), you can use Docker.

From the root `FactoraAi` directory, simply run:
```bash
docker-compose up --build
```
This will automatically spin up the AI Service, Backend API, and Frontend UI connected together via an isolated Docker network. Or you can run `docker-compose up -d` to run it in the background.

Open [http://localhost:3000](http://localhost:3000) in your browser to use FactorAI! 

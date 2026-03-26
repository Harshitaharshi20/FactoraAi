from fastapi import FastAPI
from pydantic import BaseModel
import random

app = FastAPI()

class AnalyzeRequest(BaseModel):
    text: str

class AnalyzeResponse(BaseModel):
    prediction: str
    confidence: int
    highlight: list[str]
    reason: str
    origin: str
    spread: list[str]
    virality: str
    credibility: str

def get_base_reason(prediction: str) -> str:
    if prediction == "FAKE":
        return "Contains exaggerated and clickbait content or strong unverified claims."
    elif prediction == "UNVERIFIED":
        return "Contains some sensational words but needs more verification."
    else:
        return "Content seems factual without excessive sensationalism."

def get_credibility(prediction: str) -> str:
    if prediction == "FAKE":
        return "LOW"
    elif prediction == "UNVERIFIED":
        return "MEDIUM"
    return "HIGH"

@app.post("/analyze", response_model=AnalyzeResponse)
async def analyze_text(request: AnalyzeRequest):
    text = request.text.lower()
    keywords = ["breaking", "shocking", "100%", "urgent", "guarantee"]
    
    score = 0
    highlights = []
    
    # Calculate score based on keywords
    for kw in keywords:
        if kw in text:
            score += 20
            highlights.append(kw)
    
    # Detect strong claims (heuristic simulation)
    strong_claims = ["must watch", "secret", "never before", "banned"]
    for sc in strong_claims:
        if sc in text:
            score += 15
            highlights.append(sc)
            
    # Cap score at 100
    confidence = min(score, 100)
    
    # Determine prediction
    if confidence <= 30:
        prediction = "REAL"
    elif confidence <= 70:
        prediction = "UNVERIFIED"
    else:
        prediction = "FAKE"
        
    virality = "HIGH" if confidence > 60 else ("MEDIUM" if confidence > 30 else "LOW")
    
    origins = ["WhatsApp", "Twitter", "Telegram"]
    spreads = ["Instagram", "Facebook", "TikTok", "Reddit"]
    
    selected_origin = random.choice(origins)
    selected_spread = random.sample(spreads, k=2)

    return AnalyzeResponse(
        prediction=prediction,
        confidence=confidence,
        highlight=highlights,
        reason=get_base_reason(prediction),
        origin=selected_origin,
        spread=selected_spread,
        virality=virality,
        credibility=get_credibility(prediction)
    )

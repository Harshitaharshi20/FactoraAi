package com.factorai.model;

import java.util.List;

public class AnalyzeResponse {
    private String prediction;
    private int confidence;
    private List<String> highlight;
    private String reason;
    private String origin;
    private List<String> spread;
    private String virality;
    private String credibility;

    // Getters and Setters
    public String getPrediction() { return prediction; }
    public void setPrediction(String prediction) { this.prediction = prediction; }

    public int getConfidence() { return confidence; }
    public void setConfidence(int confidence) { this.confidence = confidence; }

    public List<String> getHighlight() { return highlight; }
    public void setHighlight(List<String> highlight) { this.highlight = highlight; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public String getOrigin() { return origin; }
    public void setOrigin(String origin) { this.origin = origin; }

    public List<String> getSpread() { return spread; }
    public void setSpread(List<String> spread) { this.spread = spread; }

    public String getVirality() { return virality; }
    public void setVirality(String virality) { this.virality = virality; }

    public String getCredibility() { return credibility; }
    public void setCredibility(String credibility) { this.credibility = credibility; }
}

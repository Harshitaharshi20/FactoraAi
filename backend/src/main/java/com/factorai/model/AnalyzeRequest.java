package com.factorai.model;

import jakarta.validation.constraints.NotBlank;

public class AnalyzeRequest {
    
    @NotBlank(message = "Text cannot be blank")
    private String text;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}

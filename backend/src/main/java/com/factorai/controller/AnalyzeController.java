package com.factorai.controller;

import com.factorai.model.AnalyzeRequest;
import com.factorai.model.AnalyzeResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api")
public class AnalyzeController {

    @Value("${ai.service.url}")
    private String aiServiceUrl;

    private final RestTemplate restTemplate;

    public AnalyzeController() {
        this.restTemplate = new RestTemplate();
    }

    @PostMapping("/analyze")
    public ResponseEntity<AnalyzeResponse> analyze(@Valid @RequestBody AnalyzeRequest request) {
        // Call the AI Service (FastAPI) running on port 8000
        ResponseEntity<AnalyzeResponse> response = restTemplate.postForEntity(
                aiServiceUrl,
                request,
                AnalyzeResponse.class
        );
        
        return ResponseEntity.ok(response.getBody());
    }
}

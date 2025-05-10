package com.recipefy.recipefy_backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.*;

@Service
public class NutritionService {

    @Value("${nutritionix.app.id}")
    private String appId;

    @Value("${nutritionix.app.key}")
    private String appKey;

    @Value("${nutritionix.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public int calculateCalories(List<String> ingredients) {
        // Combine ingredients into a query string
        String query = String.join("\n", ingredients);

        // Prepare headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-app-id", appId);
        headers.set("x-app-key", appKey);
        headers.set("x-remote-user-id", "0");

        HttpEntity<Map<String, String>> request = new HttpEntity<>(
                Map.of("query", query),
                headers
        );

        try {
            ResponseEntity<Map> response = restTemplate.exchange(
                    apiUrl, HttpMethod.POST, request, Map.class);

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                Map<String, Object> body = response.getBody();
                List<Map<String, Object>> foods = (List<Map<String, Object>>) body.get("foods");

                // Safely sum calories from all foods
                double totalCalories = foods.stream()
                        .mapToDouble(food -> {
                            try {
                                // Handle both Integer and Double values
                                Number calories = (Number) food.get("nf_calories");
                                return calories != null ? calories.doubleValue() : 0;
                            } catch (Exception e) {
                                return 0; // Skip this ingredient if parsing fails
                            }
                        })
                        .sum();

                return (int) Math.round(totalCalories);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        // Fallback: Calculate what we can from individual ingredients
        return calculateFallbackCalories(ingredients);
    }

    private int calculateFallbackCalories(List<String> ingredients) {
        // Try to calculate calories for each ingredient individually
        int total = 0;

        for (String ingredient : ingredients) {
            try {
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);
                headers.set("x-app-id", appId);
                headers.set("x-app-key", appKey);
                headers.set("x-remote-user-id", "0");

                HttpEntity<Map<String, String>> request = new HttpEntity<>(
                        Map.of("query", ingredient),
                        headers
                );

                ResponseEntity<Map> response = restTemplate.exchange(
                        apiUrl, HttpMethod.POST, request, Map.class);

                if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                    Map<String, Object> body = response.getBody();
                    List<Map<String, Object>> foods = (List<Map<String, Object>>) body.get("foods");

                    if (foods != null && !foods.isEmpty()) {
                        Number calories = (Number) foods.get(0).get("nf_calories");
                        if (calories != null) {
                            total += calories.intValue();
                        }
                    }
                }
            } catch (Exception e) {
                // Skip this ingredient if there's an error
                continue;
            }
        }

        return total;
    }
}
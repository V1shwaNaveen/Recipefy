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
        headers.set("x-remote-user-id", "0"); // Required by Nutritionix

        // Prepare request body
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("query", query);

        HttpEntity<Map<String, String>> request = new HttpEntity<>(requestBody, headers);

        try {
            // Make API call
            ResponseEntity<Map> response = restTemplate.exchange(
                    apiUrl,
                    HttpMethod.POST,
                    request,
                    Map.class
            );

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                Map<String, Object> body = response.getBody();
                List<Map<String, Object>> foods = (List<Map<String, Object>>) body.get("foods");

                // Sum calories from all foods
                double totalCalories = foods.stream()
                        .mapToDouble(food -> (double) food.get("nf_calories"))
                        .sum();

                return (int) Math.round(totalCalories);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return 0; // Default if API fails
    }
}
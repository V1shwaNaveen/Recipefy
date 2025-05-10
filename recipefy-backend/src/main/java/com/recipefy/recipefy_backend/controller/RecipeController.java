package com.recipefy.recipefy_backend.controller;

import com.recipefy.recipefy_backend.dto.RecipeDto;
import com.recipefy.recipefy_backend.service.NutritionService;
import com.recipefy.recipefy_backend.service.RecipeService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "*")
public class RecipeController {

    private final RecipeService service;

    public RecipeController(RecipeService service, NutritionService nutritionService) {
        this.service = service;
        this.nutritionService = nutritionService;
    }

    @GetMapping
    public List<RecipeDto> getAllRecipes() {
        return service.getAllRecipes();
    }

    @PostMapping
    public RecipeDto addRecipe(@RequestBody RecipeDto dto) {
        return service.addRecipe(dto);
    }

    @GetMapping("/filter")
    public List<RecipeDto> getRecipesByCalories(
            @RequestParam int minCalories,
            @RequestParam int maxCalories
    ) {
        return service.getRecipesByCalories(minCalories, maxCalories);
    }
    private final NutritionService nutritionService;
    @PostMapping("/estimate-calories")
    public Map<String, Object> estimateCalories(@RequestBody Map<String, List<String>> request) {
        List<String> ingredients = request.get("ingredients");
        int calories = nutritionService.calculateCalories(ingredients);

        // Get failed ingredients from the service if available
        List<String> failedIngredients = new ArrayList<>();
        // You'll need to modify NutritionService to track these

        return Map.of(
                "calories", calories,
                "failedIngredients", failedIngredients
        );
    }
}

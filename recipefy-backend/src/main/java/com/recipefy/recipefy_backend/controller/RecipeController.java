package com.recipefy.recipefy_backend.controller;

import com.recipefy.recipefy_backend.dto.RecipeDto;
import com.recipefy.recipefy_backend.service.RecipeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "*")
public class RecipeController {

    private final RecipeService service;

    public RecipeController(RecipeService service) {
        this.service = service;
    }

    @GetMapping
    public List<RecipeDto> getAllRecipes() {
        return service.getAllRecipes();
    }

    @PostMapping
    public RecipeDto addRecipe(@RequestBody RecipeDto dto) {
        return service.addRecipe(dto);
    }

}

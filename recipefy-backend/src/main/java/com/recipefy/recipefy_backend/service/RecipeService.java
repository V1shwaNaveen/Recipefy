package com.recipefy.recipefy_backend.service;

import com.recipefy.recipefy_backend.dto.RecipeDto;
import com.recipefy.recipefy_backend.model.Recipe;
import com.recipefy.recipefy_backend.repository.RecipeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecipeService {

    private final RecipeRepository repo;

    public RecipeService(RecipeRepository repo) {
        this.repo = repo;
    }

    public List<RecipeDto> getAllRecipes() {
        List<Recipe> recipes = repo.findAll();
        return recipes.stream()
                .map(RecipeDto::new)
                .collect(Collectors.toList());
    }
}

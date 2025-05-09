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

    public RecipeDto addRecipe(RecipeDto dto) {
        Recipe recipe = new Recipe();
        recipe.setTitle(dto.getTitle());
        recipe.setDescription(dto.getDescription());
        recipe.setImageUrl(dto.getImageUrl());
        recipe.setRating(dto.getRating());
        recipe.setVoteCount(dto.getVoteCount());
        recipe.setCookTime(dto.getCookTime());
        recipe.setIngredients(dto.getIngredients());
        recipe.setSteps(dto.getSteps());

        Recipe saved = repo.save(recipe);
        return new RecipeDto(saved);
    }

}

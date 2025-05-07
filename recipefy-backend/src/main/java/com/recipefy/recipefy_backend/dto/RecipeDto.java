package com.recipefy.recipefy_backend.dto;

import com.recipefy.recipefy_backend.model.Recipe;

public class RecipeDto {

    private String title;
    private String description;
    private String imageUrl;

    public RecipeDto(Recipe recipe) {
        this.title = recipe.getTitle();
        this.description = recipe.getDescription();
        this.imageUrl = recipe.getImageUrl();
    }

    // Getters
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getImageUrl() { return imageUrl; }
}

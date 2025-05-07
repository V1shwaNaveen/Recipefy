package com.recipefy.recipefy_backend.dto;

import com.recipefy.recipefy_backend.model.Recipe;
import lombok.Getter;

@Getter
public class RecipeDto {

    // Getters
    private String title;
    private String description;
    private String imageUrl;

    public RecipeDto(Recipe recipe) {
        this.title = recipe.getTitle();
        this.description = recipe.getDescription();
        this.imageUrl = recipe.getImageUrl();
    }

}

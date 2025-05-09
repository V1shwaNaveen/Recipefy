package com.recipefy.recipefy_backend.dto;

import com.recipefy.recipefy_backend.model.Recipe;
import lombok.Setter;

import java.util.List;
@Setter
public class RecipeDto {

    private String title;
    private String description;
    private String imageUrl;
    private float rating;
    private int voteCount;
    private int cookTime;
    private List<String> ingredients;
    private List<String> steps;

    public RecipeDto() {} // Required for POST deserialization

    public RecipeDto(Recipe recipe) {
        this.title = recipe.getTitle();
        this.description = recipe.getDescription();
        this.imageUrl = recipe.getImageUrl();
        this.rating = recipe.getRating();
        this.cookTime = recipe.getCookTime();
        this.voteCount = recipe.getVoteCount();
        this.ingredients = recipe.getIngredients();
        this.steps = recipe.getSteps();
    }

    // Getters
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getImageUrl() { return imageUrl; }

    public int getVoteCount() {
        return voteCount;
    }
    public int getCookTime(){return cookTime;}

    public float getRating() {
        return rating;
    }

    public List<String> getIngredients() {
        return ingredients;
    }

    public List<String> getSteps() {
        return steps;
    }
}

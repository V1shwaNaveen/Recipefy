package com.recipefy.recipefy_backend.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;
    private String description;
    private String imageUrl;
    private float rating;
    private int voteCount;
    private int cookTime;
    private int calories;

    @ElementCollection
    private List<String> ingredients;

    @ElementCollection
    private List<String> steps;

    // Getters and Setters
    public int getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getImageUrl() { return imageUrl; }
    public float getRating() {return rating;}

    public int getCookTime() {
        return cookTime;
    }

    public int getVoteCount() {
        return voteCount;
    }

    public int getCalories() {
        return calories;
    }

    public List<String> getIngredients() { return ingredients; }
    public void setIngredients(List<String> ingredients) { this.ingredients = ingredients; }

    public List<String> getSteps() { return steps; }
    public void setSteps(List<String> steps) { this.steps = steps; }

    public void setId(int id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setDescription(String description) { this.description = description; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public void setCookTime(int cookTime) {
        this.cookTime = cookTime;
    }

    public void setVoteCount(int voteCount) {
        this.voteCount = voteCount;
    }

    public void setCalories(int calories) {
        this.calories = calories;
    }
}

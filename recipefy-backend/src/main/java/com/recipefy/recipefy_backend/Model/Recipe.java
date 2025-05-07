// Recipe.java
package com.recipefy.recipefy_backend.Model;

import jakarta.persistence.*;

@Entity
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;
    private String description;
    private String imageUrl;

    // Getters and Setters
}

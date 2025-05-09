package com.recipefy.recipefy_backend.model;

import jakarta.persistence.*;

@Entity
public class ShoppingListItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String category;
    private boolean purchased;
    private Long userId; // To associate items with users

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public boolean isPurchased() { return purchased; }
    public void setPurchased(boolean purchased) { this.purchased = purchased; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
}
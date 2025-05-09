// RecipeRepository.java
package com.recipefy.recipefy_backend.repository;

import com.recipefy.recipefy_backend.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Integer> {
    List<Recipe> findByCaloriesBetween(int min, int max);
}

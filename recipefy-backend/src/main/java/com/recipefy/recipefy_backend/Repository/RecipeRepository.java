// RecipeRepository.java
package com.recipefy.recipefy_backend.Repository;

import com.recipefy.recipefy_backend.Model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<Recipe, Integer> {
}

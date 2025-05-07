// RecipeController.java
package com.recipefy.recipefy_backend.Controller;


import com.recipefy.recipefy_backend.Model.Recipe;
import com.recipefy.recipefy_backend.Repository.RecipeRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "*")
public class RecipeController {

    private final RecipeRepository repo;

    public RecipeController(RecipeRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Recipe> getAllRecipes() {
        return repo.findAll();
    }
}

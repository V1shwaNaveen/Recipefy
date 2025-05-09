package com.recipefy.recipefy_backend.repository;

import com.recipefy.recipefy_backend.model.ShoppingListItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ShoppingListRepository extends JpaRepository<ShoppingListItem, Long> {
    List<ShoppingListItem> findByUserId(Long userId);
    List<ShoppingListItem> findByUserIdAndCategory(Long userId, String category);
}
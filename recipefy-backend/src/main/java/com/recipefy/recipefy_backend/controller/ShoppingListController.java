package com.recipefy.recipefy_backend.controller;

import com.recipefy.recipefy_backend.model.ShoppingListItem;
import com.recipefy.recipefy_backend.service.ShoppingListService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shopping-list")
@CrossOrigin(origins = "*")
public class ShoppingListController {

    private final ShoppingListService service;

    public ShoppingListController(ShoppingListService service) {
        this.service = service;
    }

    @GetMapping
    public List<ShoppingListItem> getShoppingList(@RequestParam Long userId) {
        return service.getShoppingList(userId);
    }

    @PostMapping
    public ShoppingListItem addItem(@RequestBody ShoppingListItem item) {
        return service.addItem(item);
    }

    @PostMapping("/bulk")
    public List<ShoppingListItem> addItems(@RequestBody List<ShoppingListItem> items) {
        return service.addItems(items);
    }

    @PutMapping("/{id}/toggle")
    public ShoppingListItem togglePurchased(@PathVariable Long id) {
        return service.togglePurchased(id);
    }

    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id) {
        service.deleteItem(id);
    }
}
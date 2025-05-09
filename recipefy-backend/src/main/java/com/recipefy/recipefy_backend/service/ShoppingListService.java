package com.recipefy.recipefy_backend.service;

import com.recipefy.recipefy_backend.model.ShoppingListItem;
import com.recipefy.recipefy_backend.repository.ShoppingListRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShoppingListService {

    private final ShoppingListRepository repository;

    public ShoppingListService(ShoppingListRepository repository) {
        this.repository = repository;
    }

    public List<ShoppingListItem> getShoppingList(Long userId) {
        return repository.findByUserId(userId);
    }

    public ShoppingListItem addItem(ShoppingListItem item) {
        return repository.save(item);
    }

    public List<ShoppingListItem> addItems(List<ShoppingListItem> items) {
        return repository.saveAll(items);
    }

    public ShoppingListItem togglePurchased(Long id) {
        ShoppingListItem item = repository.findById(id).orElseThrow();
        item.setPurchased(!item.isPurchased());
        return repository.save(item);
    }

    public void deleteItem(Long id) {
        repository.deleteById(id);
    }
}
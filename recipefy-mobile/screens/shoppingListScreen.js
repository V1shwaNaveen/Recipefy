import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  CheckBox,
  Button,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const API_URL = "http://192.168.1.4:8080/api/shopping-list";

export default function ShoppingListScreen() {
  const [items, setItems] = useState([]);
  const [userId] = useState(1); // In a real app, get from auth context

  useEffect(() => {
    fetchShoppingList();
  }, []);

  const fetchShoppingList = async () => {
    try {
      const response = await fetch(`${API_URL}?userId=${userId}`);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching shopping list:", error);
    }
  };

  const togglePurchased = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}/toggle`, {
        method: "PUT",
      });
      if (response.ok) {
        fetchShoppingList(); // Refresh the list
      }
    } catch (error) {
      console.error("Error toggling item:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchShoppingList(); // Refresh the list
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    const category = item.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => togglePurchased(item.id)}>
        <Ionicons
          name={item.purchased ? "checkbox-outline" : "square-outline"}
          size={24}
          color={item.purchased ? "#4CAF50" : "#666"}
        />
      </TouchableOpacity>
      <Text
        style={[styles.itemText, item.purchased && styles.purchasedItemText]}
      >
        {item.name}
      </Text>
      <TouchableOpacity onPress={() => deleteItem(item.id)}>
        <Ionicons name="trash-outline" size={20} color="#ff6b6b" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Shopping List</Text>

      {Object.keys(groupedItems).length === 0 ? (
        <Text style={styles.emptyText}>Your shopping list is empty</Text>
      ) : (
        Object.entries(groupedItems).map(([category, categoryItems]) => (
          <View key={category} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category}</Text>
            <FlatList
              data={categoryItems}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 50,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#444",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 5,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
  purchasedItemText: {
    textDecorationLine: "line-through",
    color: "#999",
  },
});

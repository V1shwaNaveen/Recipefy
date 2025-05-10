import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function AddRecipeScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [steps, setSteps] = useState([""]);
  const [calories, setCalories] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);

  const API_URL = "http://192.168.1.4:8080/api/recipes";
  const NUTRITION_API_URL =
    "http://192.168.1.4:8080/api/recipes/estimate-calories";

  const handleAddField = (type) => {
    if (type === "ingredient") {
      setIngredients([...ingredients, ""]);
    } else {
      setSteps([...steps, ""]);
    }
  };

  const handleChangeField = (type, index, value) => {
    const list = type === "ingredient" ? [...ingredients] : [...steps];
    list[index] = value;
    type === "ingredient" ? setIngredients(list) : setSteps(list);
  };

  // Calculate calories whenever ingredients change
  useEffect(() => {
    const calculateCalories = async () => {
      const nonEmptyIngredients = ingredients.filter(
        (ing) => ing.trim() !== ""
      );
      if (nonEmptyIngredients.length > 0) {
        setIsCalculating(true);
        try {
          const response = await fetch(NUTRITION_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ingredients: nonEmptyIngredients }),
          });
          const data = await response.json();
          setCalories(data.calories || 0);
        } catch (error) {
          console.error("Calorie calculation error:", error);
          setCalories(0);
        } finally {
          setIsCalculating(false);
        }
      } else {
        setCalories(0);
      }
    };

    // Add debounce to avoid too many API calls
    const timer = setTimeout(() => {
      calculateCalories();
    }, 500); // 0.5 second delay

    return () => clearTimeout(timer);
  }, [ingredients]);

  const handleSubmit = async () => {
    const recipe = {
      title,
      description,
      imageUrl,
      cookTime: parseInt(cookTime) || 0,
      ingredients: ingredients.filter((i) => i.trim() !== ""),
      steps: steps.filter((s) => s.trim() !== ""),
      calories, // Send the calculated calories
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipe),
      });

      if (res.ok) {
        alert(`Recipe added successfully! (${calories} calories)`);
        setTitle("");
        setDescription("");
        setImageUrl("");
        setCookTime("");
        setIngredients([""]);
        setSteps([""]);
        setCalories(0);
      } else {
        alert("Failed to add recipe");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholder="Recipe name"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { height: 80 }]}
        multiline
        placeholder="Brief description of the recipe"
      />

      <Text style={styles.label}>Image URL</Text>
      <TextInput
        value={imageUrl}
        onChangeText={setImageUrl}
        style={styles.input}
        placeholder="https://example.com/image.jpg"
      />

      <Text style={styles.label}>Cook Time (minutes)</Text>
      <TextInput
        value={cookTime}
        onChangeText={setCookTime}
        style={styles.input}
        keyboardType="numeric"
        placeholder="30"
      />

      <Text style={styles.label}>Ingredients</Text>
      {ingredients.map((ingredient, idx) => (
        <TextInput
          key={idx}
          value={ingredient}
          onChangeText={(text) => handleChangeField("ingredient", idx, text)}
          style={styles.input}
          placeholder={`e.g., 1 cup rice, 200g chicken`}
        />
      ))}
      <TouchableOpacity onPress={() => handleAddField("ingredient")}>
        <Text style={styles.addMore}>+ Add Ingredient</Text>
      </TouchableOpacity>

      {/* Calorie display */}
      <View style={styles.calorieContainer}>
        <Text style={styles.calorieLabel}>Estimated Calories:</Text>
        {isCalculating ? (
          <ActivityIndicator size="small" color="#4CAF50" />
        ) : (
          <Text style={styles.calorieValue}>{calories}</Text>
        )}
      </View>

      <Text style={styles.label}>Steps</Text>
      {steps.map((step, idx) => (
        <TextInput
          key={idx}
          value={step}
          onChangeText={(text) => handleChangeField("step", idx, text)}
          style={[styles.input, { height: 60 }]}
          placeholder={`Step ${idx + 1}`}
          multiline
        />
      ))}
      <TouchableOpacity onPress={() => handleAddField("step")}>
        <Text style={styles.addMore}>+ Add Step</Text>
      </TouchableOpacity>

      <View style={styles.submitButton}>
        <Button
          title="Add Recipe"
          onPress={handleSubmit}
          disabled={isCalculating}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  label: {
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 4,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fafafa",
    marginBottom: 8,
  },
  addMore: {
    color: "#007bff",
    marginTop: 8,
    marginBottom: 16,
  },
  submitButton: {
    marginTop: 24,
    marginBottom: 40,
  },
  calorieContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  calorieLabel: {
    fontWeight: "bold",
    marginRight: 8,
    fontSize: 16,
  },
  calorieValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
});

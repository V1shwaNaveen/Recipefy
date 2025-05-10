import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AddRecipeScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [steps, setSteps] = useState([""]);
  const [calories, setCalories] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [failedIngredients, setFailedIngredients] = useState([]);

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

  const handleRemoveField = (type, index) => {
    if (type === "ingredient") {
      const newIngredients = [...ingredients];
      newIngredients.splice(index, 1);
      setIngredients(newIngredients.length ? newIngredients : [""]);
    } else {
      const newSteps = [...steps];
      newSteps.splice(index, 1);
      setSteps(newSteps.length ? newSteps : [""]);
    }
  };

  const handleChangeField = (type, index, value) => {
    const list = type === "ingredient" ? [...ingredients] : [...steps];
    list[index] = value;
    type === "ingredient" ? setIngredients(list) : setSteps(list);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const nonEmptyIngredients = ingredients.filter(
        (ing) => ing.trim() !== ""
      );
      if (nonEmptyIngredients.length > 0) {
        calculateCalories(nonEmptyIngredients);
      } else {
        setCalories(0);
        setFailedIngredients([]);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [ingredients]);

  const calculateCalories = async (ingredientsList) => {
    setIsCalculating(true);
    setFailedIngredients([]);

    try {
      const response = await fetch(NUTRITION_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: ingredientsList }),
      });

      const data = await response.json();

      if (response.ok) {
        setCalories(data.calories || 0);
        setFailedIngredients(data.failedIngredients || []);
      } else {
        setCalories(0);
      }
    } catch (error) {
      console.error("Calorie calculation error:", error);
      setCalories(0);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleSubmit = async () => {
    const nonEmptyIngredients = ingredients.filter((i) => i.trim() !== "");
    const nonEmptySteps = steps.filter((s) => s.trim() !== "");

    if (!title.trim() || !nonEmptyIngredients.length || !nonEmptySteps.length) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    const recipe = {
      title: title.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim(),
      cookTime: parseInt(cookTime) || 0,
      ingredients: nonEmptyIngredients,
      steps: nonEmptySteps,
      calories,
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipe),
      });

      if (res.ok) {
        const successMsg =
          failedIngredients.length > 0
            ? `Recipe added! (${calories} calories)\nNote: Some ingredients couldn't be calculated`
            : `Recipe added successfully! (${calories} calories)`;

        Alert.alert("Success", successMsg);
        resetForm();
      } else {
        const errorData = await res.json();
        Alert.alert("Error", errorData.message || "Failed to add recipe");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setImageUrl("");
    setCookTime("");
    setIngredients([""]);
    setSteps([""]);
    setCalories(0);
    setFailedIngredients([]);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Text style={styles.label}>Title *</Text>
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
        style={[styles.input, styles.textArea]}
        multiline
        placeholder="Brief description of the recipe"
      />

      <Text style={styles.label}>Image URL</Text>
      <TextInput
        value={imageUrl}
        onChangeText={setImageUrl}
        style={styles.input}
        placeholder="https://example.com/image.jpg"
        keyboardType="url"
      />

      <Text style={styles.label}>Cook Time (minutes)</Text>
      <TextInput
        value={cookTime}
        onChangeText={setCookTime}
        style={styles.input}
        keyboardType="numeric"
        placeholder="30"
      />

      <Text style={styles.label}>Ingredients *</Text>
      {ingredients.map((ingredient, idx) => (
        <View key={idx} style={styles.inputRow}>
          <TextInput
            value={ingredient}
            onChangeText={(text) => handleChangeField("ingredient", idx, text)}
            style={[styles.input, styles.flexInput]}
            placeholder={`e.g., 1 cup rice, 200g chicken`}
          />
          {ingredients.length > 1 && (
            <TouchableOpacity
              onPress={() => handleRemoveField("ingredient", idx)}
              style={styles.removeButton}
            >
              <Ionicons name="trash-outline" size={20} color="#ff6b6b" />
            </TouchableOpacity>
          )}
        </View>
      ))}
      <TouchableOpacity
        onPress={() => handleAddField("ingredient")}
        style={styles.addButton}
      >
        <Ionicons name="add-circle-outline" size={20} color="#007bff" />
        <Text style={styles.addButtonText}>Add Ingredient</Text>
      </TouchableOpacity>

      <View style={styles.calorieContainer}>
        <Text style={styles.calorieLabel}>Estimated Calories:</Text>
        {isCalculating ? (
          <ActivityIndicator size="small" color="#4CAF50" />
        ) : (
          <Text style={styles.calorieValue}>{calories}</Text>
        )}
      </View>

      {failedIngredients.length > 0 && (
        <View style={styles.warningContainer}>
          <Text style={styles.warningText}>
            Couldn't calculate calories for:
          </Text>
          {failedIngredients.map((ing, index) => (
            <Text key={index} style={styles.failedIngredient}>
              • {ing}
            </Text>
          ))}
        </View>
      )}

      <Text style={styles.label}>Steps *</Text>
      {steps.map((step, idx) => (
        <View key={idx} style={styles.inputRow}>
          <TextInput
            value={step}
            onChangeText={(text) => handleChangeField("step", idx, text)}
            style={[styles.input, styles.stepInput]}
            placeholder={`Step ${idx + 1}`}
            multiline
          />
          {steps.length > 1 && (
            <TouchableOpacity
              onPress={() => handleRemoveField("step", idx)}
              style={styles.removeButton}
            >
              <Ionicons name="trash-outline" size={20} color="#ff6b6b" />
            </TouchableOpacity>
          )}
        </View>
      ))}
      <TouchableOpacity
        onPress={() => handleAddField("step")}
        style={styles.addButton}
      >
        <Ionicons name="add-circle-outline" size={20} color="#007bff" />
        <Text style={styles.addButtonText}>Add Step</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.submitButton, isCalculating && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={isCalculating}
      >
        <Text style={styles.submitButtonText}>Add Recipe</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  label: {
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  stepInput: {
    height: 80,
    textAlignVertical: "top",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  flexInput: {
    flex: 1,
    marginRight: 8,
  },
  removeButton: {
    padding: 8,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginBottom: 16,
  },
  addButtonText: {
    color: "#007bff",
    marginLeft: 8,
    fontSize: 16,
  },
  calorieContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
    padding: 12,
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
  warningContainer: {
    backgroundColor: "#FFF3E0",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  warningText: {
    color: "#E65100",
    fontWeight: "bold",
    marginBottom: 4,
  },
  failedIngredient: {
    color: "#E65100",
    marginLeft: 8,
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

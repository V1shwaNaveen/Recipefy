import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function AddRecipeScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [steps, setSteps] = useState([""]);

  const API_URL = "http://192.168.1.3:8080/api/recipes"; // Adjust to match backend

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

  const handleSubmit = async () => {
    const recipe = {
      title,
      description,
      imageUrl,
      cookTime: parseInt(cookTime),
      ingredients,
      steps,
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipe),
      });

      if (res.ok) {
        alert("Recipe added successfully!");
        setTitle("");
        setDescription("");
        setImageUrl("");
        setCookTime("");
        setIngredients([""]);
        setSteps([""]);
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
      <TextInput value={title} onChangeText={setTitle} style={styles.input} />

      <Text style={styles.label}>Description</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { height: 80 }]}
        multiline
      />

      <Text style={styles.label}>Image URL</Text>
      <TextInput
        value={imageUrl}
        onChangeText={setImageUrl}
        style={styles.input}
      />

      <Text style={styles.label}>Cook Time (minutes)</Text>
      <TextInput
        value={cookTime}
        onChangeText={setCookTime}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Ingredients</Text>
      {ingredients.map((ingredient, idx) => (
        <TextInput
          key={idx}
          value={ingredient}
          onChangeText={(text) => handleChangeField("ingredient", idx, text)}
          style={styles.input}
          placeholder={`Ingredient ${idx + 1}`}
        />
      ))}
      <TouchableOpacity onPress={() => handleAddField("ingredient")}>
        <Text style={styles.addMore}>+ Add Ingredient</Text>
      </TouchableOpacity>

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
        <Button title="Add Recipe" onPress={handleSubmit} />
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
  },
  addMore: {
    color: "#007bff",
    marginTop: 8,
    marginBottom: 16,
  },
  submitButton: {
    marginTop: 24,
  },
});

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const API_URL = "http://192.168.1.4:8080/api/recipes"; // replace with your IP

const HomeScreen = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderRecipe = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  if (loading)
    return <ActivityIndicator size="large" style={{ marginTop: 100 }} />;

  return (
    <FlatList
      data={recipes}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderRecipe}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    elevation: 4,
  },
  image: {
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
});

export default HomeScreen;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from "react-native";

const API_URL = "http://192.168.1.4:8080/api/recipes";

export default function HomeScreen() {
  const [recipes, setRecipes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setRecipes(data);
      setFiltered(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearch(text);
    const filteredData = recipes.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setFiltered(filteredData);
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
    <View style={{ flex: 1 }}>
      <TextInput
        style={styles.search}
        placeholder="Search recipes..."
        value={search}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderRecipe}
        contentContainerStyle={styles.container}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  search: {
    height: 45,
    margin: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
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

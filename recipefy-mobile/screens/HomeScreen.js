import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const API_URL = "http://192.168.1.5:8080/api/recipes";

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
      <Text style={styles.items}>{item.title}</Text>
    </View>
  );

  if (loading)
    return <ActivityIndicator size="large" style={{ marginTop: 100 }} />;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#888"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search recipes..."
          value={search}
          onChangeText={handleSearch}
          placeholderTextColor="#999"
        />
      </View>

      <Text style={styles.sectionTitle}>Latest Recipes</Text>

      <View style={styles.horizontalListWrapper}>
        <FlatList
          data={filtered}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderRecipe}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 12,
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 12,
    borderRadius: 12,
    elevation: 4, // Android
    shadowColor: "#000", // iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 45,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  horizontalListWrapper: {
    height: 220, // Limit the height of the card area
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 19,
    marginBottom: 10,
    marginTop: 4,
  },
  horizontalList: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 0,
    marginRight: 12,
    marginTop: 10,
    width: 250,
    elevation: 4,
  },

  image: {
    height: 130,
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
  items: {
    fontSize: 18,
    paddingLeft: 3,
    fontWeight: "450",
    marginBottom: 6,
  },
});

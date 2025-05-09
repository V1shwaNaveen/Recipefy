import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

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

const API_URL = "http://192.168.1.3:8080/api/recipes";

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
  const navigation = useNavigation();
  const renderRecipe = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("RecipeDetail", { recipe: item })}
    >
      <View style={styles.card}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <Text style={styles.items}>{item.title}</Text>

        <View style={styles.ratingRow}>
          <Ionicons
            name="star"
            size={16}
            color="#f5a623"
            style={{ marginRight: 4 }}
          />
          <Text style={styles.ratingText}>
            {item.rating.toFixed(1)} ({item.voteCount})
          </Text>

          <Ionicons
            name="time-outline"
            size={16}
            color="#666"
            style={{ marginLeft: 12, marginRight: 4 }}
          />
          <Text style={styles.ratingText}>{item.cookTime} min</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading)
    return <ActivityIndicator size="large" style={{ marginTop: 100 }} />;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
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
      <Text style={styles.sectionTitle}>Highest Rated</Text>
      <FlatList
        data={[...filtered].sort((a, b) => b.rating - a.rating)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderRecipe}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />
      <Text style={styles.sectionTitle}>All Recipes</Text>
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
    </ScrollView>
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
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 4,
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    color: "#555",
  },
});

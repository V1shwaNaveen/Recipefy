import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function RecipeDetailScreen({ route }) {
  const { recipe } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Recipe Image */}
      <Image source={{ uri: recipe.imageUrl }} style={styles.image} />

      {/* Recipe Title and Basic Info */}
      <View style={styles.header}>
        <Text style={styles.title}>{recipe.title}</Text>

        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Ionicons name="star" size={20} color="#f5a623" />
            <Text style={styles.metaText}>
              {recipe.rating.toFixed(1)} ({recipe.voteCount} ratings)
            </Text>
          </View>

          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={20} color="#666" />
            <Text style={styles.metaText}>{recipe.cookTime} mins</Text>
          </View>

          <View style={styles.metaItem}>
            <Ionicons name="flame-outline" size={20} color="#ff6b6b" />
            <Text style={styles.metaText}>{recipe.calories} calories</Text>
          </View>
        </View>
      </View>

      {/* Description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{recipe.description}</Text>
      </View>

      {/* Ingredients */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <FlatList
          data={recipe.ingredients}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>{item}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
        />
      </View>

      {/* Steps */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Steps</Text>
        <FlatList
          data={recipe.steps}
          renderItem={({ item, index }) => (
            <View style={styles.stepItem}>
              <Text style={styles.stepNumber}>{index + 1}.</Text>
              <Text style={styles.stepText}>{item}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 250,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    minWidth: "30%",
  },
  metaText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#666",
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "flex-start",
  },
  bullet: {
    marginRight: 10,
    fontSize: 16,
  },
  listText: {
    flex: 1,
    fontSize: 16,
    color: "#444",
  },
  stepItem: {
    flexDirection: "row",
    marginBottom: 15,
  },
  stepNumber: {
    fontWeight: "bold",
    marginRight: 10,
    fontSize: 16,
    color: "#333",
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    color: "#444",
    lineHeight: 22,
  },
});

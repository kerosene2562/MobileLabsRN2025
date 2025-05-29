import React, { useEffect, useState, useContext } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";
import { AuthManager } from "../contexts/AuthManager";
import api from "../services/firebase";
import Card from "../components/Card";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const FeedScreen = () => {
  const { logout } = useContext(AuthManager);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const loadArticles = async () => {
        try {
          const res = await api.get("/posts.json");
          const loaded = res.data
            ? Object.keys(res.data).map((key) => ({ id: key, ...res.data[key] }))
            : [];
          setArticles(loaded.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } catch (err) {
          console.error("Error loading posts", err);
        } finally {
          setLoading(false);
        }
      };
      loadArticles();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#009688" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Card heading={item.title} content={item.body} />}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("NewArticle")}
        activeOpacity={0.7}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 32,
    backgroundColor: "#4A90E2",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  fabText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 34,
  },
});
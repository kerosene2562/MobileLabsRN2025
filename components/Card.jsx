import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Card = ({ heading, content }) => (
  <View style={styles.card}>
    <Text style={styles.heading}>{heading}</Text>
    <Text style={styles.maining}>{content}</Text>
    <Text style={styles.date}>Дата: {new Date().toLocaleDateString()}</Text>
  </View>
);

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginVertical: 10,
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
    color: "#2C3E50",
  },
  maining: {
    fontSize: 16,
    color: "#4F6272",
    lineHeight: 22,
  },
  date: {
    fontSize: 13,
    color: "#A3B1C6",
    marginTop: 14,
    fontStyle: "italic"
  },
});
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProfileCard = ({ user }) => {
  if (!user) {
    return <Text style={styles.message}>Інформація не знайдена</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ім’я:</Text>
      <Text style={styles.value}>{user.name || "Невідомо"}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{user.email}</Text>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 28,
    marginBottom: 28,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#4F6272",
    marginTop: 12,
  },
  value: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2C3E50",
    marginTop: 4,
  },
  message: {
    fontSize: 16,
    color: "#A3B1C6",
    alignSelf: "center",
    marginVertical: 28,
    fontStyle: "italic",
  },
});
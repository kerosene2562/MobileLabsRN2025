import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const LogoutButton = ({ onExit }) => (
  <TouchableOpacity style={styles.button} onPress={onExit}>
    <Text style={styles.text}>Вийти</Text>
  </TouchableOpacity>
);

export default LogoutButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#E74C3C",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
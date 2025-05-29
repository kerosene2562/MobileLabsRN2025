import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/user/userSlice";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Помилка", "Введіть email та пароль");
      return;
    }
    try {
      await dispatch(loginUser(email, password));
    } catch (error) {
      Alert.alert("Помилка входу", "Невірні дані або інша помилка");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вхід</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Увійти</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Реєстрація")}>
        <Text style={styles.link}>Не маєш акаунту? Зареєструйся</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#F5F7FA",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 28,
    textAlign: "center",
    color: "#2C3E50",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D0D7DE",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 18,
    fontSize: 16,
    color: "#2C3E50",
    backgroundColor: "#FFFFFF",
  },
  button: {
    backgroundColor: "#4A90E2",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  link: {
    textAlign: "center",
    color: "#2D8BEA",
    marginTop: 10,
    fontSize: 15,
    fontWeight: "500",
  },
});

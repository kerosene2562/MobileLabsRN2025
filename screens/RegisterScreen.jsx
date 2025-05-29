import React, { useState, useContext } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { AuthManager } from "../contexts/AuthManager";

const RegisterScreen = () => {
  const { register } = useContext(AuthManager);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSignup = () => {
    if (!name || !email || !password || !confirm) {
      Alert.alert("Помилка", "Заповніть усі поля");
      return;
    }
    if (password !== confirm) {
      Alert.alert("Помилка", "Паролі не співпадають");
      return;
    }
    register(email, password, name);
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Ім’я" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Пароль" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput placeholder="Підтвердження паролю" style={styles.input} value={confirm} onChangeText={setConfirm} secureTextEntry />
      <Button title="Зареєструватись" onPress={handleSignup} />
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 28, backgroundColor: "#F5F7FA" },
  input: {
    borderWidth: 1,
    borderColor: "#D0D7DE",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 18,
    fontSize: 16,
    color: "#2C3E50",
  },
});

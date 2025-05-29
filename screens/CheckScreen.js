import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { addOrder } from "../features/orders/ordersSlice";
import { useNavigation } from "@react-navigation/native";

const CheckScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = () => {
    if (!name.trim() || !validateEmail(email)) {
      Alert.alert("Помилка", "Заповніть ім’я та коректний email");
      return;
    }

    if (cartItems.length === 0) {
      Alert.alert("Кошик порожній");
      return;
    }

    dispatch(addOrder({ name, email, items: cartItems }));
    dispatch(clearCart());

    Alert.alert("Успіх", "Замовлення оформлено!", [
  {
    text: "OK",
    onPress: () => {
      navigation.navigate("Каталог", { screen: "Каталог" });
    },
  },
]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Оформлення замовлення</Text>
      <TextInput
        placeholder="Ваше ім’я"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Підтвердити</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
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
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});

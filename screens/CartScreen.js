import React from "react";
import { View, FlatList, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { changeQuantity, removeFromCart } from "../features/cart/cartSlice";
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleQuantityChange = (id, qty) => {
    const quantity = parseInt(qty);
    if (!quantity || quantity <= 0) {
      Alert.alert("Помилка", "Кількість має бути числом більше 0");
      return;
    }
    dispatch(changeQuantity({ id, quantity }));
  };

  return (
    <View style={styles.container}>
      {items.length === 0 ? (
        <Text style={styles.empty}>Кошик порожній</Text>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View style={styles.info}>
                  <Text style={styles.name}>{item.title}</Text>
                  <Text>{item.price} грн</Text>
                </View>
                <TextInput
                  style={styles.input}
                  value={String(item.quantity)}
                  keyboardType="numeric"
                  onChangeText={(text) => handleQuantityChange(item.id, text)}
                />
                <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))}>
                  <Text style={styles.remove}>Видалити</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <View style={styles.footer}>
            <Text style={styles.total}>Всього: {total} грн</Text>
            <TouchableOpacity
              style={styles.checkout}
              onPress={() => navigation.navigate("Checkout")}
            >
              <Text style={styles.checkoutText}>Оформити замовлення</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F7FA",
  },
  empty: {
    textAlign: "center",
    marginTop: 100,
    fontSize: 18,
    color: "#A3B1C6", // м'який сірий
    fontStyle: "italic",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C3E50",
  },
  input: {
    width: 52,
    height: 42,
    borderColor: "#D0D7DE",
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 12,
    textAlign: "center",
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    color: "#2C3E50",
  },
  remove: {
    color: "#E74C3C", // чистий і неяскравий червоний
    fontWeight: "600",
  },
  footer: {
    marginTop: 24,
  },
  total: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 14,
    color: "#2C3E50",
  },
  checkout: {
    backgroundColor: "#4A90E2",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  checkoutText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});


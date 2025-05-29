import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const OrdersScreen = () => {
  const history = useSelector((state) => state.orders.history);

  const renderItem = ({ item }) => {
    const total = item.items.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2);
    return (
      <View style={styles.item}>
        <Text>Ім’я: {item.name}</Text>
        <Text>Email: {item.email}</Text>
        <Text>Дата: {new Date(item.date).toLocaleDateString()}</Text>
        <Text>Кількість товарів: {item.items.length}</Text>
        <Text>Сума: {total} грн</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Історія замовлень</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Замовлень ще немає</Text>}
      />
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F5F7FA",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 24,
    color: "#2C3E50",
  },
  item: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  empty: {
    textAlign: "center",
    marginTop: 48,
    color: "#A3B1C6",
    fontSize: 16,
    fontStyle: "italic",
  },
});

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addProduct, deleteProduct } from "../features/products/productsSlice";

const AdminScreen = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUri, setImageUri] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());

    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Дозвіл потрібен", "Для вибору зображення потрібно надати доступ до галереї");
        }
      }
    })();
  }, [dispatch]);

  const saveImageLocally = async (uri) => {
    try {
      const filename = uri.split("/").pop();
      const newPath = FileSystem.documentDirectory + filename;

      await FileSystem.copyAsync({
        from: uri,
        to: newPath,
      });

      return newPath;
    } catch (error) {
      console.log("Помилка копіювання файлу:", error);
      return uri;
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      const { status: newStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (newStatus !== "granted") {
        Alert.alert("Дозвіл потрібен", "Неможливо отримати доступ до галереї");
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const localUri = await saveImageLocally(result.assets[0].uri);
      setImageUri(localUri);
    }
  };

  const handleAddProduct = () => {
    if (!title || !description || !price || !imageUri) {
      Alert.alert("Помилка", "Заповніть усі поля");
      return;
    }

    const newProduct = {
      title,
      description,
      price: parseFloat(price),
      image: imageUri,
    };
    console.log("Новий товар:", newProduct);
    dispatch(addProduct(newProduct));
    setTitle("");
    setDescription("");
    setPrice("");
    setImageUri("");
  };

  const handleDelete = (id) => {
    Alert.alert("Підтвердження", "Видалити цей товар?", [
      { text: "Скасувати", style: "cancel" },
      { text: "Видалити", onPress: () => dispatch(deleteProduct(id)) },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text>{item.price} грн</Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Text style={styles.deleteBtn}>Видалити</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Додати новий товар</Text>
      <TextInput
        style={styles.input}
        placeholder="Назва"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Опис"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Ціна"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <TouchableOpacity onPress={pickImage} style={styles.pickImageBtn}>
        <Text style={styles.pickImageText}>
          {imageUri ? "Змінити зображення" : "Вибрати зображення"}
        </Text>
      </TouchableOpacity>
      {imageUri ? <Image source={{ uri: imageUri }} style={styles.preview} /> : null}
      <TouchableOpacity onPress={handleAddProduct} style={styles.addBtn}>
        <Text style={styles.addBtnText}>Додати товар</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Список товарів</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
};

export default AdminScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F5F7FA",
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 24,
    marginBottom: 12,
    color: "#2C3E50",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D0D7DE",
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 16,
    color: "#2C3E50",
  },
  pickImageBtn: {
    backgroundColor: "#E0E7EF",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 14,
  },
  pickImageText: {
    color: "#34495E",
    fontWeight: "500",
  },
  preview: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 16,
  },
  addBtn: {
    backgroundColor: "#4A90E2",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 28,
  },
  addBtnText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
    padding: 14,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  productImage: {
    width: 64,
    height: 64,
    borderRadius: 10,
    marginRight: 14,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C3E50",
  },
  deleteBtn: {
    color: "#E74C3C",
    fontWeight: "bold",
  },
});


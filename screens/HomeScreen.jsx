import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { auth } from "../firebase/config";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const db = getFirestore();

function HomeScreen({ navigation }) {
  const user = auth.currentUser;

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");

  const fetchUserData = async () => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setName(userData.name || "");
        setAge(userData.age || "");
        setCity(userData.city || "");
      } else {
        Alert.alert("Помилка", "Дані не знайдено!");
      }
    }
  };

  const updateUserData = async () => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      try {
        await setDoc(
          userRef,
          {
            name,
            age,
            city,
          },
          { merge: true }
        );
        Alert.alert("Успіх", "Дані оновлено!");
      } catch (error) {
        Alert.alert("Помилка", error.message);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Мій Профіль</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Ім'я:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Ваше ім'я"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Вік:</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          placeholder="Ваш вік"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Місто:</Text>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
          placeholder="Ваше місто"
        />
      </View>

      <TouchableOpacity
        style={[styles.button, styles.saveButton]}
        onPress={updateUserData}
      >
        <Text style={styles.buttonText}>Зберегти зміни</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={() => navigation.replace("Logout")}
      >
        <Text style={styles.buttonText}>Вийти</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#E8F0FE",
  },
  title: {
    marginTop: 50,
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 30,
    textAlign: "center",
    color: "#1E3A8A",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: "#374151",
  },
  input: {
    borderWidth: 1,
    borderColor: "#A5B4FC",
    padding: 12,
    fontSize: 16,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  saveButton: {
    backgroundColor: "#3B82F6",
  },
  logoutButton: {
    backgroundColor: "#EF4444",
  },
});


export default HomeScreen;

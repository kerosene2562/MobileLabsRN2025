import React, { useState, useContext } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { AuthManager } from "../contexts/AuthManager";
import api from "../services/firebase";

const PostScreen = ({ navigation }) => {
  const { userId } = useContext(AuthManager);
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  const handleCreate = async () => {
    if (!heading || !content) {
      Alert.alert("Увага", "Заповніть усі поля");
      return;
    }
    setSaving(true);
    try {
      await api.post("/posts.json", {
        title: heading,
        body: content,
        userId,
        createdAt: new Date().toISOString(),
      });
      Alert.alert("Успіх", "Публікація додана");
      navigation.goBack();
    } catch (err) {
      Alert.alert("Помилка", "Не вдалося створити запис");
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Заголовок"
        style={styles.input}
        value={heading}
        onChangeText={setHeading}
      />
      <TextInput
        placeholder="Контент"
        style={[styles.input, { height: 100 }]}
        value={content}
        onChangeText={setContent}
        multiline
      />
      <Button title={saving ? "Збереження..." : "Створити"} onPress={handleCreate} disabled={saving} />
    </View>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#F5F7FA" },
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
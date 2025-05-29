import React, { useEffect, useState, useContext } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { AuthManager } from "../contexts/AuthManager";
import api from "../services/firebase";
import ProfileCard from "../components/ProfileCard";
import LogoutButton from "../components/LogoutButton";

const UserProfileScreen = () => {
  const { logout, userId } = useContext(AuthManager);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/users/${userId}.json`);
        setUser(res.data);
      } catch (err) {
        console.error("User fetch error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#009688" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ваш профіль</Text>
      <ProfileCard user={user} />
      <LogoutButton onExit={logout} />
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#f0f4f8" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
    alignSelf: "center",
  },
});
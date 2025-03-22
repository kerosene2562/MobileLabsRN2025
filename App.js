import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeProviderComponent, useTheme } from './src/components/ThemeContext'; 

import * as StoreScreen from "./src/screens/StoreScreen";
import CommunityScreen from "./src/screens/CommunityScreen";
import ChatScreen from "./src/screens/ChatScreen";
import SafetyScreen from "./src/screens/SafetyScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

const Tab = createBottomTabNavigator();

function AppContent() {
  const { theme } = useTheme(); // ✅ useTheme should be used inside the ThemeProviderComponent

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: theme.background }, // Колір фону панелі
          tabBarActiveTintColor: theme.text, // Колір активної іконки
          tabBarInactiveTintColor: "#888", // Колір неактивної іконки
        }}
      >
        <Tab.Screen
          name="store"
          component={StoreScreen.Store}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="pricetag-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Community"
          component={CommunityScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="people-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbubbles-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Safety"
          component={SafetyScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="shield-half-sharp" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="close-circle-outline" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProviderComponent>
      <AppContent />
    </ThemeProviderComponent>
  );
}

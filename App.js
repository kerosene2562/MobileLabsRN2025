import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import * as StoreScreen from "./src/screens/StoreScreen";
import CommunityScreen from "./src/screens/CommunityScreen";
import ChatScreen from "./src/screens/ChatScreen";
import SafetyScreen from "./src/screens/SafetyScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen
                name="store"
                component={StoreScreen.Store}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="pricetag-outline" size={size} color={color} />
                   ),
                }}
             />
            <Tab.Screen
                name="Community"
                component={CommunityScreen}
                options ={{
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="people-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Chat"
                component={ChatScreen}
                options ={{
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="chatbubbles-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Safety"
                component={SafetyScreen}
                options ={{
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="shield-half-sharp" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options ={{
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="close-circle-outline" size={size} color={color} />
                    ),
                }}
            />
            </Tab.Navigator>
    </NavigationContainer>
  );
}
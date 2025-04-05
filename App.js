import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ClickerScreen from './src/screens/ClickerScreen';
import ProgressScreen from './src/screens/ProgressScreen';
import { AchievementsProvider } from './src/context/AchievementsContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <AchievementsProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen
            name="Clicker"
            component={ClickerScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="finger-print" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Progress"
            component={ProgressScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="bar-chart" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
        </NavigationContainer>
      </AchievementsProvider>
    </GestureHandlerRootView>
  );
}
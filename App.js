import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import TextEditorScreen from './screens/TextEditorScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Finder" component={HomeScreen} options={{ title: '📁 Finder' }} />
        <Stack.Screen name="TextEditor" component={TextEditorScreen} options={{ title: '📝 Text Editor' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

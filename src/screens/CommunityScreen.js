import React from 'react';
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function SettingsScreen(){
    return(
        <View>
            <Text>Settings</Text>
            <StatusBar style="auto" />
        </View>
    );
}

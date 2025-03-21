import React from 'react';
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function SafetyScreen(){
    return(
        <View>
            <Text>SafetyScreen</Text>
            <StatusBar style="auto" />
        </View>
    );
}
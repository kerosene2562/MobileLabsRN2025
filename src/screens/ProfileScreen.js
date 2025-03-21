import React from 'react';
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function ProfileScreen(){
    return(
        <View>
            <Text>Profile</Text>
            <StatusBar style="auto" />
        </View>
    );
}
import React from 'react';
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function ChatScreen(){
    return(
        <View>
            <Text>Chat</Text>
            <StatusBar style="auto" />
        </View>
    );
}
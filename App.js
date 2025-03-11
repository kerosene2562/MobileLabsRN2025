import { Pressable, TextInput, Image, ActivityIndicator, StyleSheet, Text, View , ImageBackground, TouchableOpacity, ScrollView, RefreshControl, Switch, Modal, Button, } from 'react-native';
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import GalleryScreen from "./src/screens/GalleryScreen";

    const Tab = createMaterialTopTabNavigator();

    export default function App()
    {
        return (
            <View style = {{ flex: 1 }}>
                <View style = {styles.header}>
                    <Image source = {require('./src/assets/Logo.png')} style = {styles.image} />
                    <Text style = {styles.text}>FirstMobileApp</Text>
                </View>
                <NavigationContainer>
                    <Tab.Navigator
                        screenOptions={({ route }) => ({
                           tabBarIcon: ({ focused, color, size }) => {
                               let iconSource;
                               if (route.name === 'Головна') {
                                   iconSource = require('./src/assets/home.png');
                               } else if (route.name === 'Фотогалерея') {
                                   iconSource = require('./src/assets/gallery.png');
                               } else if (route.name === 'Профіль') {
                                   iconSource = require('./src/assets/profile.png');
                               }
                               return <Image source={iconSource} style={{ width: 25, height: 25 }} />;
                           },
                   })}>
                        <Tab.Screen name = "Головна" component = {HomeScreen} />
                        <Tab.Screen name = "Фотогалерея" component = {GalleryScreen} />
                        <Tab.Screen name = "Профіль" component = {ProfileScreen} />
                    </Tab.Navigator>
                </NavigationContainer>
                <Text style = {styles.footer}>
                    Романець Олександр Андрійович, ІПЗк-24-1
                </Text>
            </View>
        );
    }

const styles = StyleSheet.create({

    modalContainer: {
        flex: 1,
        justifyContent: 'center'
    },

    regButton: {
        backgroundColor: 'lightblue',
        borderRadius: 10,
    },

    buttonPressed: {
        backgroundColor: 'red',
    },

    regText: {
        fontSize: 15,
    },

    regInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginBottom: 20,
    },

    newsMainText: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    newsTextView: {
        flex: 1,
        flexDirection: 'column',
    },

    newsDateText: {
        fontSize: 12,
        color: 'gray',

    },

    newsShortText: {
        fontSize: 15,

    },

    news: {
        flex: 1,
        flexDirection: 'row',
        height: 100,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        justifyContent: 'space-between',
    },

    newsImg: {
        flex: 1,
        height: '99%',
        resizeMode: 'contain',
    },

    footer: {
        color: 'black',
        fontSize: 15,
        textAlign: 'center',
    },

    header: {
        flexDirection: 'row',
        marginTop: 20,
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
    },

    image: {
        flex: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain',
    },

    view: {
        flex: 1,
    },

    container: {
        flexGrow: 0.1,
        padding: 20,
    },

    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    overlay: {
        backgroundColor: 'red',
        padding: 20,
        borderRadius: 10,
    },

    text: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 10,
    },

    button: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },

    buttonText: {
        color: 'white',
        fontSize: 10,
    },
})
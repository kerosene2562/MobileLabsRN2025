import { Pressable, TextInput, Image, ActivityIndicator, StyleSheet, Text, View , ImageBackground, TouchableOpacity, ScrollView, RefreshControl, Switch, Modal, Button, } from 'react-native';
import React, {useState} from 'react';

function NewsBuilder()
    {
        return (
            <View style = {styles.news}>
                <Image source = {require('../assets/news.png')} style = {styles.newsImg} />
                <View style = {styles.newsTextView}>
                    <Text style = {styles.newsMainText}>Заголовок новини</Text>
                    <Text style = {styles.newsDateText}>Дата новини</Text>
                    <Text style = {styles.newsShortText}>Короткий текст новини</Text>
                </View>
            </View>
        );
    }

    function HomeScreen()
    {
        return (
            <View style = {{ flex: 1 }}>
                <Text style = {styles.text}>Новини</Text>
                <View style={styles.view}>
                    <ScrollView style = {styles.view}>
                        <NewsBuilder />
                        <NewsBuilder />
                        <NewsBuilder />
                        <NewsBuilder />
                        <NewsBuilder />
                        <NewsBuilder />
                        <NewsBuilder />
                        <NewsBuilder />
                        <NewsBuilder />
                        <NewsBuilder />
                        <NewsBuilder />
                        <NewsBuilder />
                        <NewsBuilder />
                        <NewsBuilder />
                        <NewsBuilder />
                    </ScrollView>
                </View>
            </View>
        );
    }
    export default HomeScreen;


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
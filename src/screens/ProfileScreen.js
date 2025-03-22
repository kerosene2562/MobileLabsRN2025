import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../components/ThemeContext';

const Container = styled.View`
    flex: 1;
    background-color: ${(props) => props.theme.background};
    align-items: center;
    justify-content: center;
`;

const StyledText = styled.Text`
    color: ${(props) => props.theme.text};
    font-size: 20px;
`;

const ProfileImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin-bottom: 10px;
`;

const NameText = styled.Text`
  color: ${(props) => props.theme.text};
  font-size: 18px;
  font-weight: bold;
`;

const GroupText = styled.Text`
  color: gray;
  font-size: 14px;
  margin-bottom: 20px;
`;

const Button = styled.TouchableOpacity`
  background-color: #1d1f2b;
  padding: 15px;
  margin: 5px;
  width: 90%;
  border-radius: 10px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  text-align: center;
`;

export default function ProfileScreen() {
  const { toggleTheme } = useTheme();

  return (
    <Container>
      <StatusBar style="light" />
      <ProfileImage source={require('../assets/doom2016.jpg')} />
      <NameText>Romanets Oleksandr</NameText>
      <GroupText>IPZk-24-1</GroupText>
      <Button onPress={toggleTheme}> 
        <ButtonText>Change Theme</ButtonText>
      </Button>
      <Button>
        <ButtonText>Logout</ButtonText>
      </Button>
    </Container>
  );
}

import React, { useState, useRef } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components';

import Ionicons from 'react-native-vector-icons/Ionicons';

const StyledMainView = styled.View`
    background-color:rgb(211, 211, 211);
    flex: 1;
`;

const StyledHeader = styled.View`
    background-color: rgb(184, 184, 184);
    height: 100px;
`;

const StyledViewBlock = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-left: 20px;
    margin-top: 12%;
    margin-bottom: auto;
`;

const StyledMainText = styled.Text`
    font-weight: 500;
    font-size: 30px;
    margin-left: 10px;
`;

const IconWrapper = styled.View`
  width: 40px;  
  height: 40px;
  border-radius: 30px; 
  background-color:  rgb(8, 1, 71); 
  overflow: hidden;
`;

const StyledInput = styled.TextInput`
    borderRadius: 10px;
    margin-left: 15px;
    width: ${(props) => (props.focused ? '60%' : '50%')};
    border: ${(props) => (props.focused ? '1px' : 'none')};
    padding-left: 10px;
    height: 40px;
    transition: width 0.3s ease;
`;

export function Store(){
    const [focused, setFocused] = useState(false);
    const [showSearchIcon, setShowSearchIcon] = useState(true);
    const inputRef = useRef(null);

    const handleFocus = () => {
        setFocused(true);
        setShowSearchIcon(false);
        inputRef.current.focus();
    }

    const handleBlur = () => {
        setFocused(false);
        setShowSearchIcon(true);
    }

    return(
        <StyledMainView>
            <StyledHeader>
                <StyledViewBlock>
                    <IconWrapper>
                        <Ionicons name="logo-steam" size={40} color={'white'} style={{ left: -8 }} />
                    </IconWrapper>
                    <StyledMainText>Store</StyledMainText>
                    <StyledInput ref={inputRef} focused={focused} onFocus={handleFocus} onBlur={handleBlur}/>
                    { showSearchIcon && <Ionicons name="search-outline" size={40} color={'black'} onPress={handleFocus} /> }
                </StyledViewBlock>
            </StyledHeader>
            <StatusBar style="auto" />
        </StyledMainView>
    );
}
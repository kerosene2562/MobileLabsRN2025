import React, { useState, useRef } from 'react';
import { FlatList, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { useTheme } from '../components/ThemeContext';

const Container = styled.View`
    flex: 1;
    background-color: ${(props) => props.theme.background};
`;

const Header = styled.View`
    background-color: ${(props) => props.theme.header};
    height: 100px;
    flex-direction: row;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 35px;
    justify-content: space-between;
`;

const HeaderText = styled.Text`
    color: ${(props) => props.theme.text};
    font-size: 30px;
    font-weight: 500;
`;

const IconWrapper = styled.View`
    width: 40px;
    height: 40px;
    border-radius: 30px;
    background-color: rgb(8, 1, 71);
    overflow: hidden;
`;

const StyledInput = styled(TextInput)`
    border-radius: 10px;
    width: ${(props) => (props.focused ? '60%' : '50%')};
    height: 40px;
    padding-left: 10px;
    color: ${(props) => props.theme.text};
    border: ${(props) => (props.focused ? '1px' : 'none')};
`;

const TabContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 20px;
    border-bottom-width: 1px;
    border-bottom-color: #333;
`;

const TabButton = styled.TouchableOpacity`
    padding: 10px;
    border-bottom-width: ${(props) => (props.active ? '2px' : '0')};
    border-bottom-color: ${(props) => (props.active ? '#1E90FF' : 'transparent')};
`;

const TabText = styled.Text`
    font-size: 18px;
    color: ${(props) => (props.active ? '#1E90FF' : props.theme.text)};
`;

const ChatItem = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    padding: 16px;
    border-bottom-width: 1px;
    border-bottom-color: #333;
`;

const Avatar = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin-right: 12px;
`;

const ChatInfo = styled.View`
    flex: 1;
`;

const ChatName = styled.Text`
    color: ${(props) => props.theme.text};
    font-size: 16px;
    font-weight: bold;
`;

const ChatMessage = styled.Text`
    color: ${(props) => props.theme.text};
    font-size: 14px;
`;

const ChatDate = styled.Text`
    color: ${(props) => props.theme.text};
    font-size: 12px;
`;

const UnreadBadge = styled.View`
    background-color: #1E90FF;
    border-radius: 12px;
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
`;

const UnreadText = styled.Text`
    color: white;
    font-size: 14px;
    font-weight: bold;
`;

const chats = [
    { id: '1', name: 'Mark Dyson', message: "I'm already starting to play", date: '14 Jun', avatar: require('../assets/halflife.jpg'), unread: 1 },
    { id: '2', name: 'Mark Dyson', message: "You: Ok", date: '14 Jun', avatar: require('../assets/halflife.jpg'), unread: 0 },
    { id: '3', name: 'Mark Dyson', message: "You: Ok", date: '14 Jun', avatar: require('../assets/halflife.jpg'), unread: 0 },
    { id: '4', name: 'Mark Dyson', message: "You: Ok", date: '14 Jun', avatar: require('../assets/halflife.jpg'), unread: 0 },
    { id: '5', name: 'Mark Dyson', message: "You: Ok", date: '14 Jun', avatar: require('../assets/halflife.jpg'), unread: 0 },
];

const friends = [
    { id: '1', name: 'John Doe', avatar: require('../assets/halflife.jpg') },
    { id: '2', name: 'Jane Smith', avatar: require('../assets/halflife.jpg') },
];

export default function ChatScreen() {
    const { theme } = useTheme();
    const [focused, setFocused] = useState(false);
    const [showSearchIcon, setShowSearchIcon] = useState(true);
    const [activeTab, setActiveTab] = useState('chats');
    const inputRef = useRef(null);

    const handleFocus = () => {
        setFocused(true);
        setShowSearchIcon(false);
        inputRef.current.focus();
    };

    const handleBlur = () => {
        setFocused(false);
        setShowSearchIcon(true);
    };

    return (
        <Container theme={theme}>
            <StatusBar barStyle={theme.statusBar} />
            <Header theme={theme}>
                <IconWrapper>
                    <Ionicons name="logo-steam" size={40} color={'white'} style={{ left: -8 }} />
                </IconWrapper>
                <HeaderText theme={theme}>Chat</HeaderText>
                <StyledInput
                    ref={inputRef}
                    focused={focused}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                {showSearchIcon && <Ionicons name="search-outline" size={40} color={'black'} onPress={handleFocus} />}
            </Header>

            <TabContainer>
                <TabButton active={activeTab === 'chats'} onPress={() => setActiveTab('chats')}>
                    <TabText active={activeTab === 'chats'}>Open Chats</TabText>
                </TabButton>
                <TabButton active={activeTab === 'friends'} onPress={() => setActiveTab('friends')}>
                    <TabText active={activeTab === 'friends'}>My Friends</TabText>
                </TabButton>
            </TabContainer>

            {activeTab === 'chats' ? (
                <FlatList
                    data={chats}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ChatItem>
                            <Avatar source={item.avatar} />
                            <ChatInfo>
                                <ChatName theme={theme}>{item.name}</ChatName>
                                <ChatMessage theme={theme}>{item.message}</ChatMessage>
                            </ChatInfo>
                            <ChatDate theme={theme}>{item.date}</ChatDate>
                            {item.unread > 0 && (
                                <UnreadBadge>
                                    <UnreadText>{item.unread}</UnreadText>
                                </UnreadBadge>
                            )}
                        </ChatItem>
                    )}
                />
            ) : (
                <FlatList
                    data={friends}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ChatItem>
                            <Avatar source={item.avatar} />
                            <ChatInfo>
                                <ChatName theme={theme}>{item.name}</ChatName>
                            </ChatInfo>
                        </ChatItem>
                    )}
                />
            )}
        </Container>
    );
}

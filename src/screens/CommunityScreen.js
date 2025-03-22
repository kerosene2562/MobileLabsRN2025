import React from 'react';
import { FlatList, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import { useTheme } from '../components/ThemeContext';

const Container = styled.View`
    flex: 1;
    background-color: ${(props) => props.theme.background};
`;

const StyledHeader = styled.View`
    background-color: ${(props) => props.theme.header};
    height: 100px;
`;

const StyledViewBlock = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-left: 20px;
    margin-top: 12%;
`;

const StyledMainText = styled.Text`
    color: ${(props) => props.theme.text};
    font-weight: 500;
    font-size: 30px;
    margin-left: 10px;
`;

const IconWrapper = styled.View`
    width: 40px;
    height: 40px;
    border-radius: 30px;
    background-color: rgb(8, 1, 71);
    overflow: hidden;
`;

const TabsContainer = styled.View`
    flex-direction: row;
    padding: 10px;
`;

const Tab = styled.TouchableOpacity`
    background-color: ${(props) => (props.active ? '#1E90FF' : props.theme.cardSecondary)};
    padding: 10px 15px;
    border-radius: 20px;
    margin-right: 10px;
`;

const TabText = styled.Text`
    color: ${(props) => props.theme.text};
    font-size: 16px;
`;

const PostContainer = styled.View`
    background-color: ${(props) => props.theme.cardSecondary};
    border-radius: 10px;
    margin: 10px;
    padding: 10px;
`;

const PostImage = styled.Image`
    width: 100%;
    height: 180px;
    border-radius: 10px;
`;

const PostTitle = styled.Text`
    color: ${(props) => props.theme.text};
    font-size: 18px;
    font-weight: bold;
    margin-top: 10px;
`;

const PostDescription = styled.Text`
    color: ${(props) => props.theme.text};
    font-size: 14px;
    margin-top: 5px;
`;

const InteractionContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
`;

const InteractionButton = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
`;

const InteractionText = styled.Text`
    color: ${(props) => props.theme.text};
    margin-left: 5px;
`;

const posts = [
    {
        id: '1',
        title: 'Florida tourist attraction sues Fortnite',
        description: 'Coral Castle Museum is suing Epic Games for trademark infringement.',
        image: require('../assets/hoi4.jpg'),
        likes: 324,
        comments: 12,
    },
    {
        id: '2',
        title: 'New Steam Update Released',
        description: 'Valve has rolled out a major update with performance improvements.',
        image: require('../assets/hoi4.jpg'),
        likes: 542,
        comments: 24,
    },
    {
        id: '3',
        title: 'Cyberpunk 2077 DLC Announced',
        description: 'CD Projekt Red has revealed new content for the game.',
        image: require('../assets/hoi4.jpg'),
        likes: 789,
        comments: 34,
    },
];

export default function CommunityScreen() {
    const { theme } = useTheme();

    return (
        <Container theme={theme}>
            <StyledHeader theme={theme}>
                <StyledViewBlock>
                    <IconWrapper>
                        <Ionicons name="logo-steam" size={40} color={'white'}  style={{ marginLeft: -8 }} />
                    </IconWrapper>
                    <StyledMainText theme={theme}>Community</StyledMainText>
                </StyledViewBlock>
            </StyledHeader>

            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={
                    <TabsContainer>
                        <Tab active theme={theme}><TabText>All</TabText></Tab>
                        <Tab theme={theme}><TabText>Screenshots</TabText></Tab>
                        <Tab theme={theme}><TabText>Artwork</TabText></Tab>
                    </TabsContainer>
                }
                renderItem={({ item }) => (
                    <PostContainer theme={theme}>
                        <PostImage source={item.image} />
                        <PostTitle theme={theme}>{item.title}</PostTitle>
                        <PostDescription theme={theme}>{item.description}</PostDescription>
                        <InteractionContainer>
                            <InteractionButton>
                                <Ionicons name="thumbs-up-outline" size={20} color={theme.text} />
                                <InteractionText theme={theme}>{item.likes}</InteractionText>
                            </InteractionButton>
                            <InteractionButton>
                                <Ionicons name="chatbubble-outline" size={20} color={theme.text} />
                                <InteractionText theme={theme}>{item.comments}</InteractionText>
                            </InteractionButton>
                        </InteractionContainer>
                    </PostContainer>
                )}
            />
            <StatusBar style={theme.statusBar} />
        </Container>
    );
}

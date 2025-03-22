import React, { useState, useRef } from 'react';
import { ScrollView, FlatList, View, Text, Button, TextInput, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../components/ThemeContext';

const StyledMainView = styled.View`
    background-color: ${(props) => props.theme.background};
    flex: 1;
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
    margin-bottom: auto;
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
    background-color:  rgb(8, 1, 71); 
    overflow: hidden;
`;

const StyledInput = styled(TextInput)`
    border-radius: 10px;
    margin-left: 15px;
    width: ${(props) => (props.focused ? '60%' : '50%')};
    border: ${(props) => (props.focused ? '1px' : 'none')};
    padding-left: 10px;
    height: 40px;
    color: ${(props) => props.theme.text};
`;

const Card = styled.View`
    flex: 1;
    background-color: white;
    width: 330px;
    height: 270px;
    border-radius: 20px;
    elevation: 5;
    margin-left: 20px;
    margin-top: 10px;
    margin-bottom: 20px;
    overflow: hidden;
`;

const CardBackgroungImg = styled.ImageBackground`
    flex: 1;
    padding-left: 15px;
    padding-top: 50%;
`;

const CardText = styled.Text`
    font-size: 30px;
    color: white;
    font-weight: 700;
`;

const CardTextSmall = styled.Text`
    font-size: 15px;
    font-weight: 500;
    color: rgb(218, 218, 218);
`;

const MoreInfoBlock = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-right: 10px;
`;

const PriceBlock = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`;

const SystemsBlock = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`;

const StrikethroughText = styled.Text`
    text-decoration-line: line-through;
    margin-right: 10px;
    font-size: 16px;
    color: rgb(255, 49, 49);
`;

const DiscountText = styled.Text`
    font-size: 16px;
    backgroundColor: green;
    borderRadius: 10px;
    margin-right: 5px;
    padding: 5px;
    color: white;
`;

const Tab = styled.View`
    flex: 1;
    background-color: ${(props) => props.theme.cardSecondary};
    width: 150px;
    height: 40px;
    border-radius: 10px;
    elevation: 5;
    margin-left: 20px;
    margin-bottom: 20px;
    overflow: hidden;
    justify-content: center;
    align-items: center;
`;

const TabText = styled.Text`
    font-size: 20px;
    color: ${(props) => props.theme.text};
`;

const GameTab = styled.View`
    width: 95%;
    height: 100px;
    background-color: ${(props) => props.theme.cardSecondary};
    border-radius: 10px;
    overflow: hidden;
    border-radius: 10px;
    margin: 5px auto;
    elevation: 5;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`;

const SmallImageContainer = styled.View`
    width: 100px;
    height: 80px;
    margin: 10px;
    border-radius: 10px;
    overflow: hidden;
`;

const SmallGameImg = styled.ImageBackground`
    width: 100px;
    height: 80px;
`;

const InfoBlock = styled.View`
    flex: 1;
    height: 80%;
    margin: 10px;
`;

const TopInfoBlock = styled.View`
    flex:1;
    height: 50%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export function Store(){
    const theme = useTheme();
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

    const tabsData = [
        {id: '1', title: 'Top Setters'},
        {id: '2', title: 'Free to play'},
        {id: '3', title: 'Early Access'},
        {id: '4', title: 'Discounts'},
        {id: '5', title: 'New games'},
    ];

    const gamesData = [
        { id: '1', title: 'Dead by Daylight', recomended: 'Recomended by your friend, Player', price: '18', discount: '50', systems: ['windows', 'mac', 'linux'], src: require('../assets/deadByDaylight.jpg')},
        { id: '2', title: 'Borderlands 3', recomended: 'Recomended by your friend, Player', price: '23', discount: '30', systems: ['windows'], src: require('../assets/borderlands3.jpg') },
        { id: '3', title: 'Doom 2016', recomended: 'Recomended by your friend, Player', price: '30', discount: '20', systems: ['windows'], src: require('../assets/doom2016.jpg') },
        { id: '4', title: 'This war of mine', recomended: 'Recomended by your friend, Player', price: '10', discount: '0', systems: ['windows', 'linux'], src: require('../assets/twom.jpg') },
        { id: '5', title: 'Hearts of iron 4', recomended: 'Recomended by your friend, Player', price: '40', discount: '90', systems: ['windows', 'mac'], src: require('../assets/hoi4.jpg') },
        { id: '6', title: 'Scorn', recomended: 'Recomended by your friend, Player', price: '40', discount: '85', systems: ['windows', 'mac'], src: require('../assets/scorn.jpg') },
        { id: '7', title: 'Half Life', recomended: 'Recomended by your friend, Player', price: '10', discount: '90', systems: ['windows', 'mac'], src: require('../assets/halflife.jpg') },
        { id: '8', title: 'Hollow knight', recomended: 'Recomended by your friend, Player', price: '20', discount: '70', systems: ['windows', 'mac'], src: require('../assets/hollowKnight.jpg') },
    ];
    
    const renderCards = ({ item }) => {
        const discountedPrice = item.price * (1 - item.discount / 100);
        return(
            <Card>
                <CardBackgroungImg source ={item.src}>
                    <CardText>{item.title}</CardText>
                    <CardTextSmall>{item.recomended}</CardTextSmall>
                    <MoreInfoBlock>
                        <PriceBlock>
                            { item.discount > 0 ? (
                                <>
                                    <DiscountText>-{item.discount}%</DiscountText>
                                    <StrikethroughText>{item.price}$</StrikethroughText>
                                    <CardTextSmall>{discountedPrice.toFixed(2)}$</CardTextSmall>
                                </>
                            ) : (
                                <CardTextSmall>{item.price}$</CardTextSmall>
                            )
                            }
                        </PriceBlock>
                        <SystemsBlock>
                            { item.systems.includes('windows') && <Ionicons name="logo-windows" size={25} color="white" />}
                            { item.systems.includes('mac') && <Ionicons name="logo-apple" size={25} color="white" />}
                            { item.systems.includes('linux') && <Ionicons name="logo-tux" size={25} color="white" />}
                        </SystemsBlock>
                    </MoreInfoBlock>
                </CardBackgroungImg>
            </Card> 
        );
    }

    const renderTabs = ({ item }) => {
        return(
            <Tab>
                <TabText>{item.title}</TabText>
            </Tab>
        );
    }

    const renderGames = ({item}) => {
        const discountedPrice = item.price * (1 - item.discount / 100);
        return(
            <GameTab>
                <SmallImageContainer>
                    <SmallGameImg source={item.src}/>
                </SmallImageContainer>
                
                <InfoBlock>
                    <TopInfoBlock>
                        <TabText>{item.title}</TabText>
                        <PriceBlock>
                            { item.discount > 0 ? (
                                <>
                                    <StrikethroughText>{item.price}$</StrikethroughText>
                                    <TabText>{discountedPrice.toFixed(2)}$</TabText>
                                </>
                            ) : (
                                <TabText>{item.price}$</TabText>
                            )}
                        </PriceBlock>
                    </TopInfoBlock>
                    <TopInfoBlock>
                        <SystemsBlock>
                             { item.systems.includes('windows') && <Ionicons name="logo-windows" size={25} color="black" />}
                            { item.systems.includes('mac') && <Ionicons name="logo-apple" size={25} color="black" />}
                            { item.systems.includes('linux') && <Ionicons name="logo-tux" size={25} color="black" />}
                        </SystemsBlock>
                        <DiscountText>-{item.discount}%</DiscountText>
                    </TopInfoBlock>
                </InfoBlock>
            </GameTab>
        );
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
            <ScrollView>
                <FlatList 
                    data = {gamesData.slice(0,5)}
                    renderItem = {renderCards}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator = {false}
                />

                <FlatList 
                    data = {tabsData}
                    renderItem = {renderTabs}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator = {false}
                />

                <FlatList 
                    data = {gamesData}
                    renderItem = {renderGames}
                    keyExtractor={(item) => item.id}
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator = {false}
                />
            </ScrollView>
            <StatusBar style="auto" />
        </StyledMainView>
    );
}
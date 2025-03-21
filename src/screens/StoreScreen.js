import React, { useState, useRef } from 'react';
import { FlatList, View, Text, Button, TextInput, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';

const StyledMainView = styled.View`
    background-color:rgb(211, 211, 211);
    flex: 1;
`;

const StyledHeader = styled.View`
    background-color: rgb(204, 204, 204);
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
`;

const Card = styled.View`
    flex: 1;
    background-color: white;
    width: 330px;
    height: 270px;
    border-radius: 20px;
    elevation: 5;
    margin-left: 20px;
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
    color: rgb(214, 214, 214);
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
    color: rgb(173, 173, 173);
`;

const DiscountText = styled.Text`
    font-size: 16px;
    backgroundColor: green;
    borderRadius: 10px;
    margin-right: 5px;
    padding: 5px;
    color: white;
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

    const cardData = [
        { id: '1', title: 'Dead by Daylight', recomended: 'Recomended by your friend, Player', price: '18', discount: '50', systems: ['windows', 'mac', 'linux'], src: require('../assets/deadByDaylight.jpg')},
        { id: '2', title: 'Borderlands 3', recomended: 'Recomended by your friend, Player', price: '23', discount: '30', systems: ['windows'], src: require('../assets/borderlands3.jpg') },
        { id: '3', title: 'Doom 2016', recomended: 'Recomended by your friend, Player', price: '30', discount: '20', systems: ['windows'], src: require('../assets/doom2016.jpg') },
        { id: '4', title: 'This war of mine', recomended: 'Recomended by your friend, Player', price: '10', discount: '0', systems: ['windows', 'linux'], src: require('../assets/twom.jpg') },
        { id: '5', title: 'Harts of iron 4', recomended: 'Recomended by your friend, Player', price: '40', discount: '90', systems: ['windows', 'mac'], src: require('../assets/hoi4.jpg') },
      ];
    
    const renderItem = ({ item }) => {
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

            <FlatList 
                data = {cardData}
                renderItem = {renderItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator = {false}
            />

            <StatusBar style="auto" />
        </StyledMainView>
    );
}
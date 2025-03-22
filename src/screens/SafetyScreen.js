import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';
import { useTheme } from '../components/ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

const generateCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

export default function SafetyScreen() {
    const { theme, toggleTheme } = useTheme();
    const [code, setCode] = useState(generateCode());
    const [progress, setProgress] = useState(1);
    const [activeTab, setActiveTab] = useState('guard'); // Змінюємо активний таб

    useEffect(() => {
        const interval = setInterval(() => {
            setCode(generateCode());
            setProgress(1); // Скидаємо прогрес до початкового значення
        }, 60000);

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev <= 0) {
                    return 0;
                }
                return prev - 0.02; // Зменшуємо прогрес
            });
        }, 1200);

        return () => {
            clearInterval(interval);
            clearInterval(progressInterval);
        };
    }, []);

    return (
        <Container theme={theme}>
            <StyledHeader>
                <StyledViewBlock>
                    <IconWrapper>
                        <Ionicons name="logo-steam" size={40} color={'white'} style={{ left: -8 }} />
                    </IconWrapper>
                    <StyledMainText>Safety</StyledMainText>
                </StyledViewBlock>
            </StyledHeader>

            {/* Тумблер для перемикання між Guard та Confirmations */}
            <TabContainer>
                <TabButton active={activeTab === 'guard'} onPress={() => setActiveTab('guard')}>
                    <TabText active={activeTab === 'guard'}>Guard</TabText>
                </TabButton>
                <TabButton active={activeTab === 'confirmations'} onPress={() => setActiveTab('confirmations')}>
                    <TabText active={activeTab === 'confirmations'}>Confirmations</TabText>
                </TabButton>
            </TabContainer>

            <StatusBar style={theme.statusBar} />
            <CodeContainer>
                <Code theme={theme}>{code}</Code>
                <ProgressBarContainer>
                    <ProgressBar style={{ width: `${progress * 100}%` }} />
                </ProgressBarContainer>
            </CodeContainer>
            <Info theme={theme}>
                You'll enter your code each time you enter your password to sign in to your Steam account.
            </Info>
            <Button theme={theme}><ButtonText theme={theme}>Remove Authenticator</ButtonText></Button>
            <Button theme={theme}><ButtonText theme={theme}>My Recovery Code</ButtonText></Button>
            <Button theme={theme}><ButtonText theme={theme}>Help</ButtonText></Button>

            {/* Контент залежно від вибраного табу */}
            {activeTab === 'guard' ? (
                <GuardContent>
                    {/* Тут можна додати вміст для Guard */}
                </GuardContent>
            ) : (
                <ConfirmationsContent>
                    {/* Тут можна додати вміст для Confirmations */}
                </ConfirmationsContent>
            )}
        </Container>
    );
}

const Container = styled.View`
    flex: 1;
    background-color: ${(props) => props.theme.background};
    padding: 20px;
`;

const StyledHeader = styled.View`
    background-color: ${(props) => props.theme.header};
    height: 100px;
    width: 120%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
`;

const StyledViewBlock = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-left: 20px;
    margin-top: 47px; 
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

const CodeContainer = styled.View`
    align-items: center;
    margin-top: 20px; /* Зменшено відступ після хедера */
    margin-bottom: 20px;
`;

const Code = styled.Text`
    font-size: 32px;
    font-weight: bold;
    color: ${(props) => props.theme.text};
`;

const ProgressBarContainer = styled.View`
    width: 100%;
    height: 5px;
    background-color: #333;
    margin-top: 10px;
`;

const ProgressBar = styled.View`
    height: 100%;
    background-color: #1E90FF;
`;

const Info = styled.Text`
    color: ${(props) => props.theme.text};
    margin-bottom: 20px;
`;

const Button = styled.TouchableOpacity`
    background-color: #1d1f2b;
    padding: 15px;
    border-radius: 5px;
    margin-bottom: 10px;
    align-items: center;
`;

const ButtonText = styled.Text`
    color: ${(props) => props.theme.buttonText || '#fff'};
    font-weight: bold;
`;

// Тумблер для перемикання між Guard та Confirmations
const TabContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 100px;  /* Піднімаємо тумблер ближче до хедера */
    padding: 10px 20px;
`;

const TabButton = styled.TouchableOpacity`
    padding: 10px;
    background-color: ${(props) => (props.active ? '#1E90FF' : 'transparent')};
    border-radius: 20px;
    padding-horizontal: 20px;
    padding-vertical: 8px;
`;

const TabText = styled.Text`
    font-size: 18px;
    color: ${(props) => (props.active ? 'white' : props.theme.text)};
    font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
`;

const GuardContent = styled.View`
    padding: 20px;
`;

const ConfirmationsContent = styled.View`
    padding: 20px;
`;

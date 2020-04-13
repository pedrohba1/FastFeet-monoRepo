import styled from 'styled-components/native';

export const Background = styled.SafeAreaView`
    background: #ffffff;
    flex: 1;
`;

export const Header = styled.View`
    align-self: stretch;
    margin-top: 10px;
    display: flex;
    justify-content: space-evenly;
    flex-direction: row;
`;

export const MsgContainer = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const Name = styled.Text`
    color: #444444;
    font-weight: bold;
    font-size: 20px;
`;

export const WelcomeMessage = styled.Text`
    color: #666666;
`;

export const Button = styled.TouchableOpacity`
    align-self: center;
`;

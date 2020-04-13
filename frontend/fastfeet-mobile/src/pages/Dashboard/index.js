import React from 'react';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native';

import {
    Background,
    Header,
    MsgContainer,
    Name,
    WelcomeMessage,
    Button,
} from './styles';

import Picture from '~/components/Picture';

export default function Dashboard() {
    const { profile } = useSelector(state => state.user);

    return (
        <Background>
            <Header>
                <Picture name={profile.name} />
                <MsgContainer>
                    <WelcomeMessage>Bem vindo de volta,</WelcomeMessage>
                    <Name>{profile.name}</Name>
                </MsgContainer>
                <Button>
                    <Icon name="logout-variant" size={30} color="#E74040" />
                </Button>
            </Header>
        </Background>
    );
}

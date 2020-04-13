import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import {
    Background,
    Header,
    MsgContainer,
    Name,
    WelcomeMessage,
    Button,
    CourierContainer,
    HContainer,
    DText,
    StatusContainer,
    SearchType,
} from './styles';

import Picture from '~/components/Picture';

import { SignOut } from '~/store/modules/auth/actions';

export default function Dashboard() {
    const profile = useSelector(state => state.user.profile || { name: '' });
    const dispatch = useDispatch();
    const status = useState('delivered');

    function handleLogout() {
        dispatch(SignOut());
    }

    return (
        <Background>
            <Header>
                <CourierContainer>
                    <Picture>{profile.name}</Picture>
                    <MsgContainer>
                        <WelcomeMessage>Bem vindo de volta,</WelcomeMessage>
                        <Name>{profile.name}</Name>
                    </MsgContainer>
                </CourierContainer>
                <Button onPress={handleLogout}>
                    <Icon name="exit-to-app" size={30} color="#E74040" />
                </Button>
            </Header>

            <HContainer>
                <DText>Entregas</DText>
                <StatusContainer>
                    <TouchableOpacity>
                        <SearchType highlight>Pendentes</SearchType>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <SearchType>Entregues</SearchType>
                    </TouchableOpacity>
                </StatusContainer>
            </HContainer>
        </Background>
    );
}

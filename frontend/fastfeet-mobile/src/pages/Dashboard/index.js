import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
    Background,
    Header,
    MsgContainer,
    Name,
    WelcomeMessage,
    Button,
    CourierContainer,
} from './styles';

import Picture from '~/components/Picture';

import { SignOut } from '~/store/modules/auth/actions';

export default function Dashboard() {
    const profile = useSelector(state => state.user.profile || { name: '' });
    const dispatch = useDispatch();

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
        </Background>
    );
}

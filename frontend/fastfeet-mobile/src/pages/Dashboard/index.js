import React, { useState, useEffect } from 'react';
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
import api from '~/services/api';
import { SignOut } from '~/store/modules/auth/actions';

export default function Dashboard() {
    const profile = useSelector(state => state.user.profile || { name: '' });
    const [packages, setPackages] = useState([]);

    const dispatch = useDispatch();
    const [pending, setPending] = useState(true);
    const [delivered, setDelivered] = useState(false);
    function handleLogout() {
        dispatch(SignOut());
    }

    useEffect(() => {
        async function loadPackages() {
            const response = await api.get('packages', {
                params: {
                    courier_id: profile.id,
                },
            });
            setPackages(response.data);
        }

        loadPackages();
    }, []);

    function handleChange(currentButton) {
        if (currentButton === 'pending') {
            setPending(true);
            setDelivered(false);
        } else {
            setPending(false);
            setDelivered(true);
        }
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
                    <TouchableOpacity onPress={() => handleChange('pending')}>
                        <SearchType selected={pending}>Pendentes</SearchType>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleChange('delivered')}>
                        <SearchType selected={delivered}>Entregues</SearchType>
                    </TouchableOpacity>
                </StatusContainer>
            </HContainer>
        </Background>
    );
}

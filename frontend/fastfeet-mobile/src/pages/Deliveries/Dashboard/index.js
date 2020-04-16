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
    List,
} from './styles';

import Picture from '~/components/Picture';
import Pack from '~/components/Pack';
import api from '~/services/api';
import { SignOut } from '~/store/modules/auth/actions';

export default function Dashboard({ navigation }) {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.user.profile || { name: '' });

    const [packages, setPackages] = useState([]);
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
                    pending_only: pending ? 'yes' : 'no',
                    delivered_only: delivered ? 'yes' : 'no',
                },
            });
            setPackages(response.data);
        }
        loadPackages();
    }, [profile.id, pending, delivered]);

    function handleChange(currentButton) {
        if (currentButton === 'pending') {
            setPending(true);
            setDelivered(false);
        } else {
            setPending(false);
            setDelivered(true);
        }
    }

    function handleCheckDetails(pack) {
        navigation.navigate('PackDetails', { pack });
    }

    return (
        <Background>
            <Header>
                <CourierContainer>
                    <Picture src={profile.avatar && profile.avatar.url}>
                        {profile.name}
                    </Picture>
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

            <List
                data={packages}
                renderItem={({ item }) => (
                    <Pack onCheckDetails={handleCheckDetails} item={item} />
                )}
                keyExtractor={item => String(item.id)}
            />
        </Background>
    );
}

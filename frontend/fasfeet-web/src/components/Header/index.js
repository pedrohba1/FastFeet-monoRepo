import React from 'react';

import { Link } from 'react-router-dom';
import { Container, Content, Option, Right, Left, Logout } from './styles';
import logo from '~/assets/fastfeet-logo.png';

export default function Header() {
    function handleNavigation() {
        console.log('navegando');
    }

    return (
        <Container>
            <Content>
                <Left>
                    <img src={logo} alt="fastFeet" />

                    <Option to="/packages" onClick={handleNavigation}>
                        <strong>ENCOMENDAS</strong>
                    </Option>
                    <Option to="/couriers">
                        <strong>ENTREGADORES</strong>
                    </Option>
                    <Option to="/recipients">
                        <strong>DESTINATÁRIOS</strong>
                    </Option>
                    <Option to="/problems">
                        <strong>PROBLEMAS</strong>
                    </Option>
                </Left>
                <Right>
                    <strong>Admin fastFeet</strong>
                    <Logout>Sair do sistema</Logout>
                </Right>
            </Content>
        </Container>
    );
}

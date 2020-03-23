import React from 'react';

import { Container, Content, Option, Right, Left, Logout } from './styles';
import logo from '~/assets/fastfeet-logo.png';

export default function Header() {
    return (
        <Container>
            <Content>
                <Left>
                    <img src={logo} alt="fastFeet" />

                    <Option>
                        <strong>ENCOMENDAS</strong>
                    </Option>
                    <Option>
                        <strong>ENTREGADORES</strong>
                    </Option>
                    <Option>
                        <strong>DESTINATÁRIOS</strong>
                    </Option>
                    <Option>
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

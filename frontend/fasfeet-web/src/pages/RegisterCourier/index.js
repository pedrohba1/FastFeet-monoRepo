import React from 'react';
import { MdChevronLeft, MdCheck } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { RegisterButton, Title } from '~/styles/default';

import { Container, Buttons, BackButton, Header } from './styles';

import { changeTab } from '~/store/modules/user/actions';

export default function RegisterCourier() {
    const dispatch = useDispatch();

    function handleReturn() {
        dispatch(changeTab('couriers'));
    }

    return (
        <Container>
            <Header>
                <Title>Cadastro de entregadores</Title>

                <Buttons>
                    <BackButton onClick={handleReturn}>
                        <MdChevronLeft size={20} />
                        <span>VOLTAR</span>
                    </BackButton>
                    <RegisterButton>
                        <MdCheck size={20} />
                        <span>SALVAR</span>
                    </RegisterButton>
                </Buttons>
            </Header>
        </Container>
    );
}

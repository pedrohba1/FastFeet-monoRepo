import React from 'react';

import { MdChevronLeft, MdCheck } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Title, RegisterButton } from '~/styles/default';

import {
    Container,
    Header,
    Buttons,
    BackButton,
    DataContainer,
} from './styles';

import { changeTab } from '~/store/modules/user/actions';

export default function ChangeRecipient() {
    const dispatch = useDispatch();

    function handleReturn() {
        dispatch(changeTab('recipients'));
    }

    return (
        <Container>
            <Header>
                <Title>Cadastro de destinatários</Title>
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

            <DataContainer />
        </Container>
    );
}

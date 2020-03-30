import React from 'react';
import { MdChevronLeft, MdCheck } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { RegisterButton, Title } from '~/styles/default';
import AvatarInput from './AvatarInput';
import {
    Container,
    Buttons,
    BackButton,
    Header,
    FormContainer,
    TextInputs,
} from './styles';

import { changeTab } from '~/store/modules/user/actions';

export default function RegisterCourier() {
    const dispatch = useDispatch();

    function handleReturn() {
        dispatch(changeTab('couriers'));
    }

    function handleSubmit() {
        console.tron.log('submit');
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
                    <RegisterButton onClick={handleSubmit}>
                        <MdCheck size={20} />
                        <span>SALVAR</span>
                    </RegisterButton>
                </Buttons>
            </Header>

            <FormContainer>
                <Form onSubmit={handleSubmit}>
                    <AvatarInput />

                    <TextInputs>
                        <h4>Nome</h4>
                        <Input
                            name="email"
                            type="email"
                            placeholder="nome do entregador"
                        />
                        <h4>Email</h4>
                        <Input
                            name="password"
                            type="password"
                            placeholder="email do entregador"
                        />
                    </TextInputs>
                </Form>
            </FormContainer>
        </Container>
    );
}

import React from 'react';
import { Image } from 'react-native';
import Background from '~/components/Background';
import logo from '~/assets/images/logo.png';

import { Container, Form, FormInput, SubmitButton } from './styles';

export default function SignIn() {
    return (
        <Background>
            <Container>
                <Image source={logo} />
                <Form>
                    <FormInput placeholder="Informe seu ID de cadastro" />
                    <SubmitButton>Entrar no sistema</SubmitButton>
                </Form>
            </Container>
        </Background>
    );
}

import React, { useLayoutEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import { Container, ProblemInput, Button, BText, Background } from './styles';

export default function InfoProblem({ navigation, route }) {
    const { data } = route.params;

    console.tron.log(data);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Icon name="chevron-left" size={30} color="#fff" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    return (
        <Background>
            <Container>
                <ProblemInput multiline placeholder="informe o problema aqui" />
            </Container>
            <Button>
                <BText>Enviar</BText>
            </Button>
        </Background>
    );
}

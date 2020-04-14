import React, { useLayoutEffect, useMemo } from 'react';
import HIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import {
    Container,
    HorizontalContainer,
    HText,
    LabelText,
    Background,
    ContentText,
    TextContainer,
    HTextContainer,
    Buttons,
    Button,
    ButtonText,
} from './styles';

export default function PackDetails({ navigation, route }) {
    const { data } = route.params;

    console.tron.log(data);

    const startDateFormatted = useMemo(() => {
        return data.start_date !== null
            ? format(parseISO(data.start_date), 'dd/MM/yyyy', {
                  locale: pt,
              })
            : '--/--/--';
    }, [data.start_date]);

    const endDateFormatted = useMemo(() => {
        return data.end_date !== null
            ? format(parseISO(data.end_date), 'dd/MM/yyyy', {
                  locale: pt,
              })
            : '--/--/--';
    }, [data.end_date]);

    const status = useMemo(() => {
        if (data.start_date === null) {
            return 'não retirado';
        }
        if (data.start_date !== null) {
            return 'pendente';
        }
        if (data.end_date !== null) {
            return 'entregue';
        }
    }, [data.start_udate, data.start_date, data.end_date]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <HIcon name="chevron-left" size={30} color="#fff" />
                </TouchableOpacity>
            ),
        });
    }, []);

    return (
        <Background>
            <Container>
                <HorizontalContainer>
                    <Icon name="truck" size={20} color="#7D40E7" />
                    <HText>Informações de entrega</HText>
                </HorizontalContainer>

                <TextContainer>
                    <LabelText>DESTINATÁRIO</LabelText>
                    <ContentText>{data.recipient.name}</ContentText>
                </TextContainer>

                <TextContainer>
                    <LabelText>ENDEREÇO DE ENTREGA</LabelText>
                    <ContentText>
                        {data.recipient.address},{' '}
                        {data.recipient.address_number},{' '}
                        {data.recipient.address_complement},{' '}
                        {data.recipient.city} - {data.recipient.state},{' '}
                        {data.recipient.cep}
                    </ContentText>
                </TextContainer>

                <TextContainer>
                    <LabelText>PRODUTO</LabelText>
                    <ContentText>{data.product}</ContentText>
                </TextContainer>
            </Container>

            <Container>
                <HorizontalContainer>
                    <Icon name="calendar-outline" size={20} color="#7D40E7" />
                    <HText>Situação de entrega</HText>
                </HorizontalContainer>

                <TextContainer>
                    <LabelText>STATUS</LabelText>
                    <ContentText>{status}</ContentText>
                </TextContainer>

                <HTextContainer>
                    <TextContainer>
                        <LabelText>DATA DE RETIRADA</LabelText>
                        <ContentText>{startDateFormatted}</ContentText>
                    </TextContainer>
                    <TextContainer>
                        <LabelText>DATA DE ENTREGA</LabelText>
                        <ContentText>{endDateFormatted}</ContentText>
                    </TextContainer>
                </HTextContainer>
            </Container>

            <Buttons>
                <Container>
                    <Button
                        onPress={() => {
                            navigation.navigate('InformProblem', { data });
                        }}
                    >
                        <Icon
                            name="close-circle-outline"
                            size={40}
                            color="#E74040"
                        />
                        <ButtonText>Informar{'\n'}Problema</ButtonText>
                    </Button>
                </Container>
                <Container>
                    <Button>
                        <Icon
                            name="information-outline"
                            size={40}
                            color="#E7BA40"
                        />
                        <ButtonText>Visualizar{'\n'}Problemas</ButtonText>
                    </Button>
                </Container>
                <Container>
                    <Button>
                        <Icon name="check-circle" size={40} color="#7D40E7" />
                        <ButtonText>Confirmar{'\n'}Entrega</ButtonText>
                    </Button>
                </Container>
            </Buttons>
        </Background>
    );
}

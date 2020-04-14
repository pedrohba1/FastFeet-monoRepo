import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native';
import formatId from '~/utils/formatId';

import {
    Container,
    Header,
    PackId,
    Label,
    Info,
    Details,
    DeliveryInfo,
    InfoData,
    ProgressBar,
    Line,
    Ball,
    Progress,
    BallLabel,
    BallLabelContainer,
} from './styles';

export default function Pack({ data, onCheckDetails }) {
    const dateFormatted = useMemo(() => {
        return data.updated_at !== null
            ? format(parseISO(data.updated_at), 'dd/MM/yyyy', {
                  locale: pt,
              })
            : 'não retirado';
    }, [data.updated_at]);

    return (
        <Container>
            <Header>
                <Icon name="truck" size={20} color="#7D40E7" />
                <PackId>Encomenda {formatId(data.id)}</PackId>
            </Header>
            <Progress>
                <ProgressBar>
                    <Ball checked />
                    <Line />
                    <Ball checked={data.start_date !== null} />
                    <Line />
                    <Ball checked={data.end_date !== null} />
                </ProgressBar>
                <BallLabelContainer>
                    <BallLabel>Aguardando{'\n'} Retirada</BallLabel>
                    <BallLabel>Retirada</BallLabel>
                    <BallLabel>Entregue</BallLabel>
                </BallLabelContainer>
            </Progress>
            <DeliveryInfo>
                <Info>
                    <Label>Data</Label>
                    <InfoData>{dateFormatted}</InfoData>
                </Info>

                <Info>
                    <Label>Cidade</Label>
                    <InfoData>{data.recipient.city}</InfoData>
                </Info>

                <Info>
                    <TouchableOpacity onPress={() => onCheckDetails(data)}>
                        <Details>Ver detalhes</Details>
                    </TouchableOpacity>
                </Info>
            </DeliveryInfo>
        </Container>
    );
}

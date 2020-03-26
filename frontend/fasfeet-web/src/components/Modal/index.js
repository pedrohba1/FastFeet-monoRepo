import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import { Container, Bold, Text } from './styles';

export default function Modal({ closeFunc, isOpen, content }) {
    console.tron.log(content);

    return (
        <ReactModal
            shouldCloseOnOverlayClick
            shouldCloseOnEsc
            data={content}
            isOpen={isOpen}
            onRequestClose={closeFunc}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                },
                content: {
                    position: 'absolute',
                    top: '175px',
                    left: '600px',
                    right: '600px',
                    bottom: '175px',
                    border: '1px solid #ccc',
                    background: '#fff',
                },
            }}
        >
            <Container>
                <Bold>Informações da encomenda</Bold>
            </Container>

            <Container>
                <Bold>Datas</Bold>
                <Text>{data.recipient.address}</Text>

                <Bold>Retirada:</Bold>
                <Bold>Entrega</Bold>
            </Container>

            <Container>
                <Bold>Assinatura do destinatário</Bold>
            </Container>
        </ReactModal>
    );
}

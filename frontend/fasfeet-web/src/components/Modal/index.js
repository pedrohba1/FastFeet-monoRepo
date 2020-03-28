import React from 'react';
import PropTypes from 'prop-types';

import Moment from 'react-moment';
import 'moment-timezone';

import ReactModal from 'react-modal';

import { Container, Text, Bold } from './styles';

export default function Modal({ closeFunc, isOpen, packData }) {
    console.tron.log(packData);

    /*     const { timezone } = Intl.DateTimeFormat().resolvedOptions();
     */

    return (
        <ReactModal
            shouldCloseOnOverlayClick
            shouldCloseOnEsc
            isOpen={isOpen}
            data={packData}
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
                <Text>
                    {packData.address}, {packData.address_number}
                </Text>
                <Text>
                    {packData.city} - {packData.state}
                </Text>
                <Text>{packData.cep}</Text>
            </Container>

            <Container>
                <Bold>Datas</Bold>

                <Text>
                    <Bold>Retirada: </Bold>
                    <Moment format="DD/MM/YYYY" date={packData.start_date} />
                </Text>
                <Text>
                    <Bold>Entrega: </Bold>
                    <Moment format="DD/MM/YYYY" date={packData.end_date} />
                </Text>
            </Container>

            <Container>
                <Bold>Assinatura do destinatário</Bold>
                <img src={packData.signatureUrl} alt="" />
            </Container>
        </ReactModal>
    );
}

Modal.propTypes = {
    closeFunc: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    packData: PropTypes.object.isRequired,
};

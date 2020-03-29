import React from 'react';
import PropTypes from 'prop-types';

import Moment from 'react-moment';
import 'moment-timezone';

import ReactModal from 'react-modal';

import { Container, Text, Bold } from './styles';

export default function ProblemModal({ closeFunc, isOpen, problemData }) {
    console.tron.log(problemData);

    /*     const { timezone } = Intl.DateTimeFormat().resolvedOptions();
     */

    return (
        <ReactModal
            shouldCloseOnOverlayClick
            shouldCloseOnEsc
            isOpen={isOpen}
            data={problemData}
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
                    maxWidth: '600px',
                    maxHeight: '500px',
                    border: '1px solid #ccc',
                    background: '#fff',
                    margin: 'auto',
                    alignSelf: 'center',
                },
            }}
        >
            <Container>
                <Bold>VISUALIZAR PROBLEMA</Bold>
                <Text>{problemData.description}</Text>
            </Container>
        </ReactModal>
    );
}

ProblemModal.propTypes = {
    closeFunc: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    problemData: PropTypes.object.isRequired,
};

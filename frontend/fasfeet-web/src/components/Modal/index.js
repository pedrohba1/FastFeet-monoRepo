import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

// import { Container } from './styles';

export default function Modal({ closeFunc, isOpen }) {
    return (
        <ReactModal
            shouldCloseOnOverlayClick
            shouldCloseOnEsc
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
            <span> teste</span>
        </ReactModal>
    );
}

Modal.propTypes = {
    closeFunc: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import { Container, Img, Name } from './styles';

export default function Picture({ src, name }) {
    function getInitials(string) {
        const names = string.split(' ');
        let initials = names[0].substring(0, 1).toUpperCase();

        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;
    }

    return (
        <Container>
            {src ? (
                <Img
                    source={{
                        uri: src,
                    }}
                />
            ) : (
                <Name>{getInitials(name)}</Name>
            )}
        </Container>
    );
}

Picture.defaultProps = {
    src: '',
};

Picture.propTypes = {
    src: PropTypes.string,
    name: PropTypes.string.isRequired,
};

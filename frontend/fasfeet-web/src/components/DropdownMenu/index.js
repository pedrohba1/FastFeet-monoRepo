import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { IoMdEye } from 'react-icons/io';

import {
    Container,
    ActionButton,
    ActionIcon,
    OptionList,
    Option,
} from './styles';

export default function DropdownMenu({
    inPackages,
    inProblems,
    openModalFunction,
    data,
    editFunction,
}) {
    const [visible, setVisible] = useState(false);

    function handleToggleVisible() {
        setVisible(!visible);
    }

    return (
        <Container>
            <ActionButton onClick={handleToggleVisible}>
                <ActionIcon />
            </ActionButton>

            <OptionList
                inProblems={inProblems}
                visible={visible}
                onMouseLeave={handleToggleVisible}
            >
                {(inPackages || inProblems) && (
                    <Option>
                        <IoMdEye color="#8E5BE8" />
                        <button
                            onClick={() => openModalFunction(data)}
                            type="button"
                        >
                            Visualizar
                        </button>
                    </Option>
                )}

                {!inProblems && (
                    <Option>
                        <MdEdit color="#4D85EE" />
                        <button
                            onClick={() => editFunction(data)}
                            type="button"
                        >
                            Editar
                        </button>
                    </Option>
                )}

                <Option>
                    <MdDeleteForever color="#DE3B3B" />
                    <button type="button">
                        {inProblems ? 'Cancelar encomenda' : 'Excluir'}
                    </button>
                </Option>
            </OptionList>
        </Container>
    );
}

DropdownMenu.defaultProps = {
    inPackages: false,
    inProblems: false,
    openModalFunction: null,
};

DropdownMenu.propTypes = {
    inProblems: PropTypes.bool,
    inPackages: PropTypes.bool,
    openModalFunction: PropTypes.func,
    data: PropTypes.object.isRequired,
    editFunction: PropTypes.func.isRequired,
};

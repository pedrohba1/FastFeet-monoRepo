import React, { useState } from 'react';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import {
    Container,
    ActionButton,
    ActionIcon,
    OptionList,
    Option,
} from './styles';

export default function DropdownMenu() {
    const [visible, setVisible] = useState(false);

    function handleToggleVisible() {
        setVisible(!visible);
    }

    return (
        <Container>
            <ActionButton onClick={handleToggleVisible}>
                <ActionIcon />
            </ActionButton>

            <OptionList visible={visible} onMouseLeave={handleToggleVisible}>
                <Option>
                    <MdEdit color="#4D85EE" />
                    <button type="button"> Editar</button>
                </Option>

                <Option>
                    <MdDeleteForever color="#DE3B3B" />
                    <button type="button"> Excluir</button>
                </Option>
            </OptionList>
        </Container>
    );
}

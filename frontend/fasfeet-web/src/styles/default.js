import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
import { MdAdd, MdMoreHoriz } from 'react-icons/md';
import { darken } from 'polished';

export const Title = styled.h1`
    color: #444444;
`;

export const colors = [
    '#A28FD0',
    '#CB946C',
    '#83CEC9',
    '#CC7584',
    '#A8D080',
    '#CCCC8B',
];

export const Search = styled(Input).attrs({
    icon: { name: 'search' },
})``;

export const SearchIcon = styled(MdAdd).attrs({
    size: 20,
})`
    vertical-align: middle;
`;

export const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const RegisterButton = styled.button`
    display: flex;
    height: 36px;
    vertical-align: middle;

    span {
        display: flex;
        align-self: center;
    }

    &:hover {
        background: ${darken(0.1, '#7d40e7')};
    }

    color: #ffffff;
    background: #7d40e7;
    border: 0;
    padding: 0 10px;
    font-weight: bold;
    border-radius: 4px;
`;

export const ActionButton = styled.button`
    display: flex;
    float: right;
    border: 0;
    background: none;
`;

export const ActionIcon = styled(MdMoreHoriz).attrs({
    size: 25,
})`
    color: #c6c6c6;
`;

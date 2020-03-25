import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
import { MdAdd, MdMoreHoriz } from 'react-icons/md';
import { darken } from 'polished';

export const colors = [
    '#A28FD0',
    '#CB946C',
    '#83CEC9',
    '#CC7584',
    '#A8D080',
    '#CCCC8B',
];

export const List = styled.div`
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-row-gap: 20px;
`;

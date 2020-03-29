import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div``;

export const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

export const Buttons = styled.div`
    display: flex;
    flex-direction: row;
`;

export const DataContainer = styled.div``;

export const BackButton = styled.button`
    display: flex;
    height: 36px;
    vertical-align: middle;
    margin-right: 10px;
    span {
        display: flex;
        align-self: center;
    }

    &:hover {
        background: ${darken(0.1, '#CCCCCC')};
    }

    color: #ffffff;
    background: #cccccc;
    border: 0;
    padding: 0 10px;
    font-weight: bold;
    border-radius: 4px;
`;

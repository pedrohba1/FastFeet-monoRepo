import styled from 'styled-components/native';

export const ProblemContainer = styled.View`
    padding: 8px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-self: stretch;
    border-width: 0.5px;
    border-radius: 0.5px;
    border-color: #ddd;
    border-bottom-width: 0;
    shadow-color: #000;
    shadow-opacity: 0.8;
    shadow-radius: 1px;
    elevation: 0.2;
    margin-left: 5px;
    margin-right: 5px;
    margin-top: 10px;
`;

export const ProblemDescription = styled.Text.attrs({
    numberOfLines: 2,
})`
    color: #999999;
    align-self: center;
    width: 50%;
    display: flex;
`;

export const ProblemDate = styled.Text`
    color: #c1c1c1;
    align-self: center;
    display: flex;
`;

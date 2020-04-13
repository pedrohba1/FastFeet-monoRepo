import styled from 'styled-components/native';

export const Container = styled.View`
    padding: 5px;
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

export const Header = styled.View`
    display: flex;
    flex-direction: row;
`;

export const PackId = styled.Text`
    margin-left: 3px;
    font-weight: bold;
    color: #7d40e7;
`;

export const DeliveryInfo = styled.View`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
`;

export const Info = styled.View`
    display: flex;
    flex-direction: column;
    align-self: flex-end;
`;

export const InfoData = styled.Text`
    color: #444444;
    font-weight: bold;
`;

export const Label = styled.Text`
    color: #999999;
`;

export const Details = styled.Text`
    align-self: flex-start;
    font-weight: bold;
    color: #7d40e7;
`;

export const ProgressBar = styled.View`
    margin: 0 20px;
    align-self: stretch;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
`;

export const Line = styled.View`
    display: flex;
    flex: 1;
    align-self: center;
    border-bottom-color: #7d40e7;
    border-bottom-width: 1px;
`;
export const Ball = styled.View`
    display: flex;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    ${props =>
        props.checked ? 'background: #7d40e7;' : 'border: 1px solid #7d40e7;'}
'}

`;
export const BallContainer = styled.View`
    display: flex;
    align-self: flex-start;
    align-items: center;
`;

export const BallLabelContainer = styled.View`
    align-self: stretch;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
`;

export const BallLabel = styled.Text`
    color: #999999;
    font-size: 12px;
    align-self: center;
`;

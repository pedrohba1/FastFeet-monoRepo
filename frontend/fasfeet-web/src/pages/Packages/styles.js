import styled from 'styled-components';

export const List = styled.div`
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-row-gap: 20px;
`;

export const Status = styled.span`
    display: flex;
    font-weight: bold;
    padding: 5px;
    border-radius: 12px;

    figure {
        display: flex;
        align-self: center;
        border-radius: 50%;
        height: 7px;
        width: 7px;
        margin: 0 5px;
    }

    ${props => {
        switch (props.status) {
            case 'ENTREGUE':
                return `
                color: #2ca42b;
                background: #dff0df;
                figure{
                    background: #2ca42b;
                };
                `;
            case 'PENDENTE':
                return `
                color: #C1BC35;
                background: #F0F0DF;
                figure{
                    background: #C1BC35;
                }
                `;
            case 'RETIRADA':
                return `
                color: #4D85EE;
                background: #BAD2FF;

                figure{
                    background: #4D85EE;
                }
                `;

            default:
        }
    }}
`;

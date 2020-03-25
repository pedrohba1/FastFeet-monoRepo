import React, { useState, useEffect } from 'react';
import {
    Title,
    Buttons,
    RegisterButton,
    SearchIcon,
    Search,
} from '~/styles/default';
import api from '~/services/api';

export default function Packages() {
    const [packages, setPackages] = useState([]);
    const [input, setInput] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    async function searchPackages() {
        setLoading(true);

        const response = await api.get('packages', {
            params: {
                page,
                product: input,
                courierName: input,
                recipientName: input,
            },
        });

        response.data.map(
            // eslint-disable-next-line no-return-assign
            pack => pack.id < 10 && (pack.id = `0${pack.id}`)
        );
        setPackages(response.data);
        setLoading(false);
    }
    useEffect(() => {
        searchPackages();
    }, [page]);

    function handleEnterPress(e) {
        if (e.which === 13 || e.keyCode === 13) {
            searchPackages();
        }
    }

    return (
        <>
            <Title>Gerenciando encomendas</Title>

            <Buttons>
                <Search
                    loading={loading}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyUp={handleEnterPress}
                    placeholder="buscar por entregadores"
                    iconPosition="left"
                />
                <RegisterButton>
                    <SearchIcon />
                    <span>CADASTRAR</span>
                </RegisterButton>
            </Buttons>
        </>
    );
}

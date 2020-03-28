import React, { useState, useEffect } from 'react';
import {
    Title,
    Buttons,
    Search,
    ListHeader,
    ListMain,
    ListActions,
} from '~/styles/default';
import DropdownMenu from '~/components/DropdownMenu';

import { List } from './styles';
import api from '~/services/api';

export default function Problems() {
    const [problems, setProblems] = useState([]);
    const [input, setInput] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    async function searchPackages() {
        setLoading(true);
        const response = await api.get('problems');

        response.data.map(courier => {
            courier.id = courier.id < 10 ? `0${courier.id}` : courier.id;
            return courier;
        });
        setProblems(response.data);
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
            <Title>Problemas na entrega</Title>

            <Buttons>
                <Search
                    loading={loading}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyUp={handleEnterPress}
                    placeholder="buscar por destinatários"
                    iconPosition="left"
                />
            </Buttons>

            <List>
                <ListHeader>
                    <span>Encomenda</span>
                </ListHeader>
                <ListHeader>
                    <span>Problema</span>
                </ListHeader>
                <ListHeader>
                    <span>Ações</span>
                </ListHeader>

                {problems.map(problem => (
                    <>
                        <ListMain>
                            <span>#{problem.id}</span>
                        </ListMain>
                        <ListMain>
                            <span>{problem.description}</span>
                        </ListMain>
                        <ListActions>
                            <DropdownMenu />
                        </ListActions>
                    </>
                ))}
            </List>
        </>
    );
}

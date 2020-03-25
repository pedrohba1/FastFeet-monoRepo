import React, { useEffect, useState } from 'react';

import {
    Title,
    Buttons,
    RegisterButton,
    SearchIcon,
    Search,
    ListHeader,
    ListMain,
    ListActions,
} from '~/styles/default';

import { List } from './styles';

import api from '~/services/api';
import DropdownMenu from '~/components/DropdownMenu';
import Picture from '~/components/Picture';

export default function Couriers() {
    const [couriers, setCouriers] = useState([]);
    const [input, setInput] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    async function searchCouriers() {
        setLoading(true);
        const response = await api.get('couriers', {
            params: {
                page,
                name: input,
            },
        });

        response.data.map(courier => {
            courier.id = courier.id < 10 ? `0${courier.id}` : courier.id;
            return courier;
        });
        setCouriers(response.data);
        setLoading(false);
    }
    useEffect(() => {
        searchCouriers();
    }, [page]);

    function handleEnterPress(e) {
        if (e.which === 13 || e.keyCode === 13) {
            searchCouriers();
        }
    }

    return (
        <>
            <Title> Gerenciando entregadores</Title>
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

            <List>
                <ListHeader>
                    <span>ID</span>
                </ListHeader>
                <ListHeader>
                    <span>Foto</span>
                </ListHeader>
                <ListHeader>
                    <span>Nome</span>
                </ListHeader>
                <ListHeader>
                    <span>Email</span>
                </ListHeader>
                <ListHeader>
                    <span>Ações</span>
                </ListHeader>

                {couriers.map(courier => (
                    <>
                        <ListMain>
                            <span>#{courier.id}</span>
                        </ListMain>
                        <ListMain>
                            <Picture
                                name={courier.name}
                                src={courier.avatar && courier.avatar.url}
                            />
                        </ListMain>
                        <ListMain>
                            <span> {courier.name}</span>
                        </ListMain>

                        <ListMain>
                            <span>{courier.email}</span>
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

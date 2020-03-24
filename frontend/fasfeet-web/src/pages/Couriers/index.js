import React, { useEffect, useState } from 'react';
import {
    Title,
    Search,
    List,
    ListHeader,
    ListMain,
    Buttons,
    RegisterButton,
    SearchIcon,
    ListActions,
    Picture,
    DefaultPic,
    colors,
} from './styles';

import getInitials from '~/utils/getInitials';
import api from '~/services/api';
import DropdownMenu from '~/components/DropdownMenu';

export default function Couriers() {
    const [couriers, setCouriers] = useState([]);
    const [input, setInput] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    async function searchCouriers() {
        const response = await api.get('couriers', {
            params: {
                page,
                name: input,
            },
        });
        setCouriers(response.data);
        setLoading(false);
    }
    useEffect(() => {
        searchCouriers();
    }, []);

    function handleEnterPress(e) {
        if (e.which === 13 || e.keyCode === 13) {
            setLoading(true);
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
                    icon={{ name: 'search' }}
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
                            <span>
                                {courier.avatar !== null ? (
                                    <Picture src={courier.avatar.url} />
                                ) : (
                                    <DefaultPic
                                        color={
                                            colors[
                                                Math.floor(
                                                    Math.random() *
                                                        colors.length
                                                )
                                            ]
                                        }
                                    >
                                        <span>{getInitials(courier.name)}</span>
                                    </DefaultPic>
                                )}
                            </span>
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

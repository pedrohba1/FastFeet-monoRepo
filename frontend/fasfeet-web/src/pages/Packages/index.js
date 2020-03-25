import React, { useState, useEffect } from 'react';
import api from '~/services/api';

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
import { List, Status } from './styles';

import Picture from '~/components/Picture';
import DropdownMenu from '~/components/DropdownMenu';

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

        response.data.map(pack => {
            pack.id = pack.id < 10 ? `0${pack.id}` : pack.id;

            if (!pack.start_date) {
                pack.status = 'PENDENTE';
            }
            if (pack.start_date && !pack.end_date) {
                pack.status = 'RETIRADA';
            }
            if (pack.end_date) {
                pack.status = 'ENTREGUE';
            }

            return pack;
        });

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

            <List>
                <ListHeader>
                    <span>ID</span>
                </ListHeader>
                <ListHeader>
                    <span>Destinatário</span>
                </ListHeader>
                <ListHeader>
                    <span>Entregador</span>
                </ListHeader>
                <ListHeader>
                    <span>Cidade</span>
                </ListHeader>
                <ListHeader>
                    <span>Estado</span>
                </ListHeader>
                <ListHeader>
                    <span>Status</span>
                </ListHeader>
                <ListHeader>
                    <span>Ações</span>
                </ListHeader>

                {packages.map(pack => (
                    <>
                        <ListMain>
                            <span>#{pack.id}</span>
                        </ListMain>
                        <ListMain>
                            <span>{pack.recipient.name}</span>
                        </ListMain>
                        <ListMain>
                            <Picture
                                name={pack.name}
                                src={
                                    pack.courier.avatar &&
                                    pack.courier.avatar.url
                                }
                            />
                            <span>{pack.courier.name}</span>
                        </ListMain>
                        <ListMain>
                            <span>{pack.recipient.city}</span>
                        </ListMain>
                        <ListMain>
                            <span>{pack.recipient.state}</span>
                        </ListMain>
                        <ListMain>
                            <Status status={pack.status}>
                                <figure />
                                {pack.status}
                            </Status>
                        </ListMain>

                        <ListActions>
                            <DropdownMenu inPackages />
                        </ListActions>
                    </>
                ))}
            </List>
        </>
    );
}

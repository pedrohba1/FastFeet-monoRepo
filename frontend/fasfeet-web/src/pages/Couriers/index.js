import React, { useEffect, useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useDispatch } from 'react-redux';

import {
    Title,
    Buttons,
    RegisterButton,
    SearchIcon,
    Search,
    ListHeader,
    ListMain,
    ListActions,
    Footer,
} from '~/styles/default';

import { changeTab } from '~/store/modules/user/actions';

import { List } from './styles';

import api from '~/services/api';
import DropdownMenu from '~/components/DropdownMenu';
import Picture from '~/components/Picture';

export default function Couriers() {
    const [couriers, setCouriers] = useState([]);
    const [input, setInput] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

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
        // eslint-disable-next-line
    }, [page]);

    function handleEnterPress(e) {
        if (e.which === 13 || e.keyCode === 13) {
            searchCouriers();
        }
    }

    function handleAddPage() {
        setPage(page + 1);
    }

    function handleSubtractPage() {
        setPage(page - 1);
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
                <RegisterButton
                    onClick={() => {
                        dispatch(changeTab('register/courier'));
                    }}
                >
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
                            <span>{courier.name}</span>
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

            <Footer>
                <button
                    disabled={page === 1}
                    type="button"
                    onClick={handleSubtractPage}
                >
                    <MdChevronLeft size={36} color="#444" />
                </button>

                <span>{page}</span>

                <button type="button" onClick={handleAddPage}>
                    <MdChevronRight size={36} color="#444" />
                </button>
            </Footer>
        </>
    );
}

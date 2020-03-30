import React, { useState, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import ProblemModal from '~/components/ProblemModal';

import {
    Title,
    Buttons,
    Search,
    ListHeader,
    ListMain,
    ListActions,
    Footer,
} from '~/styles/default';
import DropdownMenu from '~/components/DropdownMenu';

import { List, Description } from './styles';
import api from '~/services/api';

export default function Problems() {
    const [problems, setProblems] = useState([]);
    const [input, setInput] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [modalContent, setModalContent] = useState({});
    const [isModalOpen, setModalOpen] = useState(false);

    function handleAddPage() {
        setPage(page + 1);
    }

    function handleSubtractPage() {
        setPage(page - 1);
    }

    async function searchProblems() {
        setLoading(true);
        const response = await api.get('problems', {
            params: {
                page,
            },
        });

        response.data.map(courier => {
            courier.id = courier.id < 10 ? `0${courier.id}` : courier.id;
            return courier;
        });
        setProblems(response.data);
        setLoading(false);
    }

    useEffect(() => {
        searchProblems();
        // eslint-disable-next-line
    }, [page]);

    function handleEnterPress(e) {
        if (e.which === 13 || e.keyCode === 13) {
            searchProblems();
        }
    }

    function handleRequestOpen(problem) {
        setModalOpen(true);
        setModalContent({ description: problem.description });
    }

    function handleRequestClose() {
        setModalOpen(false);
    }
    return (
        <>
            <ProblemModal
                closeFunc={handleRequestClose}
                isOpen={isModalOpen}
                problemData={modalContent}
            />

            <Title>Problemas na entrega</Title>

            <Buttons>
                <Search
                    loading={loading}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyUp={handleEnterPress}
                    placeholder="buscar por problemas"
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
                        <ListMain key={String(problem.id)}>
                            <span>#{problem.id}</span>
                        </ListMain>
                        <ListMain>
                            <Description>{problem.description}</Description>
                        </ListMain>
                        <ListActions>
                            <DropdownMenu
                                inProblems
                                data={problem}
                                openModalFunction={handleRequestOpen}
                            />
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

import React, { useState, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import api from '~/services/api';
import PackageModal from '~/components/PackageModal';
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
import {
    List,
    Status,
    HorizontalContainer,
    VerticalContainer,
    CheckBox,
} from './styles';

import Picture from '~/components/Picture';
import DropdownMenu from '~/components/DropdownMenu';
import { changeTab } from '~/store/modules/user/actions';
import { passEditData } from '~/store/modules/package/actions';

export default function Packages() {
    const [onlyWithProblems, setOnlyWithProblems] = useState(false);
    const [packages, setPackages] = useState([]);
    const [input, setInput] = useState('');
    const [page, setPage] = useState(1);
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({});
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    function handleAddPage() {
        setPage(page + 1);
    }

    function handleSubtractPage() {
        setPage(page - 1);
    }

    async function searchPackages() {
        setLoading(true);

        if (onlyWithProblems) {
            const response = await api.get('problems', {
                params: {
                    page,
                    list_packages: 'yes',
                },
            });

            const newArr = [];
            response.data.forEach(item => {
                newArr.push({
                    ...item.package,
                });
            });

            newArr.map(pack => {
                pack.idDisplay = pack.id < 10 ? `0${pack.id}` : pack.id;

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

            console.tron.log('com problemas', newArr);

            setPackages(newArr);
            setLoading(false);
            return;
        }

        const response = await api.get('packages', {
            params: {
                page,
                product: input,
            },
        });

        console.tron.log('sem problemas', response.data);

        response.data.map(pack => {
            pack.idDisplay = pack.id < 10 ? `0${pack.id}` : pack.id;

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
        // eslint-disable-next-line
    }, [page, onlyWithProblems]);

    function handleEnterPress(e) {
        if (e.which === 13 || e.keyCode === 13) {
            searchPackages();
        }
    }

    function handleRequestClose() {
        setModalOpen(false);
    }

    function handleEdit(data) {
        console.tron.log(data);

        const obj = {
            package_id: data.id,
            selectedCourier: {
                value: data.courier.id,
                label: `${data.courier.name}, (${data.courier.email})`,
            },
            selectedRecipient: {
                value: data.recipient.id,
                label: data.recipient.name,
            },
            product: data.product,
        };

        dispatch(passEditData(obj));
        dispatch(changeTab('edit/package'));
    }

    function handleRequestOpen(pack) {
        setModalOpen(true);

        const { recipient, end_date, start_date, signature } = pack;

        const packData = {
            state: recipient.state,
            city: recipient.city,
            address: recipient.address,
            address_number: recipient.address_number,
            address_complement: recipient.address_complement,
            cep: recipient.cep,
            start_date,
            end_date,
            signature_url: signature === null ? null : signature.url,
        };

        setModalContent(packData);
    }

    async function handleDelete(packId) {
        try {
            const response = await api.delete(`packages/${packId}`);
            if (response.status === 200) {
                toast.success('pacote deletado com sucesso');
            }
        } catch (error) {
            if (error.response.status === 461) {
                toast.error(error.response.data.error, { autoClose: 8000 });
            }
        }
    }

    return (
        <>
            <PackageModal
                closeFunc={handleRequestClose}
                isOpen={isModalOpen}
                packData={modalContent}
            />
            <Title>Gerenciando encomendas</Title>

            <Buttons>
                <VerticalContainer>
                    <Search
                        loading={loading}
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyUp={handleEnterPress}
                        placeholder="buscar por entregadores"
                        iconPosition="left"
                    />

                    <HorizontalContainer style={{ marginTop: 10 }}>
                        <span>buscar apenas encomendas com problemas: </span>
                        <CheckBox
                            onClick={() =>
                                setOnlyWithProblems(!onlyWithProblems)
                            }
                            checked={onlyWithProblems}
                        />
                    </HorizontalContainer>
                </VerticalContainer>
                <RegisterButton
                    onClick={() => {
                        dispatch(changeTab('register/package'));
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
            </List>

            {packages.map(pack => (
                <List key={String(pack.id)}>
                    <ListMain>
                        <span>#{pack.idDisplay}</span>
                    </ListMain>
                    <ListMain>
                        <span>{pack.recipient.name}</span>
                    </ListMain>
                    <ListMain>
                        <HorizontalContainer>
                            <Picture
                                name={pack.courier.name}
                                src={
                                    pack.courier.avatar &&
                                    pack.courier.avatar.url
                                }
                            />
                            <span>{pack.courier.name}</span>
                        </HorizontalContainer>
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
                        <DropdownMenu
                            inPackages
                            dataForView={pack}
                            dataForEdit={pack}
                            editFunction={handleEdit}
                            dataForDelete={pack.id}
                            deleteFunction={handleDelete}
                            openModalFunction={handleRequestOpen}
                        />
                    </ListActions>
                </List>
            ))}

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

import React, { useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NumericInput from 'react-numeric-input';
import Message from './Message';
import Loader from './Loader';
import { deleteCard, searchCards } from '../actions/cardActions';

const CardList = ({ history, deckId }) => {
    const dispatch = useDispatch();

    // const cardsInDeck = useSelector((state) => state.cardsInDeck);
    // const { loading, error, cards } = cardsInDeck;
    const cardSearch = useSelector((state) => state.cardSearch);
    const { loading, error, cards } = cardSearch;

    const cardDelete = useSelector((state) => state.cardDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = cardDelete;

    useEffect(() => {
        // dispatch(getCardsInDeck(deckId));
        dispatch(searchCards({ deckId: deckId }));
    }, [dispatch, history, successDelete, deckId]);

    const deleteCardHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteCard(id));
        }
    };

    const sortCards = (a, b) => {
        let typeOrder = ['C', 'P', 'A', 'E', 'I', 'S', 'L', 'B'];
        let ordering = {};

        for (let i = 0; i < typeOrder.length; i++) {
            ordering[typeOrder[i]] = i;
        }

        // Sort by card type, then by CMC, then by name
        let n1 = a.name.toLowerCase();
        let n2 = b.name.toLowerCase();
        let t1 = a.type;
        let t2 = b.type;
        let c1 = a.cmc;
        let c2 = b.cmc;

        if (a.isCommander) return -1;
        if (b.isCommander) return 1;
        if (ordering[t1] < ordering[t2]) return -1;
        if (ordering[t1] > ordering[t2]) return 1;
        if (c1 < c2) return -1;
        if (c1 > c2) return 1;
        if (n1 < n2) return -1;
        if (n1 > n2) return 1;
        return 0;
    };

    return (
        <>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Table striped borderless hover responsive size='sm'>
                    <thead>
                        <tr>
                            <th className='center_column'>
                                <Link
                                    to={`/decks/${deckId}/cards`}
                                    style={{ padding: '.3rem' }}
                                >
                                    <Button
                                        className='btn btn-sm'
                                        variant='success'
                                    >
                                        <i className='fas fa-plus'></i>
                                    </Button>
                                </Link>
                            </th>
                            <th className='center_column pb-2'>
                                {cards.reduce((acc, cur) => acc + cur.qty, 0)}
                            </th>
                            <th className='pb-2'>Name</th>
                            <th className='center_column pb-2'>Type</th>
                            <th className='center_column pb-2'>Edition</th>
                            <th className='center_column pb-2'>CMC</th>
                            <th className='center_column pb-2'>Foil?</th>
                            <th className='center_column pb-2'>
                                <i className='fas fa-crown'></i>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...cards].sort(sortCards).map((card) => (
                            <tr key={card._id}>
                                <td className='center_column trash_column'>
                                    <Button
                                        variant='danger'
                                        className='btn-sm'
                                        onClick={() =>
                                            deleteCardHandler(card._id)
                                        }
                                    >
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                                <td className='center_column pt-2'>
                                    <NumericInput
                                        min={1}
                                        max={99}
                                        value={card.qty}
                                        // onChange={(e) => setQty(e.target.value)}
                                    />
                                </td>
                                <td className='pt-2'>
                                    <Link
                                        to={`/decks/${deckId}/cards/${card._id}`}
                                    >
                                        {card.name}
                                    </Link>
                                </td>
                                <td className='center_column pt-2'>
                                    {card.type}
                                </td>
                                <td className='center_column pt-2'>
                                    {card.edition.toUpperCase()}
                                </td>
                                <td className='center_column pt-2'>
                                    {card.cmc}
                                </td>
                                <td className='center_column pt-2'>
                                    <input
                                        name='is_foil'
                                        type='checkbox'
                                        checked={card.isFoil}
                                    />
                                </td>
                                <td className='center_column pt-2'>
                                    <input
                                        name='is_commander'
                                        type='checkbox'
                                        checked={card.isCommander}
                                        // onChange=
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default CardList;

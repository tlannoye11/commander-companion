import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import DeckRow from '../components/DeckRow';
import { listDecks, createDeck } from '../actions/deckActions';
import { DECK_CREATE_RESET } from '../constants/deckConstants';

const HomeScreen = ({ history }) => {
    const dispatch = useDispatch();

    const deckList = useSelector((state) => state.deckList);
    const { loading, error, decks } = deckList;

    const deckDelete = useSelector((state) => state.deckDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = deckDelete;

    const deckCreate = useSelector((state) => state.deckCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        deck: createdDeck,
    } = deckCreate;

    useEffect(() => {
        dispatch({ type: DECK_CREATE_RESET });

        if (successCreate) {
            //history.push(`/decks/${createdDeck._id}`);
            // try not to move when a record is created
        } else {
            dispatch(listDecks());
        }
    }, [dispatch, history, successDelete, successCreate, createdDeck]);

    const createDeckHandler = () => {
        dispatch(createDeck());
    };

    return (
        <div>
            <h1>My Deck Box</h1>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Table striped bordered hover responsive size='sm'>
                    <thead>
                        <tr>
                            <th>
                                <Button
                                    className='btn btn-sm'
                                    variant='success'
                                    onClick={createDeckHandler}
                                >
                                    <i className='fas fa-plus'></i>
                                </Button>
                            </th>
                            <th className='pb-2'>Name</th>
                            <th className='pb-2'>Colors</th>
                            <th className='pb-2 center-column'>Count</th>
                            <th className='pb-2 center-column'>Foils</th>
                            <th className='pb-2 center-column'>Avg CMC</th>
                            <th className='pb-2'>Theme</th>
                            <th className='pb-2'>Sleeves</th>
                            <th className='pb-2'>Basic Lands</th>
                        </tr>
                    </thead>
                    <tbody>
                        {decks.map((deck) => (
                            <tr key={deck._id}>
                                <DeckRow deck={deck} />
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default HomeScreen;

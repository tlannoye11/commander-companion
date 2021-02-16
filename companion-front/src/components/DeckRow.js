import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteDeck } from '../actions/deckActions';
import Loader from './Loader';
import Message from './Message';
import SleeveColor from './SleeveColor';

const DeckRow = ({ deck }) => {
    const dispatch = useDispatch();

    const cardSearch = useSelector((state) => state.cardSearch);
    const { loading, error, cards } = cardSearch;

    const deckDelete = useSelector((state) => state.deckDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = deckDelete;

    useEffect(() => {
        // Get all the stats for the deck row here.
    }, [dispatch, successDelete]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteDeck(id));
        }
    };

    return (
        <>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            <td>
                <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(deck._id)}
                >
                    <i className='fas fa-trash'></i>
                </Button>
            </td>
            <td className='pt-2'>
                <Link to={`/decks/${deck._id}`}>
                    <strong>{deck.name}</strong>
                </Link>
            </td>
            {deck.id}
            <td className='pt-2'>Deck colors</td>
            <td className='center-column pt-2'>
                Spells n Lands
                {/* {deck.spell_count + deck.land_count} */}
            </td>
            <td className='center-column pt-2'>
                Foil count
                {/* {deck.foil_count} */}
            </td>
            <td className='center-column pt-2'>
                Avg CMC
                {/* {deck.avg_cmc} */}
            </td>
            <td className='pt-2'>{deck.theme}</td>
            <td className='pt-2'>
                <SleeveColor sleeveColor={deck.sleeveColor} />
            </td>
            <td className='pt-2'>Basics</td>
        </>
    );
};

export default DeckRow;

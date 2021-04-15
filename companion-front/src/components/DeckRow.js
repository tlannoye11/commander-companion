import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchCards } from '../actions/cardActions';
import { deleteDeck } from '../actions/deckActions';
import SleeveColor from './SleeveColor';

const DeckRow = ({ deck }) => {
    const dispatch = useDispatch();

    const [sleeveColor, setSleeveColor] = useState(deck.sleeveColor);

    const cardSearch = useSelector((state) => state.cardSearch);
    const { loading, error, cards } = cardSearch;

    useEffect(() => {
        // Get all the stats for the deck row here.
        // Find the deck's color identity based on the combined color identity of all of its commanders.
    }, [dispatch]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteDeck(id));
        }
    };

    return (
        <>
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
            <td className='pt-2'>
                {cards &&
                    cards
                        .filter((card) => card.deckId === deck._id)
                        .map((card) => <span>{card.colorIdentity}</span>)}
            </td>
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
                <SleeveColor
                    sleeveColor={sleeveColor}
                    setSleeveColor={setSleeveColor}
                />
            </td>
            <td className='pt-2'>Basics</td>
        </>
    );
};

export default DeckRow;

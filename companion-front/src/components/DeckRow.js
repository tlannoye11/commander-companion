import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteDeck } from '../actions/deckActions';
import SleeveColor from './SleeveColor';

const DeckRow = ({ deck }) => {
    const dispatch = useDispatch();

    const [sleeveColor, setSleeveColor] = useState(deck.sleeveColor);

    const cardSearch = useSelector((state) => state.cardSearch);
    const { cards } = cardSearch;

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteDeck(id));
        }
    };

    const getSpellCount = () => {
        if (cards) {
            let spells = cards.filter(
                (card) =>
                    card.deckId === deck._id &&
                    !(card.type.includes('L') || card.type.includes('B'))
            );

            return spells
                ? spells.reduce((total, cur) => {
                      return total + cur.qty;
                  }, 0)
                : 0;
        }
    };

    const getLandCount = () => {
        if (cards) {
            let lands = cards.filter(
                (card) =>
                    card.deckId === deck._id &&
                    (card.type.includes('L') || card.type.includes('B'))
            );

            return lands
                ? lands.reduce((total, cur) => {
                      return total + cur.qty;
                  }, 0)
                : 0;
        }
    };

    const getFoilCount = () => {
        if (cards) {
            let foils = cards.filter(
                (card) => card.deckId === deck._id && card.isFoil
            );

            return foils
                ? foils.reduce((total, cur) => {
                      return total + cur.qty;
                  }, 0)
                : 0;
        }
    };

    const getAverageCMC = () => {
        if (cards) {
            let cardsInDeck = cards.filter((card) => card.deckId === deck._id);
            let temp = cardsInDeck.reduce((total, cur) => {
                console.log('cur', cur);
                return total + cur.cmc;
            }, 0);

            console.log(temp);

            return cardsInDeck
                ? (
                      Math.round(
                          (cardsInDeck.reduce((total, cur) => {
                              return total + cur.cmc;
                          }, 0) /
                              cardsInDeck.length) *
                              100
                      ) / 100
                  ).toFixed(2)
                : 0;
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
                        .filter(
                            (card) =>
                                card.deckId === deck._id &&
                                card.isCommander === true
                        )
                        .map((card) => (
                            <span key={card._id}>{card.colorIdentity}</span>
                        ))}
            </td>
            <td className='center-column pt-2'>
                {getSpellCount()}/{getLandCount()}
            </td>
            <td className='center-column pt-2'>{getFoilCount()}</td>
            <td className='center-column pt-2'>{getAverageCMC()}</td>
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

import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCardScryfall } from '../actions/cardActions';
import Loader from './Loader';
import Message from './Message';

const CardDisplay = ({ name, edition }) => {
    const [image, setImage] = useState('');
    const [uri, setUri] = useState('');

    const dispatch = useDispatch();

    const cardScryfall = useSelector((state) => state.cardScryfall);
    const { loading, error, cardData } = cardScryfall;

    useEffect(() => {
        if (name && edition) {
            if (!cardData) {
                dispatch(getCardScryfall(name, edition));
            } else {
                setImage(cardData.image_uris.small);
                setUri(cardData.scryfall_uri);
            }
        }
    }, [dispatch, name, edition, cardData]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                // <Card className='my-3 p-3 rounded'>
                <Card
                    border='white'
                    className='text-center'
                    style={{ maxWidth: '240px' }}
                >
                    <Card.Img src={image} variant='top' />
                    <Card.Body>
                        {/* <Card.Title as='div'>
                            <strong>{name}</strong>
                        </Card.Title> */}
                        {/* <Card.Text as='div'>{edition}</Card.Text> */}
                        <Card.Link href={uri}>Scryfall</Card.Link>
                    </Card.Body>
                </Card>
            )}
        </>
    );
};

export default CardDisplay;

import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getScryfallCard } from '../actions/scryfallActions';
import { SCRYFALL_CARD_RESET } from '../constants/scryfallConstants';
import Loader from './Loader';
import Message from './Message';

const CardDisplay = ({ name, edition, collectorNumber }) => {
	const [image, setImage] = useState('');
	const [uri, setUri] = useState('');

	const dispatch = useDispatch();

	const scryfallCard = useSelector((state) => state.scryfallCard);
	const { loading, error, scryData } = scryfallCard;

	useEffect(() => {
		if (name && edition) {
			if (!scryData) {
				dispatch({ type: SCRYFALL_CARD_RESET });
				dispatch(getScryfallCard(name, edition, collectorNumber));
			} else {
				setImage(scryData.image_uris.small);
				setUri(scryData.scryfall_uri);
			}
		}
	}, [dispatch, name, edition, collectorNumber, scryData]);

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Card
					border='white'
					className='text-center'
					style={{ maxWidth: '290px' }}>
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

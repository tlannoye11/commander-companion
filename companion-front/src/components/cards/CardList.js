import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Message';
import Loader from '../Loader';
import { getCardsInDeck } from '../../actions/cardActions';

const CardList = ({ deckId }) => {
	// const [deckId, setDeckId] = useState('');
	// const [scryfallId, setScryfallId] = useState('');
	// const [qty, setQty] = useState(0);
	// const [name, setName] = useState('');
	// const [type, setType] = useState('');
	// const [set, setSet] = useState('');
	// const [cmc, setCMC] = useState(0);
	// const [isFoil, setIsFoil] = useState(false);
	// const [isCommander, setIsCommander] = useState(false);

	const dispatch = useDispatch();

	const cardsInDeck = useSelector((state) => state.cardsInDeck);
	const { loading, error, cards } = cardsInDeck;

	useEffect(() => {
		dispatch(getCardsInDeck(deckId));
	}, [dispatch, deckId]);

	return (
		<>
			<h2>Cards in Deck</h2>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Table striped bordered hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>##</th>
							<th>NAME</th>
							<th>TYPE</th>
							<th>SET</th>
							<th>CMC</th>
							<th>Foil?</th>
							<th>Commander?</th>
						</tr>
					</thead>
					<tbody>
						{cards.map((card) => (
							<tr key={card._id}>
								<td>{card.qty}</td>
								<td>{card.name}</td>
								<td>{card.type}</td>
								<td>{card.set}</td>
								<td>{card.cmc}</td>
								<td>{card.isFoil}</td>
								<td>{card.isCommander}</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default CardList;

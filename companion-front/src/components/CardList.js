import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from './Message';
import Loader from './Loader';
import { createCard, deleteCard, getCards } from '../actions/cardActions';
import NumericInput from 'react-numeric-input';
import { CARD_CREATE_RESET } from '../constants/cardConstants';
import { Link } from 'react-router-dom';

const CardList = ({ history, deckId }) => {
	const dispatch = useDispatch();

	const cardList = useSelector((state) => state.cardList);
	const { loading, error, cards } = cardList;

	const cardDelete = useSelector((state) => state.cardDelete);
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = cardDelete;

	const cardCreate = useSelector((state) => state.cardCreate);
	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
		card: createdCard,
	} = cardCreate;

	useEffect(() => {
		dispatch({ type: CARD_CREATE_RESET });

		if (!successCreate) {
			dispatch(getCards(deckId));
		}
	}, [dispatch, history, successDelete, successCreate, createdCard, deckId]);

	const deleteCardHandler = (id) => {
		if (window.confirm('Are you sure')) {
			dispatch(deleteCard(id));
		}
	};

	const addToDeckHandler = (deckId) => {
		console.log('add handler');
		dispatch(createCard(deckId));
	};

	return (
		<>
			{/* <h2>Cards in Deck</h2> */}
			{loadingDelete && <Loader />}
			{errorDelete && <Message variant='danger'>{errorDelete}</Message>}
			{loadingCreate && <Loader />}
			{errorCreate && <Message variant='danger'>{errorCreate}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Table striped borderless hover responsive size='sm'>
					<thead>
						<tr>
							<th className='center_column'>
								<Button
									variant='info'
									// size='sm'
									className='btn btn-sm py-0 px-1 mt-1'
									onClick={() => addToDeckHandler(deckId)}>
									<i className='fas fa-plus'></i>
								</Button>
							</th>
							<th className='center_column'>{cards.length}</th>
							<th>Name</th>
							<th className='center_column'>Type</th>
							<th className='center_column'>Edition</th>
							<th className='center_column'>CMC</th>
							<th className='center_column'>Foil?</th>
							<th className='center_column'>
								<i className='fas fa-crown'></i>
							</th>
						</tr>
					</thead>
					<tbody>
						{cards.map((card) => (
							<tr key={card._id}>
								<td className='center_column'>
									<Button
										variant='danger'
										// size='sm'
										className='btn btn-sm'
										onClick={() =>
											deleteCardHandler(card._id)
										}>
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
									<Link to={`/cards/${card._id}`}>
										{card.name}
									</Link>
								</td>
								<td className='center_column pt-2'>
									{card.type}
								</td>
								<td className='center_column pt-2'>
									{card.edition}
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

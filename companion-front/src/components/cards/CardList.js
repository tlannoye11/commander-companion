import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Message';
import Loader from '../Loader';
import { createCard, deleteCard, getCards } from '../../actions/cardActions';
import NumericInput from 'react-numeric-input';
import { CARD_CREATE_RESET } from '../../constants/cardConstants';

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
			<h2>Cards in Deck</h2>
			{loadingDelete && <Loader />}
			{errorDelete && <Message variant='danger'>{errorDelete}</Message>}
			{loadingCreate && <Loader />}
			{errorCreate && <Message variant='danger'>{errorCreate}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Table striped bordered hover responsive className='table-sm'>
					<thead>
						<tr>
							<th className='center_column'>
								<Button
									size='sm'
									variant='info'
									onClick={() => addToDeckHandler(deckId)}>
									<i className='fas fa-plus'></i>
								</Button>
							</th>
							<th>Name</th>
							<th className='center_column'>Type</th>
							<th className='center_column'>Edition</th>
							<th className='center_column'>CMC</th>
							<th className='center_column'>Foil?</th>
							<th className='center_column'>Commander?</th>
						</tr>
					</thead>
					<tbody>
						{cards.map((card) => (
							<tr key={card._id}>
								<td className='center_column'>
									<NumericInput
										min={1}
										max={100}
										value={card.qty}
										// onChange={(e) => setQty(e.target.value)}
									/>
								</td>
								<td>{card.name}</td>
								<td className='center_column'>{card.type}</td>
								<td className='center_column'>
									{card.edition}
								</td>
								<td className='center_column'>{card.cmc}</td>
								<td className='center_column'>
									<input
										name='is_foil'
										type='checkbox'
										checked={card.isFoil}
									/>
								</td>
								<td className='center_column'>
									<input
										name='is_commander'
										type='checkbox'
										checked={card.isCommander}
										// onChange=
									/>
								</td>
								<td>
									<Button
										variant='danger'
										className='btn-sm'
										onClick={() =>
											deleteCardHandler(card._id)
										}>
										<i className='fas fa-trash'></i>
									</Button>
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

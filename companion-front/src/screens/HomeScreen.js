import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table } from 'react-bootstrap';
import DeckRow from '../components/decks/DeckRow';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listDecks } from '../actions/deckActions';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
	const dispatch = useDispatch();

	const deckList = useSelector((state) => state.deckList);
	const { loading, error, decks } = deckList;

	useEffect(() => {
		dispatch(listDecks());
	}, [dispatch]);

	return (
		<div>
			<h1>My Deck Box</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Table>
					<thead>
						<tr>
							<th>
								<Link to='/create'>
									<Button size='sm' variant='info'>
										<i className='fas fa-plus'></i>
									</Button>
								</Link>
							</th>
							<th>Name</th>
							<th>Colors</th>
							<th className='center-column'>Count</th>
							<th className='center-column'>Foils</th>
							<th className='center-column'>Avg CMC</th>
							<th>Theme</th>
							<th>Sleeves</th>
							<th>Basic Lands</th>
						</tr>
					</thead>
					<tbody>
						{decks.map((deck) => (
							<DeckRow key={deck._id} deck={deck} />
						))}
					</tbody>
				</Table>
			)}
		</div>
	);
};

export default HomeScreen;

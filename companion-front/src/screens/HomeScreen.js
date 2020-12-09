import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listDecks, deleteDeck, createDeck } from '../actions/deckActions';
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

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		dispatch({ type: DECK_CREATE_RESET });

		if (!userInfo.isAdmin) {
			history.push('/login');
		}

		if (successCreate) {
			history.push(`/deck/${createdDeck._id}/edit`);
		} else {
			dispatch(listDecks());
		}
	}, [
		dispatch,
		history,
		userInfo,
		successDelete,
		successCreate,
		createdDeck,
	]);

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteDeck(id));
		}
	};

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
				<Table striped bordered hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>
								<Button size='sm' onClick={createDeckHandler}>
									<i className='fas fa-plus'></i>
								</Button>
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
							<tr key={deck._id}>
								<td>
									<Link to={`/deck/${deck._id}`}>
										<strong>{deck.name}</strong>
									</Link>
								</td>
								{deck.id}
								<td>Colors here</td>
								<td className='center-column'>
									Spell + Land count
									{/* {deck.spell_count + deck.land_count} */}
								</td>
								<td className='center-column'>
									Foil count
									{/* {deck.foil_count} */}
								</td>
								<td className='center-column'>
									Avg CMC
									{/* {deck.avg_cmc} */}
								</td>
								<td>{/* {deck.theme} */}</td>
								<td>{/* {deck.sleeve_color} */}</td>
								{/* <td>Basics{deck.basic_lands}</td> */}
								<td>
									<Button
										variant='danger'
										className='btn-sm'
										onClick={() => deleteHandler(deck._id)}>
										<i className='fas fa-trash'></i>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</div>
	);
};

export default HomeScreen;

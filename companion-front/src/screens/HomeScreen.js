import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dropdown, DropdownButton, Table } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listDecks, deleteDeck, createDeck } from '../actions/deckActions';
import { DECK_CREATE_RESET } from '../constants/deckConstants';

const HomeScreen = ({ history }) => {
	const [color, setColor] = useState('');

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

	useEffect(() => {
		dispatch({ type: DECK_CREATE_RESET });

		if (successCreate) {
			//history.push(`/decks/${createdDeck._id}`);
			// try not to move when a record is created
		} else {
			dispatch(listDecks());
		}
	}, [dispatch, history, successDelete, successCreate, createdDeck]);

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteDeck(id));
		}
	};

	const createDeckHandler = () => {
		dispatch(createDeck());
	};

	const sleeveColors = [
		'red',
		'orange',
		'yellow',
		'green',
		'cyan',
		'blue',
		'purple',
		'white',
		'gray',
		'black',
	];

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
				<Table striped bordered hover responsive size='sm'>
					<thead>
						<tr>
							<th>
								<Button
									className='btn btn-sm'
									variant='success'
									onClick={createDeckHandler}>
									<i className='fas fa-plus'></i>
								</Button>
							</th>
							<th className='pb-2'>Name</th>
							<th className='pb-2'>Colors</th>
							<th className='pb-2 center-column'>Count</th>
							<th className='pb-2 center-column'>Foils</th>
							<th className='pb-2 center-column'>Avg CMC</th>
							<th className='pb-2'>Theme</th>
							<th className='pb-2'>Sleeves</th>
							<th className='pb-2'>Basic Lands</th>
						</tr>
					</thead>
					<tbody>
						{decks.map((deck) => (
							<tr key={deck._id}>
								<td>
									<Button
										variant='danger'
										className='btn-sm'
										onClick={() => deleteHandler(deck._id)}>
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
									<DropdownButton
										id='deck-color-dropdown'
										title={deck.sleeveColor}
										size='sm'
										onSelect={(e) => setColor(e)}>
										{sleeveColors.map((color, i) => (
											<Dropdown.Item
												id={color}
												eventKey={i}
												key={i}>
												<div
													className={`sleeve-color ${color}`}
													style={{
														height: 20,
														width: 20,
														backgroundColor: color,
														borderRadius: '50%',
														display: 'inline-block',
														float: 'left',
													}}></div>
											</Dropdown.Item>
										))}
									</DropdownButton>
								</td>
								<td className='pt-2'>Basics</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</div>
	);
};

export default HomeScreen;

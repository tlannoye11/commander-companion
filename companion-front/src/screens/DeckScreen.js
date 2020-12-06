import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getDeckDetails, updateDeck } from '../actions/deckActions';
import { Button, Form } from 'react-bootstrap';
import {
	DECK_DETAILS_RESET,
	DECK_UPDATE_RESET,
} from '../constants/deckConstants';

const DeckScreen = ({ history, match }) => {
	const deckId = match.params.id;

	const [name, setName] = useState('');
	const [theme, setTheme] = useState('');
	const [sleeveColor, setSleeveColor] = useState('');

	const dispatch = useDispatch();

	const deckDetails = useSelector((state) => state.deckDetails);
	const { loading, error, deck } = deckDetails;

	const deckUpdate = useSelector((state) => state.deckUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = deckUpdate;

	useEffect(() => {
		if (successUpdate) {
			console.log('update successful');

			dispatch({ type: DECK_UPDATE_RESET });
			dispatch({ type: DECK_DETAILS_RESET });

			console.log('after', deck);

			history.push('/');
		} else {
			console.log('else deck', deck);

			if (!deck.name || deck._id !== deckId) {
				dispatch(getDeckDetails(deckId));
			} else {
				setName(deck.name);
				setTheme(deck.theme);
				setSleeveColor(deck.sleeveColor);
			}
		}
	}, [dispatch, history, deckId, deck, successUpdate]);

	const submitDetailsHandler = (e) => {
		e.preventDefault();

		console.log('submit', sleeveColor);
		dispatch(
			updateDeck({
				_id: deckId,
				name,
				theme,
				sleeveColor,
			})
		);
	};

	return (
		<>
			<h1>Deck Screen!</h1>
			{loadingUpdate && <Loader />}
			{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Form inline onSubmit={submitDetailsHandler}>
					<Link to='/'>
						<Button variant='info' className='btn btn-sm'>
							<i className='fas fa-arrow-left'></i>
						</Button>
					</Link>

					<Form.Group controlId='name'>
						<Form.Label className='px-2'>Deck</Form.Label>
						<Form.Control
							type='text'
							placeholder='Deck Name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label
							htmlFor='inlineFormInputDeckTheme'
							className='px-2'>
							Theme
						</Form.Label>
						<Form.Control
							type='text'
							id='inlineFormInputDeckTheme'
							placeholder='Theme'
							value={theme}
							onChange={(e) => setTheme(e.target.value)}
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label
							htmlFor='inlineFormInputDeckSleeves'
							className='px-2'>
							Sleeves
						</Form.Label>
						<Form.Control
							type='text'
							id='inlineFormInputDeckSleeves'
							placeholder='Sleeves'
							value={sleeveColor}
							onChange={(e) => setSleeveColor(e.target.value)}
						/>
					</Form.Group>

					<Button
						type='submit'
						className='mx-2 btn btn-primary btn-sm'>
						<i className='fas fa-save'></i>
					</Button>
				</Form>
			)}
		</>
	);
};

export default DeckScreen;

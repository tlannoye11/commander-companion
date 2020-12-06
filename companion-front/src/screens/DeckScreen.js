import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { deckUpdateDetails, getDeckDetails } from '../actions/deckActions';
import { Button, Form } from 'react-bootstrap';

const DeckScreen = ({ history, match }) => {
	const [deckName, setDeckName] = useState('');
	const [deckTheme, setDeckTheme] = useState('');
	const [deckSleeveColor, setDeckSleeveColor] = useState('');

	const dispatch = useDispatch();

	const deckDetails = useSelector((state) => state.deckDetails);
	const { loading, error, deck } = deckDetails;

	const submitDetailsHandler = (e) => {
		e.preventDefault();

		dispatch(
			deckUpdateDetails({
				id: deck._id,
				deckName,
				deckTheme,
				deckSleeveColor,
			})
		);
	};

	return (
		<div>
			<h1>Deck Screen!</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<header>
					<Form inline onSubmit={submitDetailsHandler}>
						<Link to='/'>
							<Button
								size='sm'
								variant='info'
								className='btn btn-sm'>
								<i className='fas fa-arrow-left'></i>
							</Button>
						</Link>

						<Form.Group controlId='deckName'>
							<Form.Label className='px-2'>Deck</Form.Label>
							<Form.Control
								type='text'
								placeholder='Deck Name'
								value={deck.deck_name}
								onChange={(e) => setDeckName(e.target.value)}
								// onChange={this.props.onChangeDeckName}
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
								value={deck.deck_theme || ''}
								onChange={(e) => setDeckTheme(e.target.value)}
								// onChange={this.props.onChangeDeckTheme}
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
								value={deck.deck_sleeve_color || ''}
								onChange={(e) =>
									setDeckSleeveColor(e.target.value)
								}
								// onChange={this.props.onChangeDeckSleeveColor}
							/>
						</Form.Group>

						<Button
							type='submit'
							className='mx-2 btn btn-primary btn-sm'
							// disabled={!isEnabled}
						>
							{/* <i
							className={
								this.props.deck_header_changes
									? 'fas fa-save'
									: 'fas fa-ban'
							}></i> */}
							<i className='fas fa-save'></i>
						</Button>
					</Form>
				</header>
			)}
		</div>
	);
};

export default DeckScreen;

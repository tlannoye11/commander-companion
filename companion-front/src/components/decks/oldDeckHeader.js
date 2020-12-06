import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDeckDetails, deckUpdateDetails } from '../../actions/deckActions';

const DeckHeader = ({ deck }) => {
	const [deckName, setDeckName] = useState('');
	const [deckTheme, setDeckTheme] = useState('');
	const [deckSleeves, setDeckSleeves] = useState('');

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		console.log('Submitted!');

		dispatch(
			deckUpdateDetails({
				id: deck._id,
				deckName,
				deckTheme,
				deckSleeves,
			})
		);
	};

	console.log('deck header data', deck);
	console.log('deck header name', deckName);

	return (
		<header>
			<Form inline onSubmit={submitHandler}>
				<Link to='/'>
					<Button size='sm' variant='info' className='btn btn-sm'>
						<i className='fas fa-arrow-left'></i>
					</Button>
				</Link>

				<Form.Group controlId='deckName'>
					<Form.Label className='px-2'>Deck</Form.Label>
					<Form.Control
						type='text'
						placeholder='Deck Name'
						value={deckName}
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
						onChange={(e) => setDeckSleeves(e.target.value)}
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
	);
};

export default DeckHeader;

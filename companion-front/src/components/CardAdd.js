import React, { useState } from 'react';
import { Button, ListGroup, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getScryfallList } from '../actions/scryfallActions';
import {
	SCRYFALL_LIST_RESET,
	SCRYFALL_NAMED_RESET,
} from '../constants/scryfallConstants';
import CardAddBody from './CardAddBody';
import Loader from './Loader';
import Message from './Message';

const CardAdd = ({ deckId }) => {
	const [show, setShow] = useState(false);
	const [cardSearch, setCardSearch] = useState('');
	const [name, setName] = useState('');

	const dispatch = useDispatch();

	const scryfallList = useSelector((state) => state.scryfallList);
	const { loading: loadingList, error: errorList, scryList } = scryfallList;

	const handleClose = () => setShow(false);
	const handleOpen = () => setShow(true);
	const handleBack = () => setName('');

	// Step 1 - Search for card names
	const onChangeCardSearch = (e) => {
		setCardSearch(e.target.value);
		dispatch({ type: SCRYFALL_NAMED_RESET });

		if (e.target.value.length >= 3) {
			dispatch(getScryfallList(e.target.value));
		} else {
			dispatch({ type: SCRYFALL_LIST_RESET });
		}
	};

	// Step 2 - Show possible card names
	const showCardResults = () => {
		if (scryList) {
			let cardsToList =
				scryList.data.length < 5
					? scryList.data
					: scryList.data.slice(0, 5);
			return cardsToList.map((cardName, i) => {
				return (
					<ListGroup.Item
						key={i}
						onClick={() => {
							setName(cardName);
							dispatch({ type: SCRYFALL_LIST_RESET });
						}}>
						{cardName}
					</ListGroup.Item>
				);
			});
		}
	};

	return (
		<>
			<Button
				className='btn btn-sm'
				variant='success'
				onClick={handleOpen}>
				<i className='fas fa-plus'></i>
			</Button>

			<Modal show={show} onHide={handleClose} backdrop='static'>
				<Modal.Header closeButton>
					<Modal.Title>
						<Button
							variant='info'
							className='btn btn-sm'
							style={{ display: name ? 'block' : 'none' }}
							onClick={handleBack}>
							<i className='fas fa-arrow-left'></i>
						</Button>
						<div
							id='cardSearch'
							style={{ display: name ? 'none' : 'block' }}>
							<span className='px-2'>Add card:</span>
							<input
								type='text'
								id='cardSearch'
								value={cardSearch}
								placeholder='Enter card name'
								onChange={(e) => {
									onChangeCardSearch(e);
								}}
							/>
						</div>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div id='cardNames'>
						{loadingList ? (
							<Loader />
						) : errorList ? (
							<Message variant='danger'>{errorList}</Message>
						) : (
							<ListGroup variant='flush'>
								{showCardResults()}
							</ListGroup>
						)}
					</div>
					{name && <CardAddBody deckId={deckId} name={name} />}
				</Modal.Body>
				{/* <Modal.Footer
					style={{ display: scryfallId ? 'block' : 'none' }}>
					<Button variant='primary' onClick={handleAddCard}>
						Add Card
					</Button>
				</Modal.Footer> */}
			</Modal>
		</>
	);
};

export default CardAdd;

import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCardDetails, updateCard } from '../actions/cardActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { CARD_UPDATE_RESET } from '../constants/cardConstants';

const CardEditScreen = ({ match, history }) => {
	const cardId = match.params.id;

	const [deckId, setDeckId] = useState('');
	const [qty, setQty] = useState(0);
	const [name, setName] = useState('');
	const [type, setType] = useState('');
	const [edition, setEdition] = useState('');
	const [cmc, setCmc] = useState(0);
	const [isFoil, setIsFoil] = useState(false);
	const [isCommander, setIsCommander] = useState(false);

	const dispatch = useDispatch();

	const cardDetails = useSelector((state) => state.cardDetails);
	const { loading, error, card } = cardDetails;

	const cardUpdate = useSelector((state) => state.cardUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = cardUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: CARD_UPDATE_RESET });
			history.push(`/decks/${deckId}`);
		} else {
			if (!card.name || card._id !== cardId) {
				dispatch(getCardDetails(cardId));
			} else {
				setDeckId(card.deckId);
				setQty(card.qty);
				setName(card.name);
				setType(card.type);
				setEdition(card.edition);
				setCmc(card.cmc);
				setIsFoil(card.isFoil);
				setIsCommander(card.isCommander);
			}
		}
	}, [dispatch, history, deckId, cardId, card, successUpdate]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateCard({
				_id: cardId,
				deckId,
				qty,
				name,
				type,
				edition,
				cmc,
				isFoil,
				isCommander,
			})
		);
	};

	return (
		<>
			<Link to={`/decks/${deckId}`}>
				<Button variant='info' className='btn btn-sm'>
					<i className='fas fa-arrow-left'></i>
				</Button>
			</Link>
			<FormContainer>
				<h2>Edit Card</h2>
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group as={Row} controlId='qty'>
							<Form.Label column='sm' sm={1}>
								Qty
							</Form.Label>
							<Col sm={2}>
								<Form.Control
									type='number'
									min='1'
									max='99'
									size='sm'
									placeholder='Enter quantity'
									value={qty}
									onChange={(e) =>
										setQty(e.target.value)
									}></Form.Control>
							</Col>
							{/* </Form.Group>

						<Form.Group as={Row} controlId='name'> */}
							<Form.Label column='sm' sm={1}>
								Name
							</Form.Label>
							<Col sm={5}>
								<Form.Control
									type='name'
									size='sm'
									placeholder='Enter name'
									value={name}
									onChange={(e) =>
										setName(e.target.value)
									}></Form.Control>
							</Col>
						</Form.Group>

						<Form.Group as={Row} controlId='type'>
							<Form.Label column='sm' sm={1}>
								Type
							</Form.Label>
							<Col sm={2}>
								<Form.Control
									type='text'
									size='sm'
									placeholder='Enter card type'
									value={type}
									onChange={(e) =>
										setType(e.target.value)
									}></Form.Control>
							</Col>
							{/* </Form.Group>

						<Form.Group as={Row} controlId='edition'> */}
							<Form.Label column='sm' sm={1}>
								Set
							</Form.Label>
							<Col sm={3}>
								<Form.Control
									type='text'
									size='sm'
									placeholder='Enter card edition'
									value={edition}
									onChange={(e) =>
										setEdition(e.target.value)
									}></Form.Control>
							</Col>
							{/* </Form.Group>

						<Form.Group as={Row} controlId='cmc'> */}
							<Form.Label column='sm' sm={1}>
								CMC
							</Form.Label>
							<Col sm={3}>
								<Form.Control
									type='number'
									size='sm'
									placeholder='Enter CMC'
									value={cmc}
									onChange={(e) =>
										setCmc(e.target.value)
									}></Form.Control>
							</Col>
						</Form.Group>

						<Form.Group controlId='isFoil'>
							<Form.Check
								type='checkbox'
								label='Foil'
								checked={isFoil}
								onChange={(e) =>
									setIsFoil(e.target.checked)
								}></Form.Check>
							{/* </Form.Group>

						<Form.Group controlId='isCommander'> */}
							<Form.Check
								type='checkbox'
								label='Commander'
								checked={isCommander}
								onChange={(e) =>
									setIsCommander(e.target.checked)
								}></Form.Check>
						</Form.Group>

						<Button type='submit' variant='primary'>
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default CardEditScreen;

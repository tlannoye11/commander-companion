import React, { useEffect, useState } from 'react';
import {
	Button,
	Card,
	Col,
	Dropdown,
	DropdownButton,
	Form,
	Row,
} from 'react-bootstrap';
import NumericInput from 'react-numeric-input';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	getCardDetails,
	getCardScryfall,
	updateCard,
} from '../actions/cardActions';
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

	const cardScryfall = useSelector((state) => state.cardScryfall);
	const {
		loading: loadingScryfall,
		error: errorScryfall,
		success: successScryfall,
		cardData,
	} = getCardScryfall;

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
				dispatch(getCardScryfall(card.name));

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
	}, [
		dispatch,
		history,
		deckId,
		cardId,
		card,
		successUpdate,
		cardData,
		successScryfall,
	]);

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
			{loadingUpdate && <Loader />}
			{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
			{loadingScryfall && <Loader />}
			{errorScryfall && (
				<Message variant='danger'>{errorScryfall}</Message>
			)}
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
						<Form.Group as={Row}>
							<Form.Label column='sm' sm={1} className='px-1'>
								Name
							</Form.Label>
							<Col sm={11}>
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

						<Form.Group as={Row}>
							<Form.Label column='sm' sm={1}>
								Qty
							</Form.Label>
							<Col sm={2} className='pt-1'>
								<NumericInput
									min={1}
									max={99}
									value={card.qty}
								/>
							</Col>

							<Form.Label column='sm' sm={1}>
								Type
							</Form.Label>
							<Col sm={2}>
								<DropdownButton
									id='card-type-dropdown'
									title={type}
									size='sm'
									onSelect={(e) => setType(e)}>
									<Dropdown.Item id='C' eventKey='C' key='0'>
										C
									</Dropdown.Item>
									<Dropdown.Item id='P' eventKey='P' key='1'>
										P
									</Dropdown.Item>
									<Dropdown.Item id='A' eventKey='A' key='2'>
										A
									</Dropdown.Item>
									<Dropdown.Item id='E' eventKey='E' key='3'>
										E
									</Dropdown.Item>
									<Dropdown.Item id='I' eventKey='I' key='4'>
										I
									</Dropdown.Item>
									<Dropdown.Item id='S' eventKey='S' key='5'>
										S
									</Dropdown.Item>
									<Dropdown.Item id='L' eventKey='L' key='6'>
										L
									</Dropdown.Item>
									<Dropdown.Item id='B' eventKey='B' key='7'>
										B
									</Dropdown.Item>
								</DropdownButton>
							</Col>

							<Form.Label column='sm' sm={1}>
								Set
							</Form.Label>
							<Col sm={2}>
								{/* <DropdownButton>
									id='card-edition-dropdown' title={edition}
									size='sm' onSelect={(e) => setEdition(e)}>
									<Dropdown.Item
										id='C'
										eventKey='C'
										key='0'></Dropdown.Item>
								</DropdownButton> */}
								<Form.Control
									type='text'
									size='sm'
									placeholder='Enter card edition'
									value={edition}
									onChange={(e) =>
										setEdition(e.target.value)
									}></Form.Control>
							</Col>

							<Form.Label column='sm' sm={1}>
								CMC
							</Form.Label>
							<Col sm={2}>
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

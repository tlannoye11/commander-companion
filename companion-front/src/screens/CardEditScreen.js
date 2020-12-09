import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCardDetails } from '../actions/cardActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';

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

	useEffect(() => {
		if (!card.name || card._id !== cardId) {
			dispatch(getCardDetails(cardId));
		} else {
			setQty(card.qty);
			setName(card.name);
			setType(card.type);
			setEdition(card.edition);
			setCmc(card.cmc);
			setIsFoil(card.isFoil);
			setIsCommander(card.isCommander);
		}
	}, [dispatch, history, cardId, card]);

	return (
		<>
			<Link to={`/deck/${deckId}`} className='btn btn-light my-3'>
				Back
			</Link>
			<FormContainer>
				<h1>Edit Card</h1>
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId='qty'>
							<Form.Label>Qty</Form.Label>
							<Form.Control
								type='number'
								placeholder='Enter quantity'
								value={qty}
								onChange={(e) =>
									setQty(e.target.value)
								}></Form.Control>
						</Form.Group>

						<Form.Group controlId='name'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='name'
								placeholder='Enter name'
								value={name}
								onChange={(e) =>
									setName(e.target.value)
								}></Form.Control>
						</Form.Group>

						<Form.Group controlId='type'>
							<Form.Label>Type</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter card type'
								value={type}
								onChange={(e) =>
									setType(e.target.value)
								}></Form.Control>
						</Form.Group>

						<Form.Group controlId='set'>
							<Form.Label>Set</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter card edition'
								value={edition}
								onChange={(e) =>
									setEdition(e.target.value)
								}></Form.Control>
						</Form.Group>

						<Form.Group controlId='cmc'>
							<Form.Label>CMC</Form.Label>
							<Form.Control
								type='number'
								placeholder='Enter CMC'
								value={cmc}
								onChange={(e) =>
									setCmc(e.target.value)
								}></Form.Control>
						</Form.Group>

						<Form.Group controlId='isFoil'>
							<Form.Check
								type='checkbox'
								label='Is Foil'
								checked={isFoil}
								onChange={(e) =>
									setIsFoil(e.target.checked)
								}></Form.Check>
						</Form.Group>

						<Form.Group controlId='isCommander'>
							<Form.Check
								type='checkbox'
								label='Is Commander'
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

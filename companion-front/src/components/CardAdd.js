import React, { useEffect, useState } from 'react';
import {
	Button,
	Card,
	Col,
	Dropdown,
	DropdownButton,
	ListGroup,
	Modal,
	Row,
} from 'react-bootstrap';
import NumericInput from 'react-numeric-input';
import { useDispatch, useSelector } from 'react-redux';
import { createCard } from '../actions/cardActions';
import {
	getScryfallEditions,
	getScryfallList,
	getScryfallNamed,
} from '../actions/scryfallActions';
import { SCRYFALL_LIST_RESET } from '../constants/scryfallConstants';
import Loader from './Loader';
import Message from './Message';

const CardAdd = ({ deckId }) => {
	const [show, setShow] = useState(false);
	const [cardSearch, setCardSearch] = useState('');
	const [name, setName] = useState('');
	const [scryfallId, setScryfallId] = useState('');
	const [qty, setQty] = useState(0);
	const [type, setType] = useState('');
	const [edition, setEdition] = useState('');
	const [editions, setEditions] = useState([]);
	const [collectorNumber, setCollectorNumber] = useState('');
	const [cmc, setCmc] = useState(0);
	const [isFoil, setIsFoil] = useState(false);
	const [isCommander, setIsCommander] = useState(false);
	const [image, setImage] = useState(null);
	const [uri, setUri] = useState('');

	const dispatch = useDispatch();

	const scryfallList = useSelector((state) => state.scryfallList);
	const { loading: loadingList, error: errorList, scryList } = scryfallList;

	const scryfallNamed = useSelector((state) => state.scryfallNamed);
	const {
		loading: loadingNamed,
		error: errorNamed,
		scryNamed,
	} = scryfallNamed;

	const scryfallEditions = useSelector((state) => state.scryfallEditions);
	const {
		loading: loadingEditions,
		error: errorEditions,
		cardEditions,
	} = scryfallEditions;

	const cardCreate = useSelector((state) => state.cardCreate);
	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
	} = cardCreate;

	useEffect(() => {
		if (successCreate) {
			console.log('success create');
			setName('');
		} else if (name) {
			console.log('My name is', name);
			if (!scryNamed || !scryNamed.id) {
				console.log('get scryfall named');
				dispatch(getScryfallNamed(name));
			} else {
				console.log('set stuff');
				setScryfallId(scryNamed.id);
				setQty(1);
				setType(setCardType(scryNamed.type_line));
				setEdition(scryNamed.set);
				setCollectorNumber(scryNamed.collector_number);
				setCmc(scryNamed.cmc);
				setIsFoil(false);
				setIsCommander(false);
				setImage(scryNamed.image_uris.small);
				setUri(scryNamed.scryfall_uri);

				if (!cardEditions) {
					dispatch(getScryfallEditions(scryNamed.name));
				} else {
					setEditions(cardEditions);
				}
			}
		}
	}, [dispatch, name, successCreate, scryNamed, cardEditions]);

	const handleClose = () => {
		setShow(false);
		setName('');
	};
	const handleOpen = () => setShow(true);
	const handleBack = () => setName('');

	// Step 1 - Search for card names
	const onChangeCardSearch = (e) => {
		setCardSearch(e.target.value);

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

	// Step 3 - Add the card to the deck
	const handleAddCard = (cardName) => {
		setCardSearch('');
		dispatch(
			createCard({
				deckId: deckId,
				scryfallId: scryfallId,
				qty: qty,
				name: name,
				type: type,
				edition: edition.toUpperCase(),
				collectorNumber: collectorNumber,
				cmc: cmc,
				isFoil: isFoil,
				isCommander: isCommander,
			})
		);
	};

	const setCardType = (cardTypeLine) => {
		return cardTypeLine.includes('Basic')
			? 'B'
			: cardTypeLine.includes('Land')
			? 'L'
			: cardTypeLine.includes('Creature')
			? 'C'
			: cardTypeLine.includes('Planeswalker')
			? 'P'
			: cardTypeLine.includes('Artifact')
			? 'A'
			: cardTypeLine.includes('Enchantment')
			? 'E'
			: cardTypeLine.includes('Instant')
			? 'I'
			: cardTypeLine.includes('Sorcery')
			? 'S'
			: 'X';
	};

	const updateEditionHandler = (e) => {
		setEdition(e.split('|')[0].toUpperCase());
		setCollectorNumber(e.split('|')[1]);
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
					{name &&
						(loadingNamed ? (
							<Loader />
						) : errorNamed ? (
							<Message variant='danger'>{errorNamed}</Message>
						) : (
							<div
								id='cardControls'
								style={{
									display: scryfallId ? 'block' : 'none',
								}}>
								<Row>
									<Col>
										<Row className='py-1'>
											<Col sm={3}>Qty</Col>
											<Col sm={3}>
												<NumericInput
													min={1}
													max={99}
													value={qty}
													onChange={(e) => setQty(e)}
												/>
											</Col>
										</Row>
										<Row className='py-1'>
											<Col sm={3}>Type</Col>
											<Col sm={3}>
												<DropdownButton
													id='card-type-dropdown'
													title={type}
													size='sm'
													onSelect={(e) =>
														setType(e)
													}>
													{[
														['C', 'Creature'],
														['P', 'Planeswalker'],
														['A', 'Artifact'],
														['E', 'Enchantment'],
														['I', 'Instant'],
														['S', 'Sorcery'],
														['L', 'Land'],
														['B', 'Basic Land'],
													].map((type, i) => (
														<Dropdown.Item
															id={type[0]}
															eventKey={type[0]}
															key={i}>
															{type[1]}
														</Dropdown.Item>
													))}
												</DropdownButton>
											</Col>
										</Row>
										<Row className='py-1'>
											<Col sm={3}>Set</Col>
											<Col sm={3}>
												{loadingEditions ? (
													<Loader />
												) : errorEditions ? (
													<Message variant='danger'>
														{errorEditions}
													</Message>
												) : (
													<DropdownButton
														id='card-edition-dropdown'
														title={edition.toUpperCase()}
														size='sm'
														onSelect={(e) =>
															updateEditionHandler(
																e
															)
														}>
														{editions.map(
															(ed, i) => (
																<Dropdown.Item
																	id={ed.set}
																	eventKey={
																		ed.set +
																		'|' +
																		ed.collector_number
																	}
																	key={i}>
																	{`${ed.set_name} (${ed.collector_number})`}
																</Dropdown.Item>
															)
														)}
													</DropdownButton>
												)}
											</Col>
										</Row>
										<Row className='py-1'>
											{/* <Col sm={3}>CMC</Col>
										<Col sm={3}>
											<input
												type='number'
												size='sm'
												value={cmc}
												readOnly
											/>
										</Col> */}
											<Col sm={3}>Foil</Col>
											<Col sm={3}>
												<input
													type='checkbox'
													label='Foil'
													checked={isFoil}
													onChange={(e) =>
														setIsFoil(
															e.target.checked
														)
													}
												/>
											</Col>
										</Row>
										<Row className='py-1'>
											<Col sm={3}>
												<i className='fas fa-crown'></i>
											</Col>
											<Col sm={3}>
												<input
													type='checkbox'
													label='Commander'
													checked={isCommander}
													onChange={(e) =>
														setIsCommander(
															e.target.checked
														)
													}
												/>
											</Col>
										</Row>
									</Col>
									<Col>
										<Card
											border='white'
											className='text-center'
											style={{ maxWidth: '240px' }}>
											<Card.Img
												src={image}
												variant='top'
											/>
											<Card.Body>
												<Card.Link
													href={uri}
													className='px-2'>
													Scryfall
												</Card.Link>
												<Button
													className='btn btn-sm'
													variant='success'
													onClick={handleAddCard}>
													<i className='fas fa-plus'></i>
												</Button>
											</Card.Body>
										</Card>
									</Col>
								</Row>
							</div>
						))}
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

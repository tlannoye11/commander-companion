import React, { useEffect, useState } from 'react';
import {
    Button,
    Col,
    Dropdown,
    DropdownButton,
    Form,
    ListGroup,
    Row,
} from 'react-bootstrap';
import NumericInput from 'react-numeric-input';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCardDetails, updateCard } from '../actions/cardActions';
import {
    CARD_DETAILS_RESET,
    CARD_UPDATE_RESET,
} from '../constants/cardConstants';
import CardDisplay from '../components/CardDisplay';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
    getScryfallEditions,
    getScryfallList,
} from '../actions/scryfallActions';
import { SCRYFALL_CARD_RESET } from '../constants/scryfallConstants';

const CardScreen = ({ match, history }) => {
    const deckId = match.params.deckId;
    const cardId = match.params.cardId;

    const [qty, setQty] = useState(0);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [edition, setEdition] = useState('');
    const [editions, setEditions] = useState([]);
    const [collectorNumber, setCollectorNumber] = useState('');
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

    const scryfallEditions = useSelector((state) => state.scryfallEditions);
    const {
        loading: loadingEditions,
        error: errorEditions,
        cardEditions,
    } = scryfallEditions;

    const scryfallList = useSelector((state) => state.scryfallList);
    const { loading: loadingList, error: errorList, cardList } = scryfallList;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: CARD_DETAILS_RESET });
            dispatch({ type: CARD_UPDATE_RESET });
            history.push(`/decks/${deckId}`);
        } else {
            if (cardId) {
                if (!card.name || card._id !== cardId) {
                    dispatch(getCardDetails(cardId));
                } else {
                    setQty(card.qty);
                    setName(card.name);
                    setType(card.type);
                    setEdition(card.edition);
                    setCollectorNumber(card.collectorNumber);
                    setCmc(card.cmc);
                    setIsFoil(card.isFoil);
                    setIsCommander(card.isCommander);

                    if (!cardEditions) {
                        dispatch(getScryfallEditions(card.name));
                    } else {
                        setEditions(cardEditions.data);
                    }
                }
            } else {
                setQty(1);
                setName('');
            }
        }
    }, [
        dispatch,
        history,
        deckId,
        cardId,
        card,
        successUpdate,
        name,
        cardEditions,
    ]);

    const onChangeCardSearch = (e) => {
        if (e.target.value.length >= 3) {
            // setName(e.target.value);
            dispatch(getScryfallList(e.target.value));
        }
    };

    const showCardResults = () => {
        // do something here
    };

    const updateEditionHandler = (e) => {
        setEdition(e.split('|')[0].toUpperCase());
        setCollectorNumber(e.split('|')[1]);
        dispatch({ type: SCRYFALL_CARD_RESET });
    };

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
                collectorNumber,
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
            {loadingEditions && <Loader />}
            {errorEditions && (
                <Message variant='danger'>{errorEditions}</Message>
            )}
            <Link to={`/decks/${deckId}`}>
                <Button variant='info' className='btn btn-sm'>
                    <i className='fas fa-arrow-left'></i>
                </Button>
            </Link>
            <h2>Edit Card</h2>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Row>
                    <Col sm={6}>
                        <Form onSubmit={submitHandler}>
                            <Form.Group as={Row}>
                                <Form.Label column='sm' sm={1}>
                                    Name
                                </Form.Label>
                                <Col sm={11}>
                                    <Form.Control
                                        type='name'
                                        size='sm'
                                        placeholder='Enter name'
                                        value={name}
                                        onChange={(e) => {
                                            this.onChangeCardSearch(e);
                                        }}
                                    ></Form.Control>
                                </Col>
                                <Col>
                                    <ListGroup variant='flush'>
                                        {/* {this.showCardResults()} */}
                                    </ListGroup>
                                </Col>
                            </Form.Group>

                            {cardId && (
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
                                            onSelect={(e) => setType(e)}
                                        >
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
                                                    key={i}
                                                >
                                                    {type[1]}
                                                </Dropdown.Item>
                                            ))}
                                        </DropdownButton>
                                    </Col>

                                    <Form.Label column='sm' sm={1}>
                                        Set
                                    </Form.Label>
                                    <Col sm={2}>
                                        <DropdownButton
                                            id='card-edition-dropdown'
                                            title={edition.toUpperCase()}
                                            size='sm'
                                            onSelect={(e) =>
                                                updateEditionHandler(e)
                                            }
                                        >
                                            {editions.map((ed, i) => (
                                                <Dropdown.Item
                                                    id={ed.set}
                                                    eventKey={
                                                        ed.set +
                                                        '|' +
                                                        ed.collector_number
                                                    }
                                                    key={i}
                                                >
                                                    {`${ed.set_name} (${ed.collector_number})`}
                                                </Dropdown.Item>
                                            ))}
                                        </DropdownButton>
                                    </Col>
                                </Form.Group>
                            )}

                            {cardId && (
                                <Form.Group controlId='isFoil'>
                                    <Form.Check
                                        type='checkbox'
                                        label='Foil'
                                        checked={isFoil}
                                        onChange={(e) =>
                                            setIsFoil(e.target.checked)
                                        }
                                    ></Form.Check>

                                    <Form.Check
                                        type='checkbox'
                                        label='Commander'
                                        checked={isCommander}
                                        onChange={(e) =>
                                            setIsCommander(e.target.checked)
                                        }
                                    ></Form.Check>
                                </Form.Group>
                            )}

                            {cardId && (
                                <Button type='submit' variant='primary'>
                                    Update
                                </Button>
                            )}
                        </Form>
                    </Col>
                    <Col sm={6}>
                        {cardId && (
                            <CardDisplay
                                name={name}
                                edition={edition}
                                collectorNumber={collectorNumber}
                            />
                        )}
                    </Col>
                </Row>
            )}
        </>
    );
};

export default CardScreen;

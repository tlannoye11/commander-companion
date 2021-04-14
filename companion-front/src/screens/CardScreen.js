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
import { createCard, getCardDetails, updateCard } from '../actions/cardActions';
import {
    CARD_CREATE_RESET,
    CARD_DETAILS_RESET,
    CARD_UPDATE_RESET,
} from '../constants/cardConstants';
import CardDisplay from '../components/CardDisplay';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
    getScryfallEditions,
    getScryfallList,
    getScryfallNamed,
} from '../actions/scryfallActions';
import {
    SCRYFALL_CARD_RESET,
    SCRYFALL_EDITIONS_RESET,
    SCRYFALL_LIST_RESET,
    SCRYFALL_NAMED_RESET,
} from '../constants/scryfallConstants';

const CardScreen = ({ match, history }) => {
    const deckId = match.params.deckId;
    const cardId = match.params.cardId;

    const [scryfallId, setScryfallId] = useState('');
    const [qty, setQty] = useState(0);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [colorIdentity, setColorIdentity] = useState([]);
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

    const cardCreate = useSelector((state) => state.cardCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
    } = cardCreate;

    const scryfallEditions = useSelector((state) => state.scryfallEditions);
    const {
        loading: loadingEditions,
        error: errorEditions,
        cardEditions,
    } = scryfallEditions;

    const scryfallList = useSelector((state) => state.scryfallList);
    const { loading: loadingList, error: errorList, scryList } = scryfallList;

    const scryfallNamed = useSelector((state) => state.scryfallNamed);
    const {
        loading: loadingNamed,
        error: errorNamed,
        scryNamed,
    } = scryfallNamed;

    useEffect(() => {
        if (successUpdate || successCreate) {
            dispatch({ type: CARD_DETAILS_RESET });
            dispatch({ type: CARD_UPDATE_RESET });
            dispatch({ type: CARD_CREATE_RESET });
            dispatch({ type: SCRYFALL_CARD_RESET });
            dispatch({ type: SCRYFALL_NAMED_RESET });
            dispatch({ type: SCRYFALL_EDITIONS_RESET });
            setEditions([]);
            history.push(`/decks/${deckId}`);
        } else {
            if (scryNamed) {
                setScryfallId(scryNamed.id);
                setQty(1);
                setName(scryNamed.name);
                setType(setCardType(scryNamed.type_line));
                setColorIdentity(scryNamed.color_identity.join('')); // Scryfall stores color identity as an array of strings.
                setEdition(scryNamed.set);
                setCollectorNumber(scryNamed.collector_number);
                setCmc(scryNamed.cmc);
                setIsFoil(false);
                setIsCommander(false);

                if (!cardEditions) {
                    dispatch(getScryfallEditions(scryNamed.name));
                } else {
                    setEditions(cardEditions);
                }
            } else {
                if (cardId) {
                    if (!card.name || card._id !== cardId) {
                        dispatch(getCardDetails(cardId));
                    } else {
                        setScryfallId(card.scryfallId);
                        setQty(card.qty);
                        setName(card.name);
                        setType(card.type);
                        setColorIdentity(card.colorIdentity);
                        setEdition(card.edition);
                        setCollectorNumber(card.collectorNumber);
                        setCmc(card.cmc);
                        setIsFoil(card.isFoil);
                        setIsCommander(card.isCommander);

                        if (!cardEditions) {
                            dispatch(getScryfallEditions(card.name));
                        } else {
                            setEditions(cardEditions);
                        }
                    }
                }
            }
        }
    }, [
        dispatch,
        history,
        deckId,
        cardId,
        card,
        scryNamed,
        successUpdate,
        successCreate,
        cardEditions,
    ]);

    const onChangeCardSearch = (e) => {
        setName(e.target.value);

        if (e.target.value.length >= 3) {
            dispatch(getScryfallList(e.target.value));
        } else {
            dispatch({ type: SCRYFALL_LIST_RESET });
        }
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

    const showCardResults = () => {
        if (scryList) {
            let cardsToList =
                scryList.data.length < 5
                    ? scryList.data
                    : scryList.data.slice(0, 5);
            return cardsToList.map((card, i) => {
                return (
                    <ListGroup.Item
                        key={i}
                        onClick={() => {
                            dispatch({ type: SCRYFALL_LIST_RESET });
                            dispatch({ type: SCRYFALL_CARD_RESET });
                            dispatch(getScryfallNamed(card));
                        }}
                    >
                        {card}
                    </ListGroup.Item>
                );
            });
        }
    };

    const updateEditionHandler = (e) => {
        setEdition(e.split('|')[0].toUpperCase());
        setCollectorNumber(e.split('|')[1]);
        dispatch({ type: SCRYFALL_CARD_RESET });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        cardId
            ? dispatch(
                  updateCard({
                      _id: cardId,
                      deckId,
                      scryfallId,
                      qty,
                      name,
                      type,
                      colorIdentity,
                      edition: edition.toUpperCase(),
                      collectorNumber,
                      cmc,
                      isFoil,
                      isCommander,
                  })
              )
            : dispatch(
                  createCard({
                      deckId,
                      scryfallId,
                      qty,
                      name,
                      type,
                      colorIdentity,
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
            {loadingList && <Loader />}
            {errorList && <Message variant='danger'>{errorList}</Message>}
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loadingEditions && <Loader />}
            {errorEditions && (
                <Message variant='danger'>{errorEditions}</Message>
            )}
            {loadingNamed && <Loader />}
            {errorNamed && <Message variant='danger'>{errorNamed}</Message>}
            <Row>
                <Col sm={1} className='pt-1'>
                    <Link to={`/decks/${deckId}`}>
                        <Button
                            variant='info'
                            className='btn btn-sm'
                            onClick={() => {
                                dispatch({ type: SCRYFALL_CARD_RESET });
                                dispatch({ type: SCRYFALL_NAMED_RESET });
                                dispatch({ type: SCRYFALL_EDITIONS_RESET });
                            }}
                        >
                            <i className='fas fa-arrow-left'></i>
                        </Button>
                    </Link>
                </Col>
                <Col>
                    <h2>Card Screen</h2>
                </Col>
            </Row>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Row>
                    <Col sm={8}>
                        <Form onSubmit={submitHandler}>
                            <Row>
                                <Col sm={8}>
                                    <Form.Group as={Row}>
                                        <Col sm={2} className='pt-1'>
                                            <Form.Label>Name</Form.Label>
                                        </Col>
                                        <Col sm={10}>
                                            <Form.Control
                                                type='text'
                                                size='sm'
                                                placeholder='Enter name'
                                                value={name}
                                                onChange={(e) => {
                                                    onChangeCardSearch(e);
                                                }}
                                            ></Form.Control>
                                            <ListGroup>
                                                {showCardResults()}
                                            </ListGroup>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                {scryfallId && (
                                    <Col sm={4}>
                                        <Form.Group as={Row}>
                                            <Form.Label column='sm' sm={2}>
                                                Qty
                                            </Form.Label>
                                            <Col className='pt-1'>
                                                <NumericInput
                                                    min={1}
                                                    max={99}
                                                    value={qty}
                                                    onChange={(e) => setQty(e)}
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row}>
                                            <Form.Label column='sm' sm={2}>
                                                Type
                                            </Form.Label>
                                            <Col sm={3}>
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
                                        </Form.Group>

                                        <Form.Group as={Row}>
                                            <Form.Label column='sm' sm={2}>
                                                Set
                                            </Form.Label>
                                            <Col sm={3}>
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

                                        <Form.Group as={Row}>
                                            <Form.Label column='sm' sm={2}>
                                                CMC
                                            </Form.Label>
                                            <Col sm={4}>
                                                <Form.Control
                                                    type='number'
                                                    size='sm'
                                                    value={cmc}
                                                    readOnly
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row}>
                                            <Form.Label column='sm' sm={2}>
                                                Foil?
                                            </Form.Label>
                                            <Col sm={4}>
                                                <Form.Check
                                                    type='switch'
                                                    id='is-foil-switch'
                                                    label=''
                                                    checked={isFoil}
                                                    className='pt-1'
                                                    onChange={(e) =>
                                                        setIsFoil(
                                                            e.target.checked
                                                        )
                                                    }
                                                ></Form.Check>
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row}>
                                            <Form.Label column='sm' sm={2}>
                                                <i className='fas fa-crown'></i>
                                            </Form.Label>
                                            <Col sm={4}>
                                                <Form.Check
                                                    type='switch'
                                                    id='is-commander-switch'
                                                    label=''
                                                    checked={isCommander}
                                                    className='pt-1'
                                                    onChange={(e) =>
                                                        setIsCommander(
                                                            e.target.checked
                                                        )
                                                    }
                                                ></Form.Check>
                                            </Col>
                                        </Form.Group>
                                        <Button type='submit' variant='primary'>
                                            Save
                                        </Button>
                                    </Col>
                                )}
                            </Row>
                        </Form>
                    </Col>
                    <Col sm={4}>
                        {scryfallId && (
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

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import AddCard from '../cards/add-card.component';
import CardList from './card-list.component';

class EditDeck extends Component {
    constructor(props) {
        super(props);

        // Bindings
        this.onChangeDeckName = this.onChangeDeckName.bind(this);
        this.onChangeDeckCommander = this.onChangeDeckCommander.bind(this);
        this.onChangeDeckTheme = this.onChangeDeckTheme.bind(this);
        this.onChangeDeckSleeveColor = this.onChangeDeckSleeveColor.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // Empty state
        this.state = {
            deck_name: "",
            deck_commander: "",
            deck_colors: "",
            deck_count: 0,
            deck_average_cmc: 0.0,
            deck_foils: "",
            deck_theme: "",
            deck_sleeve_color: "",
            deck_basic_lands: [],
            commanders: []
        }    
    }

    componentDidMount() {
        console.log("EDIT MOUNTED",this.props.match.params.id);
        axios.get('http://localhost:4000/decks/'+this.props.match.params.id)
            .then(response => {
                console.log("EDIT RESPONSE:",response.data);
                this.setState({
                    deck_name: response.data.deck_name,
                    deck_theme: response.data.deck_theme,
                    deck_sleeve_color: response.data.deck_sleeve_color
                });
            })
            .catch((err) => {
                console.log(`Error getting deck information: ${err}`);
            });
    }

    // Get commanders for the given name
    getCommanders(str) {
        axios.get(`https://api.scryfall.com/cards/search?q=is%3Acommander+name%3D${str}`)
        .then(response => {
            return response.data.data;
        })
        .then(data => {
            this.setState({
                commanders: data
            });
        })
        .catch((err) => {
            console.log(`Error getting list of commanders: ${err}`);
        });
    }

    handleAddCard() {
        // do stuff here
    }

    onChangeDeckName(e) {
        this.setState({
            deck_name: e.target.value
        });
    }

    onChangeDeckCommander(e) {
        this.setStage({
            deck_commander: e.target.value
        });

        if (e.target.value.length >= 3) {
            this.getCommanders(e.target.value);
        }
        else {
            this.setState({
                commanders: []
            })
        }
    }

    onChangeDeckTheme(e) {
        this.setState({
            deck_theme: e.target.value
        });
    }

    onChangeDeckSleeveColor(e) {
        this.setState({
            deck_sleeve_color: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const updatedDeck = {
            deck_name: this.state.deck_name,
            deck_commander: this.state.deck_commander,
            deck_colors: this.state.deck_colors,
            deck_count: this.state.deck_count,
            deck_average_cmc: this.state.deck_average_cmc,
            deck_foils: this.state.deck_foils,
            deck_theme: this.state.deck_theme,
            deck_sleeve_color: this.state.deck_sleeve_color,
            deck_basic_lands: this.state.deck_basic_lands
        };

        axios.post(`http://localhost:4000/decks/update/${this.props.match.params.id}`, updatedDeck)
            .then((response) => {
                console.log(response.data);
                this.props.history.push('/');   // go back to the main list of decks
            });
    }

    render() {
        let filteredCommanders = this.state.commanders.filter(commander => {
            return commander.name.toLowerCase().includes(this.state.deck_commander.toLowerCase());
        });

        return (
            <div style= {{ marginTop: 20 }}>
                <Link to="/">
                    <Button size="sm" variant="info">Back icon here</Button>
                </Link>
                <h3>Update Deck</h3>
                <form className="form-inline" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" value={this.state.deck_name} onChange={this.onChangeDeckName} />
                    </div>
                    <div className="form-group">
                        <label>Commander</label>
                        <input type="text" className="form-control" value={this.state.deck_commander} onChange={this.onChangeDeckCommander} />
                    </div>
                    <div className="form-group">
                        <label>Theme</label>
                        <input type="text" className="form-control" value={this.state.deck_theme} onChange={this.onChangeDeckTheme} />
                    </div>
                    <div className="form-group">
                        <label>Sleeves</label>
                        <input type="text" className="form-control" value={this.state.deck_sleeve_color} onChange={this.onChangeDeckSleeveColor} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update Deck" className="btn btn-primary" />
                    </div>
                </form>
                <div id="findCards">
                    <AddCard  />
                </div>
                <div id="commanderNames">
                    <CardList cards={filteredCommanders} />
                </div>
            </div>
        )
    }
}

export default EditDeck;
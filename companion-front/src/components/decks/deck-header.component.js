import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

class DeckHeader extends Component {
    constructor(props) {
        super(props);

        // Bindings
        this.onChangeDeckName = this.onChangeDeckName.bind(this);
        this.onChangeDeckTheme = this.onChangeDeckTheme.bind(this);
        this.onChangeDeckSleeveColor = this.onChangeDeckSleeveColor.bind(this);
        this.onChangeCards = this.onChangeCards.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // Empty state
        this.state = {
            deck_name: "",
            deck_theme: "",
            deck_sleeve_color: "",
            cards: []
        }
    }

    componentDidMount() {
        if (this.props.deck_id) {
            axios.get('http://localhost:4000/decks/'+this.props.deck_id)
            .then(response => {
                this.setState({
                    deck_name: response.data.deck_name,
                    deck_theme: response.data.deck_theme,
                    deck_sleeve_color: response.data.deck_sleeve_color,
                });
            }).then(response => {
                axios.get('http://localhost:4000/cards/'+this.props.deck_id)
                    .then(response => {
                        // Check for an empty deck list.
                        this.setState({
                            cards: response.data ? response.data.cards : []
                        });
                    })
                    .catch((err) => {
                        console.log(`Error getting card list: ${err}`);
                        // Sometimes an empty deck will return no cards.
                    })
            })
            .catch((err) => {
                console.log(`Error getting deck information: ${err}`);
            });
        }
    }

    // onChange methods
    onChangeDeckName(e) {
        this.setState({
            deck_name: e.target.value
        });
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

    onChangeCards(e) {
        console.log("E:",e.target.value);
    }

    onSubmit(e) {
        e.preventDefault();

        let apiString = 'http://localhost:4000/decks/' + (this.props.deck_id ? 'update/' + this.props.deck_id : 'add');

        const currentDeck = {
            deck_name: this.state.deck_name,
            deck_theme: this.state.deck_theme,
            deck_sleeve_color: this.state.deck_sleeve_color,
            cards: this.state.cards
        }

        axios.post(apiString, currentDeck)
            .then(response => {
                console.log(response.data);
            })
    }

    render() {
        return (
            <div style= {{ marginTop: 20 }}>
                <Link to="/">
                    <Button size="sm" variant="info">Back icon here</Button>
                </Link>
                <h3>{this.props.title}</h3>
                <form className="form-inline" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" value={this.state.deck_name || ''} onChange={this.onChangeDeckName} />
                    </div>
                    <div className="form-group">
                        <label>Theme</label>
                        <input type="text" className="form-control" value={this.state.deck_theme || ''} onChange={this.onChangeDeckTheme} />
                    </div>
                    <div className="form-group">
                        <label>Sleeves</label>
                        <input type="text" className="form-control" value={this.state.deck_sleeve_color || ''} onChange={this.onChangeDeckSleeveColor} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value={this.props.title} className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

export default DeckHeader;

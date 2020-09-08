import React, { Component } from 'react';
import axios from 'axios';

class CreateDeck extends Component {
    constructor(props) {
        super(props);

        // Bindings
        this.onChangeDeckName = this.onChangeDeckName.bind(this);
        this.onChangeDeckColors = this.onChangeDeckColors.bind(this);
        this.onChangeDeckCount = this.onChangeDeckCount.bind(this);
        this.onChangeDeckAverageCMC = this.onChangeDeckAverageCMC.bind(this);
        this.onChangeDeckFoils = this.onChangeDeckFoils.bind(this);
        this.onChangeDeckTheme = this.onChangeDeckTheme.bind(this);
        this.onChangeDeckSleeveColor = this.onChangeDeckSleeveColor.bind(this);
        this.onChangeDeckBasicLands = this.onChangeDeckBasicLands.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // Empty state
        this.state = {
            deck_name: "",
            deck_colors: "",
            deck_count: 0,
            deck_average_cmc: 0.0,
            deck_foils: "",
            deck_theme: "",
            deck_sleeve_color: "",
            deck_basic_lands: []
        }    
    }

    onChangeDeckName(e) {
        this.setState({
            deck_name: e.target.value
        });
    }

    onChangeDeckColors(e) {
        this.setState({
            deck_colors: e.target.value
        });
    }

    onChangeDeckCount(e) {
        this.setState({
            deck_count: e.target.value
        });
    }

    onChangeDeckAverageCMC(e) {
        this.setState({
            deck_average_cmc: e.target.value
        });
    }

    onChangeDeckFoils(e) {
        this.setState({
            deck_foils: e.target.value
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

    onChangeDeckBasicLands(e) {
        this.setState({
            deck_basic_lands: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Deck Edit Form Submitted`);

        const newDeck = {
            deck_name: this.state.deck_name,
            deck_colors: this.state.deck_colors,
            deck_count: this.state.deck_count,
            deck_average_cmc: this.state.deck_average_cmc,
            deck_foils: this.state.deck_foils,
            deck_theme: this.state.deck_theme,
            deck_sleeve_color: this.state.deck_sleeve_color,
            deck_basic_lands: this.state.deck_basic_lands
        }

        axios.post('http://localhost:4000/decks/add', newDeck)
            .then(response => {
                console.log(response.data);
            })
        
        this.setState({
            deck_name: "",
            deck_colors: "",
            deck_count: 0,
            deck_average_cmc: 0.0,
            deck_foils: "",
            deck_theme: "",
            deck_sleeve_color: "",
            deck_basic_lands: []
        });
    }

    render() {
        return (
            <div style= {{ marginTop: 20 }}>
                <h3>Create New Deck</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" value={this.state.deck_name} onChange={this.onChangeDeckName} />
                    </div>
                    <div className="form-group">
                        <label>Colors</label>
                        <input type="text" className="form-control" value={this.state.deck_colors} onChange={this.onChangeDeckColors} />
                    </div>
                    <div className="form-group">
                        <label>Count</label>
                        <input type="text" className="form-control" value={this.state.deck_count} onChange={this.onChangeDeckCount} />
                    </div>
                    <div className="form-group">
                        <label>Avg CMC</label>
                        <input type="text" className="form-control" value={this.state.deck_average_cmc} onChange={this.onChangeDeckAverageCMC} />
                    </div>
                    <div className="form-group">
                        <label>Foils</label>
                        <input type="text" className="form-control" value={this.state.deck_foils} onChange={this.onChangeDeckFoils} />
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
                        <label>Basic Lands</label>
                        <input type="text" className="form-control" value={this.state.deck_basic_lands} onChange={this.onChangeDeckBasicLands} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Deck" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateDeck;

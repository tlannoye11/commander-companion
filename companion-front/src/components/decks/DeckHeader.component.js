import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

class DeckHeader extends Component {
	canBeSubmitted() {
		const {
			deck_name,
			deck_theme,
			deck_sleeve_color,
			deck_header_changes,
		} = this.props;
		return (
			deck_name.length > 0 &&
			deck_theme.length > 0 &&
			deck_sleeve_color.length > 0 &&
			deck_header_changes
		);
	}

	render() {
		const isEnabled = this.canBeSubmitted();

		return (
			<div style={{ marginTop: 20 }}>
				<Link to='/'>
					<Button size='sm' variant='info'>
						Back icon here
					</Button>
				</Link>
				<h3>{this.props.title}</h3>
				<form className='form-inline' onSubmit={this.props.onSubmit}>
					<div className='form-group'>
						<label>Name</label>
						<input
							type='text'
							className='form-control'
							value={this.props.deck_name || ''}
							onChange={this.props.onChangeDeckName}
						/>
					</div>
					<div className='form-group'>
						<label>Theme</label>
						<input
							type='text'
							className='form-control'
							value={this.props.deck_theme || ''}
							onChange={this.props.onChangeDeckTheme}
						/>
					</div>
					<div className='form-group'>
						<label>Sleeves</label>
						<input
							type='text'
							className='form-control'
							value={this.props.deck_sleeve_color || ''}
							onChange={this.props.onChangeDeckSleeveColor}
						/>
					</div>
					<div className='form-group'>
						<input
							type='submit'
							value={
								this.props.deck_header_changes
									? this.props.title
									: `Make a change`
							}
							className='btn btn-primary'
							disabled={!isEnabled}
						/>
					</div>
				</form>
			</div>
		);
	}
}

export default DeckHeader;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

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
			<header>
				<Form inline onSubmit={this.props.onSubmit}>
					<Link to='/'>
						<Button size='sm' variant='info' className='btn btn-sm'>
							<i className='fas fa-arrow-left'></i>
						</Button>
					</Link>
					<Form.Label
						htmlFor='inlineFormInputDeckName'
						className='px-2'>
						Deck
					</Form.Label>
					<Form.Control
						type='text'
						id='inlineFormInputDeckName'
						placeholder='Deck Name'
						value={this.props.deck_name || ''}
						onChange={this.props.onChangeDeckName}
					/>
					<Form.Label
						htmlFor='inlineFormInputDeckTheme'
						className='px-2'>
						Theme
					</Form.Label>
					<Form.Control
						type='text'
						id='inlineFormInputDeckTheme'
						placeholder='Theme'
						value={this.props.deck_theme || ''}
						onChange={this.props.onChangeDeckTheme}
					/>
					<Form.Label
						htmlFor='inlineFormInputDeckSleeves'
						className='px-2'>
						Sleeves
					</Form.Label>
					<Form.Control
						type='text'
						id='inlineFormInputDeckSleeves'
						placeholder='Sleeves'
						value={this.props.deck_sleeve_color || ''}
						onChange={this.props.onChangeDeckSleeveColor}
					/>
					<Button
						type='submit'
						className='mx-2 btn btn-primary btn-sm'
						disabled={!isEnabled}>
						<i
							className={
								this.props.deck_header_changes
									? 'fas fa-save'
									: 'fas fa-ban'
							}></i>
					</Button>
				</Form>
			</header>
		);
	}
}

export default DeckHeader;

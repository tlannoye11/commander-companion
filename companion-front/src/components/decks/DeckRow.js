import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DeckRow = ({ deck }) => {
	return (
		<tr>
			<td>Deck Row</td>
			{/* <Link to={`/edit/${deck.deck_id}`}> */}
			<td>
				<strong>{deck.deck_name}</strong>
			</td>{' '}
			{/* </Link> */}
			{deck.deck_id}
			<td>Colors here</td>
			<td className='center-column'>
				Spell + Land count{/* {deck.spell_count + deck.land_count} */}
			</td>
			<td className='center-column'>Foil count{deck.foil_count}</td>
			<td className='center-column'>Avg CMC{deck.avg_cmc}</td>
			<td>{deck.deck_theme}</td>
			<td>{deck.deck_sleeve_color}</td>
			<td>Basics{deck.deck_basic_lands}</td>
			<td>
				{/* <Button onClick={this.deleteDeck} size='sm'>
					<i className='fas fa-trash-alt'></i>
				</Button> */}
			</td>
		</tr>
	);
};

export default DeckRow;

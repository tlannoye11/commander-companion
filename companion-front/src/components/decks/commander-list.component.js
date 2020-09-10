import React, { Component } from 'react';

class CommanderList extends Component {
    render() {
        return (
            <ul>
                {this.props.commanders.map((commander) => {
                    return <li key={commander.id}>{commander.name}</li>
                })}
            </ul>
        );
    }
}

export default CommanderList;

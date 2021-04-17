import React from 'react';
import {
    Dropdown,
    DropdownButton,
    OverlayTrigger,
    Popover,
} from 'react-bootstrap';

const SleeveColor = ({ sleeveColor, setSleeveColor }) => {
    const sleeveColors = [
        'red',
        'orange',
        'yellow',
        'green',
        'cyan',
        'blue',
        'purple',
        'white',
        'gray',
        'black',
    ];

    const sleevePopover = (
        <Popover id='sleeve-popover'>
            <Popover.Content>
                {sleeveColors.map((color, i) => {
                    return (
                        <button
                            key={i}
                            style={{
                                height: 30,
                                width: 30,
                                backgroundColor: color,
                                borderRadius: '20%',
                                display: 'inline-block',
                                float: 'left',
                            }}
                            onClick={() => setSleeveColor(color)}
                        ></button>
                    );
                })}
            </Popover.Content>
        </Popover>
    );

    return (
        <OverlayTrigger
            trigger='click'
            rootClose
            placement='bottom'
            overlay={sleevePopover}
        >
            <button
                type='button'
                style={{
                    height: 30,
                    width: 30,
                    borderRadius: '20%',
                    backgroundColor: sleeveColor,
                }}
            ></button>
        </OverlayTrigger>
        // <DropdownButton
        //     id='sleeve-color'
        //     title={sleeveColor}
        //     size='sm'
        //     onSelect={(e) => setSleeveColor(e)}
        // >
        //     {sleeveColors.map((color, i) => (
        //         <Dropdown.Item id={color} eventKey={color} key={i}>
        //             <button
        //                 key={i}
        //                 style={{
        //                     height: 30,
        //                     width: 30,
        //                     backgroundColor: color,
        //                     borderRadius: '50%',
        //                     display: 'inline-block',
        //                     float: 'left',
        //                 }}
        //                 onClick={() => setSleeveColor(color)}
        //             ></button>
        //         </Dropdown.Item>
        //     ))}
        // </DropdownButton>
    );
};

export default SleeveColor;

import React from 'react';
import Card from '../../Card/Card';
import './HomeMain.css'
import images1 from '../Images/red.png'
import images2 from '../Images/golapy.png'
import images3 from '../Images/green.png'
import images4 from '../Images/Group 33142.png'

const HomeMain = () => {
    const fakeData = [
        {
            id: 1,
            title: 'One Time Ticket',
            taka: 100,
            background: images1
        },
        {
            id: 2,
            title: 'One Day Ticket',
            taka: 500,
            background: images2
        },
        {
            id: 3,
            title: 'Monthly Pass',
            taka: 1500,
            background: images3
        },
        {
            id: 4,
            title: 'Annual Pass',
            taka: 9000,
            background: images4
        }
    ]
    return (
        <div className='homemain d-flex align-items-center justify-content-between' style={{height:'400px'}}>
            {
                fakeData.map(card => <Card key={card.id} card={card}></Card>)
            }
        </div>
    );
};

export default HomeMain;
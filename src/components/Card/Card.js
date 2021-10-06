import React from 'react';
import { useHistory } from 'react-router-dom';
import './Card.css'

const Card = (props) => {
  const history = useHistory()
  const { title, taka, background } = props.card
  const handleTicket = () => {
    history.push('./map')
  }
  return (
    <div className='card-container'>
      <div class="card m-1 text-white" style={{ width: '12rem' }}>
        <img src={background} alt="" />
        <div class="card-img-overlay">
          <h2 class="card-title">{title}</h2>
          <button style={{borderRadius:'25px', margin:'10px 0'}} onClick={handleTicket} type="button" class="btn btn-primary">BUY NOW</button>
          <div class="">
            <h2 style={{ margin:'25px 0'}} class="card-text"> <b>৳ {taka}</b> </h2>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Card;
import React, { Component } from 'react';
import './KanjiList.css';

class CardFront extends Component {
  render() { 
    const { kanji } = this.props
    return ( 
      <div className='flip-card-front' >
        <div className="card-content">
          <h1 className="front-kanji">{kanji.character}</h1>
          <h5 className='front-english'>{kanji.keyword}</h5>
        </div>
      </div>
     );
  }
}
 
export default CardFront;
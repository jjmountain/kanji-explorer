import React, { Component } from 'react';
import './KanjiList.css';

class CardFront extends Component {
  render() { 
    const { kanji } = this.props
    return ( 
      <div className='flip-card-front' >
        <div className="card-content">
          <h1 className="front-kanji">{kanji.character}</h1>
          <h2 className='front-english lead'>{kanji.keyword}</h2>
        </div>
      </div>
     );
  }
}
 
export default CardFront;
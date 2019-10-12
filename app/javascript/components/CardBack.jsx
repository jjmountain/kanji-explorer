import React, { Component } from 'react';
import './KanjiList.css';

class CardBack extends Component {

  render() { 
    const { kanji } = this.props

    function createMarkup(html) {
      return {__html: html};
    }
    return (
      <div className='flip-card-back'>
        <div className="card-content">
        <div className="top-info">
          <div>{kanji.id}</div>
          <div>{kanji.frequency < 1000 ? 'common' : 'rare'}</div>
          <div>N{kanji.jlpt}</div>
        </div>
          <ul>
          <li className='kanji-details'>{Object.keys(kanji.examples)}</li>
          <li className='kanji-details'>{kanji.onyomi}</li>
          <li className='kanji-details'>{kanji.kunyomi}</li>
          <li className='kanji-details'><div dangerouslySetInnerHTML={createMarkup(kanji.components)} /></li>
        </ul>
        </div>
        
        
      </div>
     );
  }
}
 
export default CardBack;
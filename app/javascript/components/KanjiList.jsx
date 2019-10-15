import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './KanjiList.css';
import CardFront from './CardFront';
import CardBack from './CardBack';


class KanjiList extends Component {

  renderSearchResults() {
    const kanjis = this.props.kanjis; 

    if (Object.keys(kanjis).length && kanjis.length) {
      const allKanjis = kanjis.map((kanji, index) => (
        <div key={index} className='col-md-6 col-lg-4'>
            <div className="flip-card">
              <div className="flip-card-inner">
                <CardFront kanji={kanji} />
                <CardBack  kanji={kanji} />
              </div>
            </div>
        </div>
      ));
      return (
        <div className="row">
          {allKanjis}
        </div>
      )
    };
  };

  render() { 
    return (
      <>
        {this.renderSearchResults()}
      </>
     );
  }
}
 
export default KanjiList;
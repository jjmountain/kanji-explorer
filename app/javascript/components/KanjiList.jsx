import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './KanjiList.css';
import CardFront from './CardFront';
import CardBack from './CardBack';


class KanjiList extends Component {
  
  
  renderSearchResults(matches, matchType) {

    if (Object.keys(matches).length && Object.keys(matches.kanji).length) {
      const kanjisToRender = matches.kanji.map(kanji => (
        <div key={kanji.id} className='col-md-6 col-lg-4 d-flex justify-content-center'>
          <div className="flip-card">
            <div className="flip-card-inner">
              <CardFront kanji={kanji} />
              <CardBack  kanji={kanji} />
           </div>
         </div>
        </div>
      ));

      switch(matchType) {
        case 'characters':
          break;
        case 'readings':
          break;
        case 'examples':

          break;
        case 'keyword':
          break;
      }
    
      return (
        <><div className="d-flex justify-content-center">
          

        </div>
        <h5 className='pb-4 d-flex justify-content-center'>{matches.meta.total_count} kanji found in {matchType}</h5>
          <div className="row">
            {kanjisToRender}
          </div>
        </>
      )
    }
  }


    //

    // if (Object.keys(kanjis).length && kanjis.length) {
    //   const allKanjis = kanjis.map((kanji, index) => (
    //     <div key={index} className='col-md-6 col-lg-4'>
    //         <div className="flip-card">
    //           <div className="flip-card-inner">
    //             <CardFront kanji={kanji} />
    //             <CardBack  kanji={kanji} />
    //           </div>
    //         </div>
    //     </div>
    //   ));
    //   return (
    //     <div className="row">
    //       {allKanjis}
    //     </div>
    //   )
    // };

    render() { 
      const { kanjis, characters, readings, examples, english } = this.props;

      // console.log(characters, readings, examples, english)
      return (
        <>
          {this.renderSearchResults(characters, 'characters')}
          {this.renderSearchResults(readings, 'readings')}
          {this.renderSearchResults(examples, 'examples')}
          {this.renderSearchResults(english, 'keyword')}
        </>
       );
    }

    
  };


  
 
export default KanjiList;
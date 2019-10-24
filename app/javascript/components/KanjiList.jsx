import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './KanjiList.css';
import CardFront from './CardFront';
import CardBack from './CardBack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'


class KanjiList extends Component {
  
  
  renderSearchResults(matches, matchType) {

    if (Object.keys(matches).length && Object.keys(matches.kanji).length) {
      const kanjisToRender = matches.kanji.map(kanji => (
        
        <>
        <div key={kanji.id} className='col-4 col-md-3 col-lg-2 d-flex justify-content-center'>
          <div className="flip-card">
            <div className="flip-card-inner">
              <CardFront kanji={kanji} />
              <CardBack  kanji={kanji} />
           </div>
         </div>
        </div>
        <div className="col-8 col-md-9 col-lg-10 d-flex">
          <h1>Matched in:</h1>{console.log(Object.entries(kanji))}

        </div>
        </>
      ));
    
      return (
        <>
        <h5 className='pb-4 d-flex justify-content-center'>{matches.meta.total_count} kanji found in {matchType}</h5>
          <div className="row">
            {kanjisToRender}
          </div>
        </>
      )
    }
  }

  filterIt(arr, searchKey) {
    return arr.filter(obj => Object.keys(obj).some(key => obj[key].includes(searchKey)));
  }


  render() {
    const { characters, readings, examples, english, loading } = this.props;
    const loadingIcon = <FontAwesomeIcon icon={faSpinner} className='spinner' spin  />
       
      if (loading) {
        return (
          <div class="d-flex justify-content-center">
            {loadingIcon}            
          </div>
        );
      } else {
          return (
            <div>
              {this.renderSearchResults(characters, 'characters')}
              {this.renderSearchResults(readings, 'readings')}
              {this.renderSearchResults(examples, 'examples')}
              {this.renderSearchResults(english, 'keyword')}
            </div>
          );
      }
    }
}
      


  

  
 
export default KanjiList;
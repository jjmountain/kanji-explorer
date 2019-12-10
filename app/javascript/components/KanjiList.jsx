import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './KanjiList.css';
import CardFront from './CardFront';
import CardBack from './CardBack';
import ExampleResults from './ExampleResults';
import ReadingResults from './ReadingResults';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'


class KanjiList extends Component {

  // for examples of matched kanji, iterate through values array of objects 
  // for each object check example_kanji for a match, then check example_reading, then example_english
  // if a match is found with the query then return that key-value pair from the object
  // go to the next iteration

  findMatchesInExamples(arr, searchKey) {
    const matches = [];
    arr.filter(obj => Object.keys(obj).slice(0,2).some(key => obj[key].includes(searchKey) && matches.push(obj[key])));
    arr.filter(obj => Object.keys(obj).slice(2).some(key => obj[key].forEach(str => str.includes(searchKey) && matches.push(str))));
    return matches;
  }
  
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
          <p>Found in:</p>{Object.entries(kanji)}
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

  render() {
    const { characters, readings, examples, english, loading, query, furigana } = this.props;
    const loadingIcon = <FontAwesomeIcon icon={faSpinner} className='spinner' spin  />
       
      if (loading) {
        return (
          <div className="d-flex justify-content-center">
            {loadingIcon}            
          </div>
        );
      } else {
          return (
            <div>
              {/* {this.renderSearchResults(characters, 'characters')} */}
              {/* {this.renderSearchResults(readings, 'readings')} */}
              <ExampleResults examples={examples} query={query} furigana={furigana} />
              {/* <ReadingResults readings={readings} query={query} /> */}
              {/* {this.renderSearchResults(examples, 'examples')} */}
              {/* {this.renderSearchResults(english, 'keyword')} */}
            </div>
          );
      }
    }
}
      


  

  
 
export default KanjiList;
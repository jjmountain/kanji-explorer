import React, { Component } from 'react';
import './KanjiList.css';
import CardFront from './CardFront';

class ExampleResults extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  findMatchesInExamples(arr, searchKey) {
    const { examples, query } = this.props;
    const matches = [];

    // arr is an array of objects -> each object has three keys: example_kanji, example_reading, example_english
    // look at first object, return an array of three keys
    // get the last key in an array --> ['example_english']
    // use that key to read inside the 3 objects
    // 

    // we want to end up with an array of the original objects where there are matches

    arr.filter(obj => obj["example_english"].map(arr => arr.filter(str => str.includes(searchKey))))


    arr.filter(obj => {
      obj['example_english'].some(arr => {
        arr.some(str => {
          str.includes(searchKey) && matches.push({example_word: obj["example_kanji"], example_match: str})
        })
      })
    })
    arr.filter(obj => Object.keys(obj).slice(0,2).some(key => obj[key].includes(searchKey) && matches.push(obj)));
    const uniqueMatches = Array.from(new Set(matches))
    const examplesToRender = uniqueMatches.map(example => (
      <li className='example-card'>
        <div className='example-kanji'>
          {example['example_word']}
        </div>
        <div className='example_match'>
          {example['example_match']}
        </div>
      </li>
    ));
    return (
      <ul>
        {examplesToRender}
      </ul>
      )
  }

  componentDidUpdate() {

  }

  render() {
    const { examples, query } = this.props;
    if (Object.keys(examples).length && Object.keys(examples.kanji).length) {
      const kanjisToRender = examples.kanji.map(kanji => (
        
        <>
        <div key={kanji.id} className='col-4 col-md-3 col-lg-2 d-flex justify-content-center'>
          <div className="flip-card">
            <div className="flip-card-inner">
              <CardFront kanji={kanji} />
           </div>
         </div>
        </div>
        <div className="col-8 col-md-9 col-lg-10 example-results d-flex align-items-center">
          {this.findMatchesInExamples(kanji.examples, query)}
        </div>
        </>
      ));
    
      return (
        <>
        <h5 className='pb-4 d-flex justify-content-center'>{examples.meta.total_count} kanji found in examples</h5>
          <div className="row">
            {kanjisToRender}
          </div>
        </>
      )
    }

    return (
      null
    )
  }
}
 
export default ExampleResults;
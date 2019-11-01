import React, { Component } from 'react';
import './KanjiList.css';
import CardFront from './CardFront';

class ExampleResults extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      showFurigana: false
     }
  }

  removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
}

  findMatchesInExamples(arr, searchKey) {
    const { examples, query } = this.props;
    const matches = [];

    // arr.filter(obj => obj["example_english"].map(arr => arr.filter(str => str.includes(searchKey))))


    arr.filter(obj => {
      obj['example_english'].some(arr => {
        arr.some(str => {
          str.toLowerCase().includes(searchKey.toLowerCase()) && matches.push({example_word: obj["example_kanji"], example_match: str, example_reading: obj["example_reading"]})
        })
      })
    })

    console.log(matches)

    const distinctMatches = this.removeDuplicates(matches, "example_word")
    
    console.log(distinctMatches)
    const examplesToRender = distinctMatches.map(example => (
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
        <div className="col-8 col-md-9 col-lg-10 example-results d-flex flex-wrap">
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
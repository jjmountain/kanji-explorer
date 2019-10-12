import React, { Component } from 'react';
import './KanjiList.css';

class CardBack extends Component {

  render() { 
    const { kanji } = this.props


    // this is an array of the example kanji entries
    const kanjiArray = Object.keys(kanji.examples)

    console.log(kanjiArray)


    // this is an array of the hashes which have hiragana - english key-value pairs
    const nestedHash = Object.values(kanji.examples)

    console.log(nestedHash)


    // get the hiragana string for each example
    // iterate through nestedHash and pull out each key and value
    // key in the map is Object.keys(obj)[0]
    // how to pull out the key of the pair? use Object.keys()
    // get the english for each hiragana string
    // 


    const examplesEntries = nestedHash.slice(0, 3).map((obj, index) => (
      <>
        <tr>
          <td className='example-kanji pb-1'>{kanjiArray[index]}</td>
          <td className='example-reading pb-1 pl-4'>{Object.keys(obj)[0]}</td>
        </tr>
        <tr>
          <td colSpan="2" className='example-english pb-3'>{obj[Object.keys(obj)[0]][0].split(';')[0]}</td>
        </tr>
      </>
    ));



    return (
      <div className='flip-card-back'>
        <div className="card-content">
          <div className="top-info">
            <table className='kanji-table'>
              <tr>
                <td rowSpan='2' className='back-kanji'>{kanji.character}</td>
                <td className='kanji-reading'>{kanji.onyomi.slice(0,3).join(' | ')}</td>
                <td rowSpan='2' className='jlpt-info'>N{kanji.jlpt}</td>
              </tr>
              <tr>
                <td className='kanji-reading'>{kanji.kunyomi[0]}</td>
              </tr>
            </table>
          </div>
            <table>
            {examplesEntries}
            </table>
        </div>
      </div>
     );
  }
}
 
export default CardBack;
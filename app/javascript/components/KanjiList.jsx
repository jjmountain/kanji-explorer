import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './KanjiList.css';
import CardFront from './CardFront';
import CardBack from './CardBack';


class KanjiList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      kanjis: []
     };
  }

  componentDidMount() {
    const url = "/api/v1/kanjis/index";
    fetch(url)
      .then(response => {
        if (response.ok) {
          console.log(response)
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ kanjis: response }))
      .catch(() => this.props.history.push("/"));
  }

  render() {
    
    const { kanjis } = this.state;

    // store all the kanjis in state

    // render all the cards front and back
    const allKanjis = kanjis.map((kanji, index) => (
      <div key={index} className='col-md-6 col-lg-4'>
          <div className="flip-card">
            <div className="flip-card-inner">
              <CardFront kanji={kanji} />
              <CardBack  kanji={kanji} />
            </div>
          </div>
      </div>
    ))
    return (
      <div className="py-5">
        <div className="container">
          <div className="row">
            {allKanjis}
          </div>
        </div>
      </div>
     );
  }
}
 
export default KanjiList;
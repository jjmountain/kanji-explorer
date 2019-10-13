import React, { Component } from 'react';
import KanjiList from './KanjiList';
import axios from 'axios';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      kanjis: [],
      loading: false,
      value: ''
     }
  }

   componentDidMount() {
      const url = `/api/v1/kanjis/index/${this.state.value}`;
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => this.setState({ kanjis: response }))
        .catch(() => this.props.history.push("/"));
    }

    search = async val => {
      this.setState({ loading: true });
      const res = await axios(
        `/api/v1/kanjis/index/${val}`
      );
      const kanjis = await res.data;
    
      this.setState({ kanjis, loading: false });
    };

  handleChange = async e => {
    this.search(e.target.value);
    this.setState({ value: e.target.value });
  };

  render() { 
    return ( 
      <>
    <div className='jumbotron'>
      <h1 className="display-5">
        Welcome to Kanji Explorer
      </h1>
      <p className="lead">
        Use this site to explore all kinds of Japanese Kanji
      </p>
      <input 
        value={this.state.value}
        onChange={e => this.handleChange(e)}
        placeholder="type something to search"
      />
    </div>
    <KanjiList kanjis={this.state.kanjis}/>
  </>
     );
  }
}
 
export default Home;

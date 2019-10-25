import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import KanjiList from './KanjiList';
import axios from 'axios';
import './Home.css';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      character_matches: {},
      reading_matches: {},
      english_matches: {},
      radical_matches: {},
      example_matches: {},
      loading: false,
      resultsMessage: '',
      message: ''
     };
     this.cancel = '';
  }

    fetchSearchResults = async (updatedPageNumber = '', val) => {

      const pageNumber = updatedPageNumber ? `?page=${updatedPageNumber}` : '';

      const searchUrl = `/api/v1/kanjis/index/${val}${pageNumber}`;

      if (this.cancel) {
        // Cancel the previous request before making a new request
        this.cancel.cancel();
      }
      // Create a new CancelToken
      this.cancel = axios.CancelToken.source();

      axios.get(searchUrl, {
        cancelToken: this.cancel.token,
      })
      .then((res) => {
        this.setState({ 
          character_matches: {
            kanji: res.data.character_matches.kanjis,
            meta: res.data.character_matches.meta
          },
          reading_matches: {
            kanji: res.data.reading_matches.kanjis,
            meta: res.data.reading_matches.meta
          },
          english_matches: {
            kanji: res.data.english_matches.kanjis,
            meta: res.data.english_matches.meta
          },
          example_matches: {
            kanji: res.data.example_matches.kanjis,
            meta: res.data.example_matches.meta
          },
          loading: false

         });
      })
      .catch((error) => {
        if (axios.isCancel(error) || error) {
          this.setState({
            message: `Failed to fetch results. Please check network. ${error.message}`
          });
        }
      });
      };

  handleChange = async e => {
    const query = e.target.value
    if ( ! query) {
      this.setState({
        query,
        message: ''
      });
    } else {
      this.setState({
        query,
        loading: true,
        message: ''
      }, () => {
        this.fetchSearchResults(1, query);
      });
    }
  };

  render() { 

    const searchIcon = <FontAwesomeIcon icon={faSearch} className='search-icon'/>
    const { kanjis, character_matches, reading_matches, example_matches, english_matches, query, loading } = this.state
    return ( 
      <>
    <div className='jumbotron d-flex flex-column justify-content-center align-items-center'>
      <h1 className="display-5">
        kanji live search 
      </h1>
      <div className="search-input-container" >
      {searchIcon}
      <input 
        value={this.state.value}
        onChange={e => this.handleChange(e)}
        className='mt-4 search-input'
        placeholder='どうぞ'
      /> 
      </div>
    </div>

    <div className="container mb-5">
      <KanjiList 
        characters={character_matches} 
        readings={reading_matches}
        examples={example_matches}
        english={english_matches}
        query={query}
        loading={loading}
      />
    </div>

  </>
     );
  }
}
 
export default Home;

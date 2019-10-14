import React, { Component } from 'react';
import KanjiList from './KanjiList';
import axios from 'axios';
import { search } from './utils'


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '', 
      kanjis: [],
      loading: false,
      message: ''
     };
     this.cancel = '';
  }

  // when home component loads fetch from index and set state of kanjis to response

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

    fetchSearchResults = async (updatedPageNumber = '', val) => {

      const pageNumber = updatedPageNumber ? `&page=${updatedPageNumber}` : '';

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
        const resultNotFoundMsg = 
        !res.data.hits.length ? 'There are no more search results. Please try a new search.' : '';
        this.setState({ 
          loading: false,
          message: resultNotFoundMsg,
          kanjis: res.data 
         });
      })
      .catch((error) => {
        if (axios.isCancel(error) || error) {
          this.setState({
            loading: false,
            message: 'Failed to fetch results. Please check network.'
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

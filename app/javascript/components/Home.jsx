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
      meta: '',
      resultsMessage: ''
     };
     this.cancel = '';
  }

  // when home component loads fetch from index and set state of kanjis to response

   componentDidMount() {
      const url = `/api/v1/kanjis/index/${this.state.query}`;
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => this.setState({ kanjis: response.objects }))
        .catch(() => this.props.history.push("/"));
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
        const resultNotFoundMsg = 
        !res.data.objects.length ? 'There are no search results. Please try a new search.' : '';
        this.setState({ 
          loading: false,
          message: resultNotFoundMsg,
          kanjis: res.data.objects,
          meta: res.data.meta,
          resultsMessage: res.data.meta.total_count　=== 1 ? 
          `Found ${res.data.meta.total_count} result for ${this.state.query}` : 
          `Found ${res.data.meta.total_count} results for ${this.state.query}`
         });
         console.log('first then')
      })
      .then((res) => {
        const resultsNum = res.data.meta.total_count
        console.log('here')
        this.setState(
          {
          resultsMessage: `Found ${resultsNum} results`
        });
      })
      .catch((error) => {
        if (axios.isCancel(error) || error) {
          this.setState({
            loading: false,
            message: '`Failed to fetch results. Please check network. ${error.message}`'
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

  displayPagination() {
    if (this.state.meta.total_pages > 1) {
      return (
        this.state.meta.total<h5 className='py-3'>Found {this.state.meta.total_count} results for {this.state.query}</h5>
      )
    }
  }

  render() { 
    return ( 
      <>
    <div className='jumbotron text-center'>
      <h1 className="display-5">
        Kanji LiveSearch
      </h1>
      <input 
        value={this.state.value}
        onChange={e => this.handleChange(e)}
        placeholder="type something to search"
      />
    </div>
    <div className="container mb-5">
      <div style={{height: '3rem'}}>{this.state.resultsMessage}</div>
      {this.displayPagination()}
      <KanjiList kanjis={this.state.kanjis} />
    </div>
  </>
     );
  }
}
 
export default Home;

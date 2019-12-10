import React, { Component } from 'react';

class ReadingResults extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    console.log('readings', this.props.readings);
    return ( 
      <div>

      </div>
     );
  }
}
 
export default ReadingResults;
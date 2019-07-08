import React, { Component } from 'react'

class SearchBar extends Component {

  render() {
      return (
        <div className="locationsFilter" role="application">
          <input
          type="text"
          autoFocus
          id="query-Filter"
          placeholder="Search Beaches..."
          aria-label="Locations filter"
          value={this.props.query}
          onChange={event => this.props.updateQuery(event.target.value)}
          />
        </div>
      );
    }
}


export default SearchBar;

document.body.style = 'background: red;';
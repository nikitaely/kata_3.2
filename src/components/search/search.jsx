import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './search.css';
import filmSearch from '../../server-api/film-search';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { label } = this.state;
    const { updateMovies } = this.props; 

    if (label.trim()) {
      filmSearch(label)
        .then((searchInfo) => {
          updateMovies(searchInfo.results); 
        })
        .catch((error) => {
          console.error('Error searching for movies:', error);
        });

      this.setState({
        label: '',
      });
    }
  };

  onLabelChange = (e) => {
    const { value } = e.target;
    this.setState({
      label: value,
    });
  };

  render() {
    const { label } = this.state;

    return (
      <form onSubmit={this.onSubmit} className="search">
        <input
          className="search-input"
          placeholder="Type to search..."
          onChange={this.onLabelChange}
          value={label}
        />
      </form>
    );
  }
}

Search.propTypes = {
  updateMovies: PropTypes.func.isRequired,
};

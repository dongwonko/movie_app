import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

class App extends Component {

  //Render: componentWillMount() => render() => componentDidMount()
  //update: componentWillReceiveProps() => shouldComponentUpdate() => componentWillUpdate() => render() => componentDidUpdate()

  state = {};

  componentWillMount() {
    console.log('will mount');
  }

  componentDidMount() {
    this._getMovies();
  }

  componentWillReceiveProps() {
    console.log('will receive props');
  }

  shouldComponentUpdate(s) {
    console.log('should component update', s);
    return true;
  }

  componentWillUpdate() {
    console.log('will update');
  }

  componentDidUpdate() {
    console.log('did update');
  }

  _renderMovies = () => {
    const movies = this.state.movies.map(movie => {
      console.log(movie);
      return (
        <Movie 
          title={movie.title_english} 
          poster={movie.large_cover_image} 
          key={movie.id} 
          genres={movie.genres}
          synopsis={movie.synopsis} />
      );
    });
    return movies;
  };

  _getMovies = async () => {
    const movies = await this._callApi();
    this.setState({
      movies
    });
  };
  
  _callApi = () => {
    return fetch('https://cors-anywhere.herokuapp.com/https://yts.ag/api/v2/list_movies.json?sort_by=rating')
    .then(response => response.json())
    .then(json => json.data.movies)
    .catch(error => console.log(error));
  };

  render() {
    console.log('did render');
    const {movies} = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
        {movies ? this._renderMovies() : 'Loading'}
      </div>
    );
  }
}

export default App;

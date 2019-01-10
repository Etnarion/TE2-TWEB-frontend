import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Container, Button } from 'reactstrap'
import MovieListItem from '../MovieListItem'
import * as routes from '../../constants/routes'
import axios from 'axios'

class Films extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      films: [],
      selectedFilms: [],
      page: 1,
    }
  }

  fetchFilms = () => {
    axios.get(`https://te2-tweb-sam.herokuapp.com/3/movie/popular?page=${this.state.page}&api_key=f1be4bafe6f7cb0cb84f5948c5b75497`)
      .then(result => {
        this.setState({
          films: result.data.results
        })
      })
  }

  selectMovie = (film) => {
    if (this.state.selectedFilms.includes(film)) {
      var array = [...this.state.selectedFilms]; // make a separate copy of the array
      var index = array.indexOf(film)
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({selectedFilms: array});
      }
    } else {
      this.setState(prevState => ({
        selectedFilms: [...prevState.selectedFilms, film]
      }))
    }
	}

  componentDidMount() {
    this.fetchFilms()
  }

  render() {
    const { films, selectedFilms } = this.state

    return (
      <Container>
        <Link to={{
            pathname: routes.SUGGESTIONS,
            state: { selectedFilms: selectedFilms}
          }}
          style={{ marginTop: '10px' }}>
            Suggestions
          </Link>
        <div className="movieList">
          {films.map(film => (
            <div className="movieListItem" onClick={() => this.selectMovie(film)}>
              <MovieListItem
                selected={selectedFilms.indexOf(film) !== -1}
                key={film.id}
                film={film} 
              />
            </div>
          ))}
        </div>
      </Container>
    )
  }
}

export default withRouter(Films)
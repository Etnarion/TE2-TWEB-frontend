import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Container } from 'reactstrap'
import MovieListItem from '../MovieListItem'
import axios from 'axios'

class Films extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      films: [],
      selectedFilms: this.props.location.state.selectedFilms,
      page: 1
    }
  }

  fetchFilms = () => {
    const genres = []
    const films = []
    this.state.selectedFilms.forEach(film => {
      console.log(film)
      film.genre_ids.forEach(genre => {
        if (!genres.includes(genre)) {
          genres.push(genre)
        }
      })
    })
    axios.get(`https://te2-tweb-sam.herokuapp.com/3/movie/upcoming?page=${this.state.page}&api_key=f1be4bafe6f7cb0cb84f5948c5b75497`)
      .then(result => {
        result.data.results.forEach(film => {
          var toPush = false
          film.genre_ids.forEach(genre => {
            if (genres.includes(genre)) {
              toPush = true
            }
          })
          if (toPush) {
            films.push(film)
          }
        });
        this.setState(prevState => ({
          films: films
        }))
      })
  }

  componentDidMount() {
    this.fetchFilms()
  }

  render() {
    const { films } = this.state

    return (
      <Container>
        {films.map(film => (<MovieListItem onClick={e => this.selectMovie(film)} key={film.id} film={film} />))}
      </Container>
    )
  }
}

export default withRouter(Films)
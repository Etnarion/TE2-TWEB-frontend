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
      genres: [],
      selectedFilms: this.props.location.state.selectedFilms,
      page: 1
    }
  }

  fetchFilms = () => {
    this.state.selectedFilms.forEach(element => {
      axios.get(`https://te2-tweb-sam.herokuapp.com/3/movie/upcoming?page=${this.state.page}&api_key=f1be4bafe6f7cb0cb84f5948c5b75497`)
      .then(result => {
        this.setState(prevState => ({
          films: [...prevState.films, result]
        }))
      })
    });
    
  }

  selectMovie = (film) => {
    localStorage.getItem('preferences') ? localStorage.getItem('preferences').push(film) : localStorage.setItem('film', [film])
  }
  
  onPreviousClick = () => {
    this.setState(prevState => ({
      page: prevState.page - 1
    }), this.fetchFilms)
  }

  onNextClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1
    }), this.fetchFilms)
  }

  componentDidMount() {
    this.fetchFilms()
  }

  render() {
    const { selectedFilms } = this.state

    return (
      <Container>
        {selectedFilms.map(film => (<MovieListItem onClick={e => this.selectMovie(film)} key={film.id} film={film} />))}
      </Container>
    )
  }
}

export default withRouter(Films)
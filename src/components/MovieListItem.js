import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'reactstrap'

class MovieListItem extends React.Component {
  static propTypes = {
		film: PropTypes.object.isRequired,
		selected: PropTypes.bool
  }

	constructor(props) {
		super(props)
		this.state = {
			film: props.film,
			error: null,
		}
	}

	render() {
		const { selected } = this.props
		const { film, error } = this.state
		if (error) {
			return (
				<Alert color="danger" className="mt-3">{error.message}</Alert>
			)
		} else {
			return (
				<img
					style={selected ? { border: '3px solid #aaa' } : {}}
					className="movie_poster"
					width='150px'
					src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
				/>
			)
		}
	}
}

export default MovieListItem
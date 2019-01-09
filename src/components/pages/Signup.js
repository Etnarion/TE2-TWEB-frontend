import React from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

class SignUpPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			users: []
		}
	}

	componentDidMount() {
		axios.get('http://localhost:8081/users')
			.then(result => {
				this.setState({
					users: result.data
				})
			})
	}

	render() {
		return (
			<div>{this.state.users.map(user => <p key={user.email}>{user.name}</p>)}</div>
		)
	}
}

export default withRouter(SignUpPage)
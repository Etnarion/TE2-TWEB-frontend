import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Container, Button, Form, FormGroup, FormFeedback, Label, Input, Alert } from 'reactstrap'
import * as routes from '../../constants/routes'
import axios from 'axios'

const byPropKey = (propertyName, value) => () => ({
	[propertyName]: value
})

const INITIAL_STATE = {
	name: '',
	email: '',
	passwordOne: '',
	passwordTwo: '',
	error: null,
	verticalPos: 0,
	mainHeight: 0
}

class SignUpPage extends React.Component {
	static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired
	}
	
	constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

	componentDidMount() {
		window.addEventListener('resize', this.updateDimensions)
    this.updateDimensions()
	}

	componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
    document.body.style.overflow = 'scroll'
	}
	
	updateDimensions = () => {
    const headerHeight = 80
    const windowHeight = window.innerHeight
    const containerHeight = this.container.clientHeight

    // Set container vertical position and main container height
    const verticalPos = Math.max((windowHeight / 2) - (containerHeight / 2), headerHeight + 50)
    const mainHeight = Math.max(window.innerHeight - headerHeight, containerHeight + 100)
    // Enable or disable scroll
    if (verticalPos > headerHeight + 50) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'scroll'
    }

    // State
    this.setState({ verticalPos, mainHeight })
	}
	
	onSubmit = (event) => {
    const {
      name,
      email,
      passwordOne
		} = this.state

		const {
      history
		} = this.props
		
		axios.post(process.env.REACT_APP_BACKEND_URL+'/signup', { name, email, password: passwordOne })
			.then(
				history.push(routes.HOME)
			)
			.catch(error => this.setState({ error }))

    event.preventDefault()
	}
	
	isValidPassword = () => (this.state.error === null ? false :
    this.state.error.message.includes('Password'))

  isValidEmail = () => (this.state.error === null ? false :
    this.state.error.message.includes('email'))

	render() {
		const {
      name,
      email,
      passwordOne,
      passwordTwo,
      error,
      verticalPos,
      mainHeight
    } = this.state

    return (
      <div
        className="main-dark"
        style={{ minHeight: `${mainHeight}px` }}
      >
        <Container>
          <div
            ref={(elem) => { this.container = elem }}
            className="sign-form-container justify-content-center"
            style={{ top: `${verticalPos}px` }}
          >
            <h1 className="text-center">Sign Up</h1>
            <Form onSubmit={this.onSubmit}>
              { error && <Alert color="dark-danger" className="mt-3">{error.message}</Alert> }
              <FormGroup>
                <Label for="signUpEmail">FULL NAME</Label>
                <Input
                  id="signUpName"
                  value={name}
                  onChange={event => this.setState(byPropKey('name', event.target.value))}
                  type="text"
                  placeholder="Full Name"
                  className="sign-form"
                />
              </FormGroup>
              <FormGroup>
                <Label className="d-inline" for="signUpEmail">EMAIL</Label>
                { this.isValidEmail() && <FormFeedback className="d-inline">{' - '}Invalid email</FormFeedback> }
                <Input
                  id="signUpEmail"
                  value={email}
                  onChange={event => this.setState(byPropKey('email', event.target.value))}
                  type="email"
                  placeholder="Email Address"
                  className="sign-form"
                />
              </FormGroup>
              <FormGroup>
                <Label className="d-inline" for="signUpPasswordOne">PASSWORD</Label>
                { this.isValidPassword() && <FormFeedback className="d-inline">{' - '}Invalid password</FormFeedback> }
                <Input
                  id="signUpPasswordOne"
                  value={passwordOne}
                  onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                  type="password"
                  placeholder="Password"
                  className="sign-form"
                />
              </FormGroup>
              <FormGroup>
                <Label className="d-inline" for="signUpPasswordTwo">CONFIRM PASSWORD</Label>
                { this.isValidPassword() && <FormFeedback className="d-inline">{' - '}Invalid password</FormFeedback> }
                <Input
                  id="signUpPasswordTwo"
                  value={passwordTwo}
                  onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                  type="password"
                  placeholder="Password"
                  className="sign-form"
                />
              </FormGroup>
              <Button color="brand" type="submit" className="action-btn">
                Sign Up
              </Button>
            </Form>
          </div>
        </Container>
      </div>
    )
	}
}

export default withRouter(SignUpPage)
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { Container, Button, Form, FormGroup, FormFeedback, Label, Input, Alert } from 'reactstrap'
import * as routes from '../../constants/routes'
import axios from 'axios'

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
})

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  verticalPos: 0,
  mainHeight: 0
}

class SignInPage extends Component {
  static propTypes = {
    history: PropTypes.PropTypes.shape({
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
    event.preventDefault()
    const {
      email,
      password
    } = this.state

    const {
      history
		} = this.props
			axios.post(process.env.REACT_APP_BACKEND_URL+'/signin', { email, password })
      .then((result) => {
				this.setState({ ...INITIAL_STATE })
				localStorage.setItem('user', result.data.user)
        history.push(routes.HOME)
      })
      .catch((error) => {
        this.setState(byPropKey('error', error))
      })
  }

  isValidPassword = () => (this.state.error === null ? false :
    this.state.error.message.includes('password'))

  isValidIdentifier = () => (this.state.error === null ? false :
    this.state.error.message.includes('identifier') || this.state.error.message.includes('email'))

  render() {
    const {
      email,
      password,
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
            <h1 className="text-center">Sign In</h1>
            <Form onSubmit={this.onSubmit}>
              { error && <Alert color="dark-danger" className="mt-3">{error.message}</Alert> }
              <FormGroup>
                <Label className="d-inline" for="signInEmail">EMAIL</Label>
                { this.isValidIdentifier() && <FormFeedback className="d-inline">{' - '}Invalid email</FormFeedback> }
                <Input
                  invalid={this.isValidIdentifier()}
                  id="signInEmail"
                  value={email}
                  onChange={event => this.setState(byPropKey('email', event.target.value))}
                  type="email"
                  placeholder="Email Address"
                  className="sign-form"
                />
              </FormGroup>
              <FormGroup>
                <Label className="d-inline" for="signInPassword">PASSWORD</Label>
                { this.isValidPassword() && <FormFeedback className="d-inline">{' - '}Invalid password</FormFeedback> }
                <Input
                  invalid={this.isValidPassword()}
                  id="signInPassword"
                  value={password}
                  onChange={event => this.setState(byPropKey('password', event.target.value))}
                  type="password"
                  placeholder="Password"
                  className="sign-form"
                />
              </FormGroup>
              <Button color="brand" type="submit" className="action-btn">
                Sign In
              </Button>
            </Form>
            <p>
              Don&apos;t have an account yet ?
              {' '}
              <Link to={routes.SIGNUP}>Sign up</Link>
            </p>
          </div>
        </Container>
      </div>
    )
  }
}

export default withRouter(SignInPage)
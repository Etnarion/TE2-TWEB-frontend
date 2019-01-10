import React from 'react'
import { Switch, Route } from 'react-router-dom'
import * as routes from '../constants/routes'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Films from './pages/Films'
import Upcoming from './pages/Upcoming'
import Suggestions from './pages/Suggestions'

const Main = () => (
	<div>
		<Switch>
			<Route exact path={routes.HOME} component={Home} />
			<Route exact path={routes.SIGNIN} component={Signin} />
			<Route exact path={routes.SIGNUP} component={Signup} />
			<Route exact path={routes.FILMS} component={Films} />
			<Route exact path={routes.UPCOMING} component={Upcoming} />
			<Route exact path={routes.SUGGESTIONS} component={Suggestions} />
		</Switch>
	</div>
)

export default Main
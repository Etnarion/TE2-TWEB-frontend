import React from 'react'
import { Switch, Route } from 'react-router-dom'
import * as routes from '../constants/routes'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'

const Main = () => (
	<div>
		<Switch>
			<Route exact path={routes.HOME} component={Home} />
			<Route exact path={routes.SIGNIN} component={Signin} />
			<Route exact path={routes.SIGNUP} component={Signup} />
		</Switch>
	</div>
)

export default Main
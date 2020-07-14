import React, {Component, Suspense} from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
// import * as utils from '../utils';
// import { Appear } from '../components/transitions';
import {ConnectedRouter} from 'connected-react-router';
import Loading from '../components/Loading';
import NoMatch from '../components/NoMatch';
import Login from '../components/Login';
import Admin from '../components/admin/Admin';

import {withRoomContext} from '../components/RoomContext';
import {connect} from 'react-redux';
// const Login = lazy(() => import(/* webpackChunkName: "Login" */ '../mobile/Login'));
import {createHashHistory} from 'history';

const history = createHashHistory();

class AppRouter extends Component {

	render() {
		const {loading} = this.props;
		
		
		if (loading) {
			return <Loading/>
		}
		
		return (
			<ConnectedRouter history={history}>
				<Suspense fallback={<div/>}>
					<Router>
						<Switch>
							<Route exact path='/login' component={Login}/>
							<Route path='/' component={Admin}/>
							<Route path='/error' component={NoMatch}/>
							<Route component={NoMatch}/>
						</Switch>
					</Router>
				</Suspense>
			</ConnectedRouter>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.loading
	};
};

const AppRouterContainer = withRoomContext(connect(
	mapStateToProps
)(AppRouter));

export default AppRouterContainer;

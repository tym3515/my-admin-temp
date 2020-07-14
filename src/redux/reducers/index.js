import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import me from './me';
import notifications from './notifications';
import files from './files';
import language from './language';
import fetchdata from './fetchdata';
import content from './content';
import header from './header';
import sider from './sider';
import admin from './admin';

export default function createRootReducer(history) {
	return combineReducers({
		router: connectRouter(history),
		me,
		notifications,
		language,
		fetchdata,
		files,
		content,
		header,
		sider,
		admin
	})
}

import React from 'react';
const RoomContext = React.createContext();

export default RoomContext;

export function withRoomContext(Component) {
	return (props) => (
		<RoomContext.Consumer>
			{({Language, Client, dispatch}) =>
				<Component {...props} Language={Language} Client={Client} dispatch={dispatch}/>
			}
		</RoomContext.Consumer>
	);
}
const initialState =
	{
		adminUsers:[],
		webUsers:[],
	
	};
const admin = (state = initialState, action) =>
{
	switch (action.type)
	{
		case 'SET_ADMIN_USERS':
		{
			const { data } = action.payload;
			
			return { ...state, adminUsers:data };
		}
		
		case 'SET_WEB_USERS':
		{
			const { data } = action.payload;
			
			return { ...state, webUsers:data };
		}
		
		default:
			return state;
	}
};

export default admin;

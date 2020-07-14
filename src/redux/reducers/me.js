const initialState =
{
	user_id: '',
	username: null,
	loggedIn: false,
	permission: [],
	cityList: null,
	attrList: null,
	viewImage:null
};

const me = (state = initialState, action) =>
{
	switch (action.type)
	{
		case 'SET_ME':
		{
			const data= action.payload;

			return {...state,...data};
		}

		case 'LOGGED_IN':
			return { ...state, loggedIn: true };

		case 'USER_LOGOUT':
			return { ...state, loggedIn: false };
		
		case 'SET_PERMISSION':
		{
			const {permission}= action.payload;
			
			return {...state,permission};
		}
		
		case 'SET_ME_CITY_LIST':
		{
			const {cityList}= action.payload;
			
			return {...state,cityList};
		}
		
		case 'SET_ME_VIEW_IMAGE':
		{
			const {viewImage}= action.payload;
			
			return {...state,viewImage};
		}
		
		case 'SET_ME_ATTR_LIST':
		{
			const {attrList}= action.payload;
			
			return {...state,attrList};
		}
		
		default:
			return state;
	}
};

export default me;

const initialState =
{

};

const fetchdata = (state = initialState, action) =>
{
	switch (action.type)
	{
		case 'SET_FETCH_DATA':
		{
			const data = action.payload;

			return { ...state, ...data };
		}

		default:
			return state;
	}
};

export default fetchdata;

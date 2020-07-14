const initialState =
	{

	};
const Language = (state = initialState, action) =>
{
	switch (action.type)
	{
		case 'SET_LANGUAGE_INIT':
		{
			const { language, lang } = action.payload;

			return { ...state, ...language, lang };
		}

		default:
			return state;
	}
};

export default Language;

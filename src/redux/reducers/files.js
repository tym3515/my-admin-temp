const files = (state = [], action) =>
{
	switch (action.type)
	{
		case 'ADD_FILE':
		{
			const { file } = action.payload;

			const newFile = {
				active   : false,
				progress : 0,
				files    : null,
				me       : false,
				type     : file.type,
				name     : file.name,
				...file,
				addTime  : Date.now(),
				docId    : file.docId.toString()
			};

			return [ ...state, newFile ];
		}

		case 'ADD_FILE_HISTORY':
		{
			const { fileHistory } = action.payload;
			const newFileHistory = [];

			fileHistory.forEach((file) =>
			{
				const newFile = {
					active   : false,
					progress : 0,
					me       : false,
					...file,
					addTime  : Date.now(),
					docId    : file.docId.toString()
				};

				newFileHistory.push(newFile);
			});

			return [ ...state, ...newFileHistory ];
		}

		case 'SET_FILE_ACTIVE':
		{
			const { magnetUri } = action.payload;
			const file = state[magnetUri];

			const newFile = { ...file, active: true };

			return { ...state, [magnetUri]: newFile };
		}

		case 'SET_FILE_INACTIVE':
		{
			const { magnetUri } = action.payload;
			const file = state[magnetUri];

			const newFile = { ...file, active: false };

			return { ...state, [magnetUri]: newFile };
		}

		case 'SET_FILE_PROGRESS':
		{
			const { magnetUri, progress } = action.payload;
			const file = state[magnetUri];

			const newFile = { ...file, progress: progress };

			return { ...state, [magnetUri]: newFile };
		}

		case 'SET_FILE_DONE':
		{
			const { magnetUri, sharedFiles } = action.payload;
			const file = state[magnetUri];

			const newFile = {
				...file,
				files    : sharedFiles,
				progress : 1,
				active   : false,
				timeout  : false
			};

			return { ...state, [magnetUri]: newFile };
		}

		case 'REMOVE_FILE':
		{
			const { docId } = action.payload;

			// delete state[docId];
			state.forEach((file, i) =>
			{
				if (file.docId === docId)
				{
					state.splice(i, 1);

					return;
				}
			});

			return [ ...state ];
		}

		case 'FILTER_FILE':
		{
			const { value, list } = action.payload;

			const newArr = list.filter((item) => item.name.includes(value));

			return [ ...newArr ];
		}

		case 'DROP_MESSAGES':
		{
			return [];
		}

		default:
			return state;
	}
};

export default files;

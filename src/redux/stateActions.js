export const setRoomLanguage = (language, lang) =>
({
	type: 'SET_LANGUAGE_INIT',
	payload: {language, lang}
});

export const setRoomNotBower = (notBower) =>
{
	return {
		type    : 'SET_ROOM_NOT_BOWER',
		payload : { notBower }
	};
};

export const setRoomWxBower = (isWxBower) =>
{
	return {
		type    : 'SET_ROOM_WX_BOWER',
		payload : { isWxBower }
	};
};

export const setMe = (data) =>
{
	return {
		type    : 'SET_ME',
		payload : data
	};
};

export const setMePermission = (permission) =>
{
	return {
		type    : 'SET_PERMISSION',
		payload : { permission }
	};
};

export const setMeCurSilder = (curMoudle, curSider) =>
{
	return {
		type    : 'SET_CUR_SLIDER',
		payload : { curMoudle, curSider }
	};
};


export const setAdminUsers = (data) =>
{
	return {
		type    : 'SET_ADMIN_USERS',
		payload : { data }
	};
};

export const setWebUsers = (data) =>
{
	return {
		type    : 'SET_WEB_USERS',
		payload : { data }
	};
};

export const setMeCityList = (cityList) =>
{
	return {
		type    : 'SET_ME_CITY_LIST',
		payload : { cityList }
	};
};

export const setMeViewImage = (viewImage) =>
{
	return {
		type    : 'SET_ME_VIEW_IMAGE',
		payload : { viewImage }
	};
};

export const setMeAttrList = (attrList) =>
{
	return {
		type    : 'SET_ME_ATTR_LIST',
		payload : { attrList }
	};
};



















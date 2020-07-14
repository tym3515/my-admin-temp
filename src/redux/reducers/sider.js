import {defaultSider} from '../../config';

const initialState =
{
	curMoudle:{'':''},
	curSider:sessionStorage.curSider || defaultSider,
	systemMange:[
		{label:'城市管理',router:'cityManage', iconType:'edit'},
		{label:'属性管理',router:'attrManage', iconType:'edit'},
		// {label:'权限管理',router:'permMange'},
		{label:'日志查看',router:'logView', iconType:'edit'},
	],
	userMange:[
		{label:'用户管理',router:'userMange', iconType:'edit'},
		{label:'账号恢复',router:'userEnabled', iconType:'edit'},
	],
	orderStat:[
		{label:'订单统计',router:'orderStat', iconType:'file-text'},
	],
	storeManage:[
		{label:'货架管理',router:'storeManage', iconType:'folder'},
		{label:'仓库管理',router:'storehouseManage', iconType:'folder'},
		{label:'分类管理',router:'classManage', iconType:'folder'},
		{label:'货架物品',router:'storeItems', iconType:'file-text'},
		{label:'需求物品',router:'demandItem', iconType:'file-text'},
		{label:'报废物品',router:'scrapItem', iconType:'file-text'},
	],
	orderManage:[
		{label:'审核订单',router:'verifyOrder', iconType:'folder'},
		{label:'待配货订单',router:'pendingOrder', iconType:'hdd'},
		{label:'待归还订单',router:'returnOrder', iconType:'folder'},
		{label:'已归还订单',router:'returnedOrder', iconType:'folder'},
		{label:'历史订单',router:'historyOrder', iconType:'folder'},
		{label:'道具损坏',router:'propsDamaged', iconType:'edit'},
		{label:'道具丢失',router:'propsLost', iconType:'edit'},
	],
};
const sider = (state = initialState, action) =>
{
	switch (action.type)
	{
		case 'SET_CUR_SLIDER':
		{
			const { curMoudle, curSider } = action.payload;
			
			return { ...state, curMoudle, curSider };
		}
		
		default:
			return state;
	}
};

export default sider;

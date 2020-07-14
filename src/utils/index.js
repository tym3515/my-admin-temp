// import Http from './Http';
import axios from "./request";

function post({url, params}) {
	return axios({
		method: 'post',
		url: url,
		data:params
	});
}
function get({url, params, responseType}) {
	return axios({
		method: 'get',
		url: url,
		params:params,
		responseType
	});
}

function IdRequest({url, id, query}) {
	return get({
		url: url+id,
		params: query
	});
}
// 修改密码
export const fetchEditpwd = query => {
	return post({
		url: 'editpwd',
		params: query
	});
};

// 权限获取
export const fetchPermission = (query,id) => {
	return IdRequest({
		url: 'permission/',
		id,
		query
	});
};

// 登陆
export const doLogin = (query) =>
{
	return post({
		url: 'login',
		params: query
	});
};

// 退出登录
export const doLogout = (query) =>
{
	return post({
		url: 'logout',
		params: query
	});
};

// 前台用户修改
export const receptionUserEdit = (query) =>
{
	return post({
		url: 'reception_user/edit',
		params: query
	});
};

// 前台用户添加
export const receptionUserAdd = (query) =>
{
	return post({
		url: 'reception_user/add',
		params: query
	});
};

// 后台用户修改
export const backUserEdit = (query) =>
{
	return post({
		url: 'back_user/edit',
		params: query
	});
};

// 后台用户添加
export const backUserAdd = (query) =>
{
	return post({
		url: 'back_user/add',
		params: query
	});
};

// 后台用户权限选择
export const getPermissionList = (query) =>
{
	return get({
		url: 'permission/list',
		params: query
	});
};

// 开通｜注销账户 状态1:开通2:注销
export const setUserEnabled = (query) =>
{
	return post({
		url: 'user/enabled',
		params: query
	});
};

// 账户状态修改 状态1:正常2:冻结3:删除
export const userStatusEdit = (query) =>
{
	return post({
		url: 'user_status/edit',
		params: query
	});
};

// 用户列表
export const getUserList = (query) =>
{
	return get({
		url: 'user/list',
		params: query
	});
};

// 用户列表
export const getUserQueryList = (query,id) =>
{
	return IdRequest({
		url: 'back_user/',
		id,
		query
	});
};

// 重置密码
export const doResetpwd = (query) =>
{
	return post({
		url: 'resetpwd',
		params: query
	});
};

// 城市修改
export const doCityEdit = (query) =>
{
	return post({
		url: 'city/edit',
		params: query
	});
};

// 城市列表
export const getCityList = (query) =>
{
	return get({
		url: 'city/list',
		params: query
	});
};

// 城市删除
export const doCityDelete = (query) =>
{
	return post({
		url: 'city/delete',
		params: query
	});
};

// 城市添加
export const doCityAdd = (query) =>
{
	return post({
		url: 'city/add',
		params: query
	});
};

// 获取日志列表
export const getLogList = (query) =>
{
	return get({
		url: 'log/list',
		params: query
	});
};
// log_id 接口地址：log/delete 请求方式：post
// 删除日志
export const doLogDel = (query) =>
{
	return post({
		url: 'log/delete',
		params: query
	});
};

// 订单统计
export const getOrderStat = (query) =>
{
	return get({
		url: 'order/stat',
		params: query
	});
};

// 订单统计1
export const getUserOrderStat = (query) =>
{
	return get({
		url: 'used/stat',
		params: query
	});
};

// 订单统计2
export const getOrderDeliverStat = (query) =>
{
	return get({
		url: 'order/deliver',
		params: query
	});
};

// 订单统计3
export const getUsedOrderPriceStat = (query) =>
{
	return get({
		url: 'used/price',
		params: query
	});
};


/*
* 货物管理
* */
// 批量删除货架
export const doStoreDeleteAll = (query) =>
{
	return post({
		url: 'store/deleteall',
		params: query
	});
};

// 货架修改
export const doStoreEdit = (query) =>
{
	return post({
		url: 'store/edit',
		params: query
	});
};

// 货架列表
export const doStoreList = (query) =>
{
	return get({
		url: 'store/list',
		params: query
	});
};

// 货架列表（树状）
export const doStoreIndex = (query) =>
{
	return get({
		url: 'store/index',
		params: query
	});
};

// 货架删除
export const doStoreDelete = (query) =>
{
	return post({
		url: 'store/delete',
		params: query
	});
};

// 货架添加
export const doStoreAdd = (query) =>
{
	return post({
		url: 'store/add',
		params: query
	});
};
/*
仓库管理
*/

// 仓库列表
export const getDepotList = (query) =>
{
	return get({
		url: 'depot/list',
		params: query
	});
};

// 仓库全部列表
export const getDepotAllList = (query) =>
{
	return get({
		url: 'depot/name',
		params: query
	});
};

// 仓库详情
export const doDepotDetail = (query,id) =>
{
	return IdRequest({
		url: 'depot/',
		id,
		query
	});
};

// 仓库添加
export const doDepotAdd = (query) =>
{
	return post({
		url: 'depot/add',
		params: query
	});
};

// 仓库修改
export const doDepotEdit = (query) =>
{
	return post({
		url: 'depot/edit',
		params: query
	});
};

// 仓库删除
export const doDepotDelete = (query) =>
{
	return post({
		url: 'depot/delete',
		params: query
	});
};

// 仓库是否使用 1:使用;2:禁用
export const doDepotEnabled = (query) =>
{
	return post({
		url: 'depot/enabled',
		params: query
	});
};

/*
* 商品管理
* */
// 商品列表
export const getProductList = (query) =>
{
	return get({
		url: 'product/list',
		params: query
	});
};

// 商品详情
export const getProductDetail = (query,id) =>
{
	return IdRequest({
		url: 'product/',
		id,
		query
	});
};
// 商品添加
export const ProductAdd = (query) =>
{
	return post({
		url: 'product/add',
		params: query
	});
};

// 商品修改
export const getProductEdit = (query) =>
{
	return post({
		url: 'product/edit',
		params: query
	});
};

// 商品删除
export const getProducDelete = (query) =>
{
	return post({
		url: 'product/delete',
		params: query
	});
};

// 商品图片列表 product_id
export const doPictureList = (query) =>
{
	return get({
		url: 'picture/list',
		params: query
	});
};

// 商品图片添加
export const doPictureAdd= (query) =>
{
	return post({
		url: 'picture/add',
		params: query
	});
};

// 商品图片修改
export const doPictureEdit= (query) =>
{
	return post({
		url: 'picture/edit',
		params: query
	});
};

// 商品图片删除
export const doPictureDelete= (query) =>
{
	return post({
		url: 'picture/delete',
		params: query
	});
};

/*
* 分类管理
* */
// 分类列表
export const getTypeList= (query) =>
{
	return get({
		url: 'type/list',
		params: query
	});
};

// 分类详情
export const getTypeDetail= (query,id) =>
{
	return IdRequest({
		url: 'type/',
		id,
		query
	});
};

// 分类添加
export const doTypeAdd = (query) =>
{
	return post({
		url: 'type/add',
		params: query
	});
};

// 分类修改
export const doTypeEdit = (query) =>
{
	return post({
		url: 'type/edit',
		params: query
	});
};

// 分类删除
export const doTypeDelete = (query) =>
{
	return post({
		url: 'type/delete',
		params: query
	});
};

// 分类是否使用
export const doTypeEnabled = (query) =>
{
	return post({
		url: 'type/enabled',
		params: query
	});
};

// 分类
export const doClassIndex = (query) =>
{
	return get({
		url: 'type/index',
		params: query
	});
};


/*
* 订单管理
*
*/
// 订单列表
export const getOrderList = (query) =>
{
	return get({
		url: 'order/list',
		params: query
	});
};

// 订单明细
export const getOrderInfo = (query) =>
{
	return get({
		url: 'order/info',
		params: query
	});
};

// 批量删除订单
export const doOrderBatchdelete = (query) =>
{
	return post({
		url: 'order/batchdelete',
		params: query
	});
};

// 订单删除
export const getOrderDelete = (query) =>
{
	return post({
		url: 'order/delete',
		params: query
	});
};

// 审核订单删除 order/product/delete post 参数：order_id，order_product_id
export const setOrderProductDelete = (query) =>
{
	return post({
		url: 'order/product/delete',
		params: query
	});
};

// 订单审核
export const getOrderAudit = (query) =>
{
	return post({
		url: 'order/audit',
		params: query
	});
};

// 出货
export const setOrderDeliver = (query) =>
{
	return post({
		url: 'order/deliver',
		params: query
	});
};

// 反审核
export const getOrderResetaudit = (query) =>
{
	return post({
		url: 'order/resetaudit',
		params: query
	});
};

// 归还
export const setOrderGiveback = (query) =>
{
	return post({
		url: 'order/giveback',
		params: query
	});
};

// 损坏归还
export const setDamageReturn = (query) =>
{
	return post({
		url: 'damage/return',
		params: query
	});
};

// 丢失归还
export const setDamageLoseReturn = (query) =>
{
	return post({
		url: 'lose/return',
		params: query
	});
};

// 快速归还
export const setQuickReturn = (query) =>
{
	return post({
		url: 'quick/return',
		params: query
	});
};

// 批量归还
export const setBatchQuickReturn = (query) =>
{
	return post({
		url: 'batch/quickreturn',
		params: query
	});
};

// 道具损坏
export const getOrderDamage = (query) =>
{
	return get({
		url: 'order/damage',
		params: query
	});
};



// 需求物品
export const getNeedList = (query) =>
{
	return get({
		url: 'need/list',
		params: query
	});
};

// 需求物品删除  need_product_id
export const setNeedDelete = (query) =>
{
	return post({
		url: 'need/delete',
		params: query
	});
};


// 表格下载
export const fownloadExcelFetch = (query) =>
{
	return post({
		url: 'down',
		params: query
	});
};



/*
用户导出
字段	名称	类型	是否必填	备注
label	标签	string	false	back:后台,reception:前台
status	状态	string	false	normal:正常
user_id	用户id	array	false
*/
export const doExportUser = (query) =>
{
	return get({
		url: 'export/user',
		params: query,
        responseType: 'blob'
	});
};
/*
货架导出
store_id
*/
export const doExportStore = (query) =>
{
	return get({
		url: 'export/store',
		params: query,
        responseType: 'blob'
	});
};
/*
仓库导出 depot_id
*/
export const doExportDepot = (query) =>
{
	return get({
		url: 'export/depot',
		params: query,
        responseType: 'blob'
	});
};
/*
分类导出 type_id
*/
export const doExportType = (query) =>
{
	return get({
		url: 'export/type',
		params: query,
        responseType: 'blob'
	});
};

/*
货架物品导出product_id
*/
export const doExportProduct = (query) =>
{
	return get({
		url: 'export/product',
		params: query,
        responseType: 'blob'
	});
};
/*
需求物品导出 need_product_id
*/
export const doExportNeedProduct = (query) =>
{
	return get({
		url: 'export/need_product',
		params: query,
        responseType: 'blob'
	});
};

/*
订单导出
type	类型	int	true	1:待审核;2:待配货;3:待归还;4:已归还;5:历史 默认为1
order_id	订单id	array	false
*/
export const doExportOrder = (query) =>
{
	return get({
		url: 'export/order',
		params: query,
        responseType: 'blob'
	});
};
/*
道具损坏导出 order_product_id
*/
export const doExportDamage = (query) =>
{
	return get({
		url: 'export/damage',
		params: query,
        responseType: 'blob'
	});
};


/*
下载导入模板
*/
export const importTemplate = (query) =>
{
	return get({
		url: 'product/template',
		params: query,
		responseType: 'blob'
	});
};


/*
导入模板上传
*/
export const doTemplateUpload = (query) =>
{
	return post({
		url: 'import/product',
		params: query,
		responseType: 'blob'
	});
};




/*
订单修改
*/
export const doOrderUpdate = (query) =>
{
	return post({
		url: 'order/update',
		params: query,
	});
};

// 道具丢失列表
export const setOrderLost = (query) =>
{
	return get({
		url: 'order/lose',
		params: query
	});
};


// 属性添加
export const setAttrAdd = (query) =>
{
	return post({
		url: 'attr/add',
		params: query
	});
};

// 属性修改
export const setAttrEdit = (query) =>
{
	return post({
		url: 'attr/edit',
		params: query
	});
};

// 属性列表
export const getAttrList = (query) =>
{
	return get({
		url: 'attr/list',
		params: query
	});
};


// 商品占用
export const setProductOccupy = (query) =>
{
	return post({
		url: 'product/occupy',
		params: query
	});
};


// 商品报废
export const setProductScrap = (query) =>
{
	return post({
		url: 'product/scrap',
		params: query
	});
};


// 商品归还
export const setProductReturn = (query) =>
{
	return post({
		url: 'product/return',
		params: query
	});
};

// 商品报废列表
export const getScrapList = (query) =>
{
	return get({
		url: 'scrap/list',
		params: query
	});
};

// 商品批量删除 product/batchdelete post 参数:product_id array
export const setProductBatchdelete = (query) =>
{
	return post({
		url: 'product/batchdelete',
		params: query
	});
};

// 下拉框的数据 field/option get  参数：field （type：分类，product：物品）
export const getFieldoption = (query) =>
{
	return get({
		url: 'field/option',
		params: query
	});
};
/*
export/scrap_product 报废商品 get product_id
*/
export const doExportScrapProduct = (query) =>
{
	return get({
		url: 'export/scrap_product',
		params: query,
		responseType: 'blob'
	});
};

/*
export/lose 道具丢失 get order_product_id
*/
export const doExportLoseProduct = (query) =>
{
	return get({
		url: 'export/lose',
		params: query,
		responseType: 'blob'
	});
};






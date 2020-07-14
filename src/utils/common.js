import React from 'react';
import Logger from '../log/Logger';
import * as stateActions from '../redux/stateActions';
import { message, Modal } from 'antd';
import UrlParse from 'url-parse';
import localforage from 'localforage';
import {doOrderBatchdelete, getCityList} from "./index";
const EventEmitter = require('events');
// const querystring = require('querystring');
// import {} from '../config';

const { confirm } = Modal;
const logger = new Logger('Client');

let store,
	isSDK;

export default class Client
{
	static init(data)
	{
		store = data.store;
	}
	
	constructor({
			device,Config
	})
	{
		logger.debug('constructor() ',device,Config);
		
		// init meeting Config
		this._Config = Config;
		
		// const {
			// neednormalPassword, // 是否需要会议密码
		// } = Config;
		
		const urlParser = new UrlParse(window.location.href, true);
		
		if (urlParser.query.confMode)
			this._roomConfMode = urlParser.query.confMode;
		
		// Closed flag
		this._closed = false;
		
		this._doneJoining = false;
	
		const UA = navigator.userAgent;
		
		this._isIOS = Boolean(UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)); // ios终端
		this._isAndroid = UA.indexOf('Android') > -1 || UA.indexOf('Adr') > -1; // android终端;
		this._isWeChat = UA.toLowerCase().indexOf('micromessenger') > -1; // 安卓微信终端;
		
		if (this._isIOS) device.flag = 'webIOS';
		if (this._isAndroid) device.flag = 'webAndroid';
		if (this._isWeChat) device.flag = 'WeChat';
		
		localforage.getItem('data').then((data)=>{
			this.defaultData = data;
			// logger.debug('localforage defaultData',this.defaultData);
		});
		
		
		this._consumers = new Map();
		
		this._startKeyListener();
		
		this._eventListener = new EventEmitter();
	
	}
	
	_startKeyListener()
	{
		// document.addEventListener('keypress', (event) =>
		// {
		// 	const key = String.fromCharCode(event.which);
		//
		// 	logger.debug('keyPress() ', event);
		//
		// 	const source = event.target;
		//
		// 	const exclude = [ 'input', 'textarea' ];
		//
		// 	if (exclude.indexOf(source.tagName.toLowerCase()) === -1)
		// 	{
		// 		logger.debug('keyPress() [key:"%s"]', key);
		//
		// 		switch (key)
		// 		{
		// 			case 'a': // Activate advanced mode
		// 			{
		// 				break;
		// 			}
		//
		// 			case '1': // Set democratic view
		// 			{
		//
		// 				break;
		// 			}
		//
		// 			case '2': // Set filmstrip view
		// 			{
		// 				break;
		// 			}
		//
		// 			case 'm': // Toggle microphone
		// 			{
		// 				break;
		// 			}
		// 		}
		// 	}
		// });
		
		document.addEventListener('keydown', (event) =>
		{
			// logger.debug('keydown() ', event);
			// 组合键开启logger
			if (event.key === '1' && event.altKey && event.ctrlKey)
			{
				logger.debug('keydown() 你按下了ctrl+alt', event);
				const urlParser = new UrlParse(window.location.href, true);
				
				urlParser.query.debug = 1;
				
				localStorage.log = 1;
				window.history.pushState('', '', urlParser.toString());
			}
			// 关闭logger
			if (event.key === '0' && event.altKey && event.ctrlKey)
			{
				logger.debug('keydown() 你按下了ctrl+alt', event);
				const urlParser = new UrlParse(window.location.href, true);
				
				delete urlParser.query.debug;
				delete localStorage.log;
				
				window.history.pushState('', '', urlParser.toString());
			}
		});
		
		// function iEsc(e)
		// {
		// 	e.preventDefault();
		//
		// 	return false;
		// }
		
		// 阻止右击菜单，快捷键菜单 sdk不阻止
		if (!isSDK)
		{
			// document.addEventListener('dragstart', iEsc);
			// document.addEventListener('contextmenu', iEsc);
		}
	}
	
	_handleDelete(data, cb){
		try {
				console.log('_handleDelete', data);
			confirm({
				title: '确定删除吗?',
				content: '',
				okText: '确定',
				okType: 'danger',
				cancelText: '取消',
				onOk() {
					console.log('OK');
					cb && cb(data);
				},
				onCancel() {
					console.log('Cancel');
				},
			});
		}catch (e) {
		
		}
	}
	
	async _OrderBatchdelete(selectedRowKeys){
		try {
			console.log('selectedRowKeys', selectedRowKeys);
			if (selectedRowKeys && !selectedRowKeys.length){
				message.warn('请选择要删除的订单')
				return;
			}
			doOrderBatchdelete({order_id:selectedRowKeys}).then((res)=>{
				console.log('doOrderBatchdelete', res);
				if (res.code===200)
				{
					this.msgToast(res.message);
				}
			}).catch((e)=>{
				console.error('doOrderBatchdelete', e);
			})
		}
		catch(e){
			console.error('doOrderBatchdelete', e);
		}
	}
	
	_downloadExcel(data, name){
		try {
			let url = window.URL.createObjectURL(new Blob([data]));
			console.log(url);
			let link = document.createElement('a');
			link.style.display = 'none';
			link.href = url;
			link.download = name ? `导出${name}.xlsx` : "导出数据信息.xlsx";
			link.click();
			window.URL.revokeObjectURL(url);
		}catch (e) {
			console.error('downloadExcel', e);
		}
	}
	
	async _getCityList(){
		try {
			if (store.getState().me.cityList) {
				return store.getState().me.cityList;
			} else {
				getCityList().then((res)=>{
					console.log('_getCityList', res);
					if (res.code===200)
					{
						store.dispatch(stateActions.setMeCityList(res.data));
						
						return res.data;
					}
					return null;
				}).catch((e)=>{
					console.error('getCityList', e);
				})
			}
		}
		catch(e){
				console.error('_getCityList', e);
		}
	}
	
	msgToast(text, duration = 2, top = '24%', type)
	{
		try {
			duration = duration || 2;
			top = top || '24%';
			type=type || 'info';
			if (typeof text === 'object')
			{
				type='warning';
				// duration=1000;
				text=<span className={'text-left'}>
                        {
							Object.values(text).map((item,i)=><p key={i}>{item}</p>)
						}
                    </span>;
			}
			message.config({
				top,
				duration
			});
			
			logger.debug('text', text);
			if (type==='warning')
			{
				message.warning(text);
			}else
			{
				message.info(text);
			}
		}catch (e) {
			logger.error('msgToast', e);
		}
	}
	
}

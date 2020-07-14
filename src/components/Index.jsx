import React, {Fragment} from 'react';
import {Provider} from 'react-redux';
import {store} from '../redux/store';
import PropTypes from 'prop-types';
import RoomContext from './RoomContext';
import {message, ConfigProvider, Result, Button} from 'antd';
import initReactFastclick from 'react-fastclick';
import * as stateActions from '../redux/stateActions';
import AppRouter from '../router/router';
import Logger from '../log/Logger';
import { lang } from '../config';
import Client from '../utils/common';
import localforage from 'localforage';
import deviceInfo from '../utils/deviceInfo';
import Loading from "./Loading";
const logger = new Logger('Index');
const device = new deviceInfo();

let comClient;
console.log('store', store);
class Index extends React.Component {
	constructor(props) {
		super(props);
		
		initReactFastclick();
		Client.init({ store });
		
		this.state = {
			lang         : lang,
			Language     : {},
			providerLang:{},
			isError: false,
			loading: true,
		};
	}
	
	componentDidMount() {
		this.initLang(()=>{
			const Config={
			
			};
			
			comClient = new Client({device, Config});
			
			this.setState({
				loading:false
			})
		});
	}
	
	initLang(callback)
	{
		const user = localStorage.getItem('user');
		
		if (user)
		{
			store.dispatch(stateActions.setMe(JSON.parse(user)));
		}
		
		localforage.getItem('language', (err, value)=> {
			logger.debug('localforage language', value);
			if (!err){
				const curLang = lang || value || window.navigator.language;// 常规浏览器语言和IE浏览器
				
				this.setLanguage(curLang, () =>
				{
					// const { language } = store.getState();
					
					const ua = window.navigator.userAgent.toLowerCase();
					
					// 如果在微信，提示进入浏览器 如果是MobileMode 显示提示页面
					if (ua.indexOf('micromessenger') !== -1)
					{
						store.dispatch(stateActions.setRoomWxBower(true));
					}
					else if (/iPhone|iPad|iPod/i.test(navigator.userAgent))
					{
					
					}
					else
					{
					
					}
					
					store.dispatch(stateActions.setRoomNotBower(true));
					
					callback && callback();
				});
			}else{
				logger.error('language err', err);
			}
		});
	}
	
	async setLanguage(lang, cb)
	{
		try
		{
			logger.debug('setLanguage()', lang);
			
			const setLang = async (data) =>
			{
				logger.debug('Language()', data);
				
				store.dispatch(stateActions.setRoomLanguage(data, lang));
				localforage.setItem('language', lang);
				
				this.setState({
					Language : data
				}, () =>
				{
					this.setProviderLang(lang);
				});
				
				cb && cb();
			};
			
			switch (lang)
			{
				case 'zh': // 中文简体
				case 'zh-CN': // 中文简体
				{
					import(
						
						/* webpackChunkName: "zh-CN" */
						/* webpackMode: "lazy" */
						/* webpackPrefetch: true */
						/* webpackPreload: true */
						'./locale/zh-CN'
						).then(({ default:data }) =>
					{
						lang = 'zh-CN';
						// console.log('000default', data);
						setLang(data);
					})
						.catch((e) =>
						{
							logger.error(e);
						});
					break;
				}
				case 'en-GB': // 英文
				case 'en-US': // 英文
				case 'en-CA': // 英文
				case 'en-ZA': // 英文
				{
					import(
						
						/* webpackChunkName: "zh-CN" */
						/* webpackMode: "lazy" */
						/* webpackPrefetch: true */
						/* webpackPreload: true */
						'./locale/zh-CN').then(({ default:data }) =>
					{
						lang = 'zh-CN';
						
						setLang(data);
					});
					break;
				}
			
				default:
				{
					import(
						
						/* webpackChunkName: "zh-CN" */
						/* webpackMode: "lazy" */
						/* webpackPrefetch: true */
						/* webpackPreload: true */
						'./locale/zh-CN').then(({ default:data }) =>
					{
						lang = 'zh-CN';
						
						setLang(data);
					});
					break;
				}
			}
			
		}
		catch (e)
		{
			logger.error('setLanguage() fail: ', e);
		}
	}
	
	setProviderLang(lang) // 设置全局语言
	{
		try
		{
			logger.debug('setProviderLang', lang);
			
			const setProvider =(data) =>
			{
				this.setState({
					providerLang : data
				});
			};
			
			switch (lang)
			{
				case 'zh-CN': // 中文简体
				{
					import(
						
						/* webpackChunkName: "antd_zh_CN" */
						/* webpackMode: "lazy" */
						/* webpackPrefetch: true */
						/* webpackPreload: true */
						'antd/lib/locale-provider/zh_CN'
						).then((data) =>
					{
						setProvider(data.default);
					})
						.catch((e) =>
						{
							logger.error(e);
						});
					break;
				}
				case 'en-GB': // 英文
				case 'en-US': // 英文
				case 'en-CA': // 英文
				case 'en-ZA': // 英文
				{
					import(
						
						/* webpackChunkName: "antd_en_US" */
						/* webpackMode: "lazy" */
						/* webpackPrefetch: true */
						/* webpackPreload: true */
						'antd/lib/locale-provider/en_US'
						).then((data) =>
					{
						setProvider(data.default);
					})
						.catch((e) =>
						{
							logger.error(e);
						});
					break;
				}
				default:
				{
					import(
						
						/* webpackChunkName: "antd_zh_CN" */
						/* webpackMode: "lazy" */
						/* webpackPrefetch: true */
						/* webpackPreload: true */
						'antd/lib/locale-provider/zh_CN'
						).then((data) =>
					{
						setProvider(data.default);
					})
						.catch((e) =>
						{
							logger.error(e);
						});
					break;
				}
			}
			
		}
		catch (e)
		{
			logger.error('setProviderLang', e);
		}
	}
	
	toastMsg(text)
	{
		message.config({
			top : 300
		});
		message.info(text);
		logger.debug(text);
	}
	
	componentDidCatch(error, errorInfo) {
		logger.error('error: ', error, errorInfo);
		this.setState({
			isError : true
		});
	}
	
	render() {
		const {Language, providerLang, isError, loading} = this.state;
		
		if (isError){
			return <Result
				className={'error-info'}
				title={'页面发现未知错误，请点击刷新页面'}
				extra={
					<Button type='primary' key='console'
							onClick={() =>
							{
								window.location.reload();
							}}
					>
						刷新页面
					</Button>
				}
			/>
		}
		if (loading) {
			return <Loading/>
		}
		return (
			<Fragment>
				<Provider store={store}>
					<ConfigProvider locale={providerLang}>
						<RoomContext.Provider value={{Language, Client:comClient, dispatch:store.dispatch}}>
							<AppRouter/>
						</RoomContext.Provider>
					</ConfigProvider>
				</Provider>
			</Fragment>
		);
	}
}

Index.propTypes =
	{
		Language: PropTypes.object,
	};

export default Index;

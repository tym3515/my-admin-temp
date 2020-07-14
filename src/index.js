import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import 'core-js/es6/map';
import 'core-js/es6/set';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Index';
import * as serviceWorker from './serviceWorker';
import domready from 'domready';
import UrlParse from 'url-parse';
import Logger from './log/Logger';
import './style/index.scss'
const logger = new Logger('index');

const urlParser = new UrlParse(window.location.href, true);

domready(() =>
{
	logger.debug('DOM ready urlParser', urlParser);
	
	const vConsole = urlParser.query.vconsole==='1' || false;
	
	Promise.resolve().then(() =>
		{
			if (vConsole)
			{
				const script = document.createElement('script');
				
				script.src='https://cdn.bootcss.com/vConsole/3.3.4/vconsole.min.js';
				document.body.appendChild(script);
				script.onload=function()
				{
					new window.VConsole();
					
					logger.debug('Hello vConsole');
				};
			}
			// 设置rem
			// (function(doc, win)
			// {
			// 	const GW = 750,
			// 		docEl = doc.documentElement,
			// 		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
			// 		recalc = function()
			// 		{
			// 			const clientWidth = docEl.clientWidth;
			//
			// 			logger.debug('clientWidth', clientWidth);
			// 			if (!clientWidth) return;
			//
			//
			// 			if (clientWidth > 1920)
			// 			{
			// 				docEl.style.fontSize = `${10 * (clientWidth / GW) }px`;
			// 				window.setRemSize=true;
			// 			}
			// 			else
			// 			{
			// 				docEl.style.fontSize = '16px';
			// 				window.setRemSize=false;
			// 			}
			// 		};
			//
			// 	if (!doc.addEventListener) return;
			// 	recalc();
			// 	win.addEventListener(resizeEvt, recalc, false);
			// 	doc.addEventListener('DOMContentLoaded', recalc, false);
			//
			// 	/* DOMContentLoaded文档加载完成不包含图片资源 onload包含图片资源*/
			// })(document, window);
		})
		.then(run);
});
function run()
{
	ReactDOM.render(<App />, document.getElementById('root'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

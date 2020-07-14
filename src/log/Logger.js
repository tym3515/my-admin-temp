import debug from 'debug';
import UrlParse from 'url-parse';

const urlParser = new UrlParse(window.location.href, true);
const isLogger = urlParser.query.debug || localStorage.log==='1' || 0;
const APP_NAME = 'react';
// production环境地址栏加上debug=1参数才开启log  ， development环境默认开启

export default class Logger
{
	constructor(prefix)
	{
		if (prefix)
		{
			this._debug = debug(`${APP_NAME}:${prefix}`);
			this._warn = debug(`${APP_NAME}:WARN:${prefix}`);
			this._error = debug(`${APP_NAME}:ERROR:${prefix}`);
			if (process.env.NODE_ENV === 'production')
			{
				if (!isLogger)
				{
					debug.disable(prefix);
					if (process.env.npm_lifecycle_event !== 'sdk')
					{
						window.console.log = function() {};
					}
				}
			}
		}
		else
		{
			this._debug = debug(APP_NAME);
			this._warn = debug(`${APP_NAME}:WARN`);
			this._error = debug(`${APP_NAME}:ERROR`);

			if (process.env.NODE_ENV === 'production' && !isLogger)
			{
				debug.disable(APP_NAME);
			}
		}

		/* eslint-disable no-console */
		// this._debug = console.log.bind(console);
		// this._error = console.error.bind(console);
		this._debug.log = console.info.bind(console);
		this._warn.log = console.warn.bind(console);
		this._error.log = console.error.bind(console);
	}

	get debug()
	{
		return this._debug;
	}

	get warn()
	{
		return this._warn;
	}

	get error()
	{
		return this._error;
	}
}

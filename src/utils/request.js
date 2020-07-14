import axios from 'axios';
import React from 'react';
import {message} from 'antd';

const service = axios.create({
    baseURL: 'admin/',
    timeout: 9000,
});

service.interceptors.request.use(
    config => {
        let token = localStorage.getItem('token')
        if(token){
            config.headers.Authorization = token;
        }
        config.headers.platform = 'back';

        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);
let noToken =false;

service.interceptors.response.use(response => {
        // console.log('response', response);
        if (response.headers && response.headers.authorization)
        {
            localStorage.setItem('token', response.headers.authorization);
        }
        if (response.data && response.data.code === 401 && !noToken) {
            message.warning(response.data.message);
            noToken=true;
            // setTimeout(()=>{
            //     window.location.href='/#/login';
            // }, 1500);
        }
        if (response.status === 200) {
            if (response.data &&  response.data.code && response.data.code === 422)
            {
                let obj= response.data.message;

                if (typeof obj === 'object')
                {
                    var html=<span className={'text-left'}>
                        {
                            Object.values(obj).map((item,i)=><p key={i}>{item}</p>)
                        }
                    </span>;

                    message.warning(html);
                }
                else
                {
                    message.warning(obj);
                }
            }
            else if (response.data &&  response.data.code && response.data.code !== 200)
            {
                message.error(response.data.message);
            }
            return response.data;
        } else {
            Promise.reject(response.data);
        }
    },
    error => {
        console.log(error);
        message.error(error.toString());
        return Promise.reject(error);
    }
);

export default service;

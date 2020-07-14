import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { withRoomContext } from './RoomContext';
import * as stateActions from '../redux/stateActions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, AutoComplete, message } from 'antd';
import '../style/components/Login.scss';
import {saveAccount} from "../config";
import localforage from 'localforage';
import {doLogin} from "../utils";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource:[],
            accountList:[]
        };
    }
    componentDidMount() {
        if (saveAccount)
        {
            this.onFill();
        }
    }
    
    onReset = () => {
        this.props.form.resetFields();
    };
    
    onFinish = values =>
    {
        console.log('values', values);
    
        this.props.form.validateFields((err, values) =>
        {
            // eslint-disable-next-line no-console
            console.log('Received values of form: ', err, values);
            if (err)
            {
                console.error('validateFields', err);
                return;
            }
            
            if (values.remember)
            {
                const dataSource = this.state.dataSource || [];
    
                dataSource.forEach((item,index)=>{
                    if (item.account === values.account)
                    {
                        dataSource.splice(index, 1);
    
                        return;
                    }
                });
    
                dataSource.push(values);
    
                console.log('localforage dataSource11', dataSource);
                localforage.setItem('dataSource', dataSource, (err, value)=> {
                    console.log('localforage dataSource000', value);
                });
                localforage.setItem('remember', values.remember, (err, val)=> {
                    console.log('localforage remember', val);
                });
            }
            
            const dat = JSON.parse(JSON.stringify(values));
            
            delete dat.remember;
            // const parse = new UrlParse(window.location.href, true);
            //
            // parse.query.sales = 1;
            // window.history.pushState('', '', parse.toString());
            doLogin(dat).then((data)=>{
                console.log('doLogin', data);
                if (data.code===200)
                {
                    localStorage.setItem('token',data.data.token);
                    localStorage.setItem('user',JSON.stringify(data.data.user));
                    this.props.dispatch(stateActions.setMe(data.data.user));
                    message.config({
                        top:'20%'
                    });
                    message.info(data.message);
                    
                    const query={
                        pathname : '/',
                        state    : {
                            isRouter : true
                        }
                    };
    
                    this.props.history.push(query);
                }
            }).catch((e)=>{
                console.error('doLogin', e);
            })
        });
    };
    
    onFill = () => {
        // localforage.removeItem('dataSource')
        console.log('localforage onFill');
        localforage.getItem('dataSource', (err, value)=> {
            localforage.getItem('remember', (err, val)=> {
                console.log('localforage remember', val);
                this.props.form.setFieldsValue({
                    remember : val
                });
            })
            
            value=value || [];
            
            this.setState({
                dataSource:value,
                accountList:value.map((item)=>item.account)
            })
            
            console.log('localforage dataSource', value);
    
            console.log('localforage onFill end');
        });
    };
    
    autoChange(value){
        const item = this.state.dataSource.find((item)=>item.account===value);
        console.log('autoChange', value);
        this.props.form.setFieldsValue({
            account : value,
            password : item ? item.password : ''
        });
    }
    
    render() {
        const {Language} = this.props;
        const {getFieldDecorator} = this.props.form;
        const {accountList} = this.state;
        
        return (
            <Fragment>
                <div data-component='Login'
                     className={classnames('m-box', {})}
                >
                    <div className={'loginBox code-box'}>
                        <div className={'login-title'}>
                            <h3>{Language.title}</h3>
                        </div>
                        <Form className='login-form'
                        >
                            <Form.Item label={<span>{Language.account}</span>}>
                                {
                                    getFieldDecorator('account', {
                                        rules : [
                                            {
                                                required : true,
                                                message  : Language.pleaseAccount
                                            }
                                        ]
                                    })(accountList.length ?
                                        <AutoComplete
                                            onChange={this.autoChange.bind(this)}
                                            dataSource={accountList}
                                            // placeholder={Language.pleaseAccount}
                                            filterOption={(inputValue, option) =>
                                                option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                            }
                                            children={<Input
                                                maxLength={16}
                                                prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                placeholder={Language.pleaseAccount}
                                            />}
                                        />
                                        :<Input
                                            maxLength={16}
                                            prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder={Language.pleaseAccount}
                                    />)
                                }
                            </Form.Item>
                            <Form.Item label={<span>{Language.password}</span>}>
                                {getFieldDecorator('password', {
                                    rules : [
                                        {
                                            required : true,
                                            message  : Language.pleasePassword
                                        },
                                        {
                                            pattern : /^[0-9a-zA-Z]{6,16}$/,
                                            message : Language.sixSixWord
                                        }
                                    ]
                                })(<Input.Password
                                    maxLength={16}
                                    prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type='password'
                                    onPressEnter={this.onFinish.bind(this)}
                                    placeholder={Language.pleasePassword}
                                />,)}
                            </Form.Item>
                            {
                                saveAccount &&
                                <Form.Item>
                                    {getFieldDecorator('remember', {
                                        valuePropName: 'checked',
                                        initialValue: true,
                                    })(<Checkbox>{Language.rememberMe}</Checkbox>)}
                                </Form.Item>
                            }
                            
                        
                            <Form.Item className={'form-button'}>
                                <Button type="primary"
                                        onClick={this.onFinish.bind(this)}
                                        className="login-form-button">
                                    {Language.login}
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Fragment>
        );
    }
}

Login.propTypes =
{
    Language             : PropTypes.object,
    dispatch             : PropTypes.func,
};

const mapStateToProps = (state) =>
{
    
    return {
        state,
    };
};

const mapDispatchToProps = (dispatch) =>
{
    
    return {
        // onToggleAdvancedMode  : (mode) => dispatch(stateActions.toggleAdvancedMode(mode)),
        dispatch
    };
};

const LoginContainer = withRoomContext(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Form.create({ name: 'login' })(Login))));

export default LoginContainer;

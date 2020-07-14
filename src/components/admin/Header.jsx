import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { withRoomContext } from '../RoomContext';
import PropTypes from 'prop-types';
import HeaderTabs from './HeaderTabs';
import { withRouter, Link } from 'react-router-dom';
import {Menu, Modal, Form, Input} from 'antd'
import '../../style/components/Header.scss';
import { fetchEditpwd,doLogout } from '../../utils/index';

class Header extends React.Component
{
    constructor(props)
    {
        super(props);

        console.log('Header', props);

        this.state={
            myAvatar   : '',
            showEditModal:false
        };
    }

    componentDidMount() {

    }

    handleLogout(){
        doLogout().then((res)=>{
            console.log('doLogout', res);
            if (res.code===200)
            {
                localStorage.removeItem('user');
                localStorage.removeItem('token');

                const query={
                    pathname : '/login',
                    state    : {
                        isRouter : true
                    }
                };

                this.props.history.push(query);
            }

        }).catch((e)=>{
            console.error('doLogout', e);
        })
    }

    handleEditOk(){
        this.props.form.validateFields((err, values) =>
        {
            // eslint-disable-next-line no-console
            console.log('Received values of form: ', err, values);
            if (err)
            {
                console.error('validateFields', err);
                return;
            }
            const {
                me,
                Client
            } = this.props;
            const {
                id
            } = me;

            const dat = {
                user_id:id,
                ...values
            };

            fetchEditpwd(dat).then((res)=>{
                console.log('fetchEditpwd', res);
                // if (res.code===200)
                // {
                //
                // }
                Client.msgToast(res.message);
            }).catch((e)=>{
                console.error('fetchEditpwd', e);
            })
        });
    }

    handleEditCancel(){
        this.setState({
            showEditModal:false
        })
    }

    headMenu(){
        const {
            Language
        } = this.props;

        const menu = (
            <Menu>
                <Menu.Item className="menu-item">
                    <Link to={'/myProfile'}>{Language.myProfile}</Link>
                </Menu.Item>
                {/*<Menu.Item className="menu-item">*/}
                {/*    <a onClick={this.handleLogout}>{Language.LoginOut}</a>*/}
                {/*</Menu.Item>*/}
            </Menu>
        )

        return menu;
    }

    handleEdit(){
        this.setState({
            showEditModal:true
        })
    }

    render()
    {
        const {
            me,
            Language
        } = this.props;
        // const { myAvatar } = this.state;
        const {getFieldDecorator} = this.props.form;

        return (
            <Fragment>
                <div data-component='Header'
                     className={classnames('m-box', {
                     })}
                >
                    <div className={'logo-box'} style={{width:200}}>
                        <Link to={'/'}>
                            {/* <img className={'logo'} src={Logo} alt=""/> */}
                            <span className={'logo'}>{Language.title}</span>
                        </Link>
                    </div>
                    <div className={'head-center'}>
                        <HeaderTabs></HeaderTabs>
                    </div>
                    <div className={'right-box'}>
                        <span className={'top-btn edit-password'}
                            onClick={this.handleEdit.bind(this)}
                        >{Language.editPassword}</span>
                        {/*<Dropdown overlay={this.headMenu()} placement="topRight" trigger={['hover']}>*/}
                        {/*<Link to={'/myProfile'}>*/}
                        <div className="avatar-box">
                            {/* <Avatar
                                className="avatar-box"
                                icon="user"
                                shape="square"
                                size="default"
                                alt=""
                                src={myAvatar}
                            /> */}
                            尊敬会员：<span className='username'>{me.username}</span>
                        </div>
                        {/*</Link>*/}
                        {/* <div className='username'>
                        </div> */}
                        {/*</Dropdown>*/}
                        <span className={'top-btn log-out'} onClick={()=>this.handleLogout()}>{Language.LoginOut}</span>
                    </div>
                </div>
                <Modal
                    className={'edit-modal'}
                    centered
                    title={Language.editPassword}
                    visible={this.state.showEditModal}
                    onOk={this.handleEditOk.bind(this)}
                    onCancel={this.handleEditCancel.bind(this)}
                    forceRender={true}
                >
                    <Form
                        name="editfrom"
                        onSubmit={this.onFinish}
                        className="edit-form"
                    >
                        <Form.Item label={<span>{Language.oldPassword}</span>}>
                            {getFieldDecorator('old_password', {
                                rules: [{ required: true, message: Language.pleaseOldPassword }],
                            })(
                                <Input.Password
                                    maxLength={16}
                                    onPressEnter={this.handleEditOk.bind(this)}
                                    placeholder={Language.pleaseOldPassword}
                                />,
                            )}
                        </Form.Item>

                        <Form.Item label={<span>{Language.newPassword}</span>}>
                            {getFieldDecorator('new_password', {
                                rules: [
                                    { required: true, message: Language.pleaseNewPassword },
                                    {
                                        pattern : /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]{6,20}$/,
                                        message : Language.sixWord
                                    }
                                    ],
                            })(
                                <Input.Password
                                    maxLength={16}
                                    onPressEnter={this.handleEditOk.bind(this)}
                                    placeholder={Language.pleaseNewPassword}
                                />,
                            )}
                        </Form.Item>

                        <Form.Item label={<span>{Language.conPassword}</span>}>
                            {getFieldDecorator('affirm_paswword', {
                                rules: [
                                    { required: true, message: Language.pleaseConfPassword },
                                    {
                                        pattern : /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]{6,20}$/,
                                        message : Language.sixWord
                                    }
                                ],
                            })(
                                <Input.Password
                                    maxLength={16}
                                    placeholder={Language.pleaseConfPassword}
                                    onPressEnter={this.handleEditOk.bind(this)}
                                />,
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </Fragment>
        );
    }
}

Header.propTypes =
{
    Language             : PropTypes.object,
    Client             : PropTypes.object,
    me             : PropTypes.object,
};

const mapStateToProps = (state) =>
{
    return {
        me:state.me
    };
};

const mapDispatchToProps = () =>
{
    return {

    };
};

const HeaderContainer = withRoomContext(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Form.create({ name: 'header' })(Header))));

export default HeaderContainer;

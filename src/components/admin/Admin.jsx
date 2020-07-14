import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { withRoomContext } from '../RoomContext';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Header from './Header';
// import Footer from './Footer';
import Sider from './Sider';
import Content from './Content';
import '../../style/components/Admin.scss';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

console.log('moment',moment.locale('zh-cn'));
class Admin extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state={
            loading   : false,
        };
    }

    render()
    {
        // const {
        //     Language
        // } = this.props;
        
        // if (!localStorage.user)
        // {
        //     return <Redirect to={'/login'}></Redirect>
        // }


        return (
            <Fragment>
                <div data-component='Admin' className={classnames('m-box', {
                    
                     })}
                >
                    <Header></Header>
                    {/*<Setting></Setting>*/}
                    <div className={'admin-content'}>
                        <Sider></Sider>
                        <Content></Content>
                    </div>
                </div>
            </Fragment>
        );
    }
}

Admin.propTypes =
{
    Language             : PropTypes.object,
};

const mapStateToProps = (state) =>
{
    return {
        state
    };
};

const mapDispatchToProps = (dispatch) =>
{
    return {
        // onToggleAdvancedMode  : (mode) => dispatch(stateActions.toggleAdvancedMode(mode)),

    };
};

const AdminContainer = withRoomContext(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Admin)));

export default AdminContainer;

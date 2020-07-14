import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { withRoomContext } from '../RoomContext';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import SilderTabs from './SiderTabs';

class Sider extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state={
            loading   : false,
            silderW:180
        };
    }

    render()
    {
        // const {
        //     Language,
        //     curSider,
        //     sider
        // } = this.props;
        const {silderW} =this.state;

        return (
            <Fragment>
                <div data-component='Silder'
                     className={classnames('m-box lf', {
                     })}
                     style={{width:silderW}}
                >
                    <div className={'siderName'}></div>
                    <SilderTabs width={silderW}></SilderTabs>
                </div>
            </Fragment>
        );
    }
}

Sider.propTypes =
{
    sider: PropTypes.object,
    Language             : PropTypes.object,
    curSider: PropTypes.string,
};

const mapStateToProps = (state) =>
{
    return {
        sider:state.sider,
        curSider:state.sider.curSider
    };
};

const mapDispatchToProps = () =>
{
    return {
        // dispatch
    };
};

const SilderContainer = withRoomContext(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Sider)));

export default SilderContainer;

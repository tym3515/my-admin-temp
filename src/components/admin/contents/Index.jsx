import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { withRoomContext } from '../../RoomContext';
// import * as stateActions from '../../../redux/stateActions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Result } from 'antd';

class Index extends React.Component
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


        return (
            <Fragment>
                <div data-component='Index'
                     className={classnames('content-child', {
                     })}
                >
                    <Result
                        status="success"
                        title="欢迎使用后台管理系统，如遇到疑惑地方，请联系我们。"
                        subTitle=""
                        icon={<span></span>}
                    />
                </div>
            </Fragment>
        );
    }
}

Index.propTypes =
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

const IndexContainer = withRoomContext(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Index)));

export default IndexContainer;

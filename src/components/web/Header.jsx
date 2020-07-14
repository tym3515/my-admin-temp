import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { withRoomContext } from '../RoomContext';
import * as stateActions from '../../redux/stateActions';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';

class Header extends React.Component
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
        const {
            // Language
        } = this.props;


        return (
            <Fragment>
                <div data-component='Header'
                     className={classnames('m-box', {
                     })}
                >
                    Header Header Header
                </div>
            </Fragment>
        );
    }
}

Header.propTypes =
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

const HeaderContainer = withRoomContext(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)));

export default HeaderContainer;

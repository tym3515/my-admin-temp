import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { withRoomContext } from '../RoomContext';
import * as stateActions from '../../redux/stateActions';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';

class Footer extends React.Component
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
            Language
        } = this.props;


        return (
            <Fragment>
                <div data-component='Footer' className={classnames('m-box', {
                     })}
                >
                    Footer
                </div>
            </Fragment>
        );
    }
}

Footer.propTypes =
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

const FooterContainer = withRoomContext(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Footer)));

export default FooterContainer;

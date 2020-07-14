import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { withRoomContext } from '../RoomContext';
import * as stateActions from '../../redux/stateActions';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Silder from './Silder';
import Setting from './Setting';

class Main extends React.Component
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
                <div data-component='Main' className={classnames('m-box', {
                    
                     })}
                >
                    <Header></Header>
                    <Silder></Silder>
                    <Setting></Setting>
                    <Footer></Footer>
                </div>
            </Fragment>
        );
    }
}

Main.propTypes =
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

const MainContainer = withRoomContext(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Main)));

export default MainContainer;

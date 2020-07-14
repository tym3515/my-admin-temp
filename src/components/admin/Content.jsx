import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { withRoomContext } from '../RoomContext';
import PropTypes from 'prop-types';
import {withRouter, Route, Switch} from 'react-router-dom';
import '../../style/components/Content.scss';
import MyProfile from "./MyProfile";
import Index from "./contents/Index";

class Content extends React.Component
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
            // Language,
            // me
        // } = this.props;


        return (
            <Fragment>
                <div data-component='Content'
                     className={classnames('m-box', {
                     })}
                >
                    {/* <div className={'content-top'}> */}
                        <Switch>
                            <Route exact path='/' component={Index} />
                            <Route exact path='/myProfile' component={MyProfile} />
                            
                        </Switch>
                    {/* </div> */}
                    {/* <Footer></Footer> */}
                </div>
            </Fragment>
        );
    }
}

Content.propTypes =
{
    Language             : PropTypes.object,
    me             : PropTypes.object,
};

const mapStateToProps = (state) =>
{
    return {
        me:state.me
    };
};

const mapDispatchToProps = (dispatch) =>
{
    return {

    };
};

const ContentContainer = withRoomContext(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Content)));

export default ContentContainer;

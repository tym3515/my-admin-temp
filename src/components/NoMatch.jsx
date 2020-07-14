import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { withRoomContext } from './RoomContext';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Result, Button } from 'antd';

class NoMatch extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state={
        
        };
    }

    render()
    {
        // const {
        //     Language
        // } = this.props;
        console.log('this.props', this.props);

        return (
            <Fragment>
                <div data-component='NoMatch' className={classnames('m-box', {
                
                })}>
                    <Result
                        className={'error-info'}
                        title={'page not found'}
                        extra={
                            <Button type='primary' key='console'
                                    onClick={() =>
                                    {
                                        this.props.history.push('/');
                                    }}
                            >
                                返回主页
                            </Button>
                        }
                    />
                </div>
            </Fragment>
        );
    }
}

NoMatch.propTypes =
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
    
    };
};

const NoMatchContainer = withRoomContext(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(NoMatch)));

export default NoMatchContainer;

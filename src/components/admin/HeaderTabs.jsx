import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { withRoomContext } from '../RoomContext';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

class HeaderTabs extends React.Component
{
    constructor(props)
    {
        super(props);
        console.log('HeaderTabs', props);
        this.state={
            tabsArr   : [],
            // defaultTab   : this.transTabs(sessionStorage.curSider) || defaultSider,
            defaultTab   :  this.transTabs(sessionStorage.curSider) || '',
        };
    }
    
    componentDidMount() {
       
    }
    
    transTabs(tab){
        let curTab=tab || '';
    
        return curTab;
    }
    
    tabChange(id){
        console.log('tabChange', id);
    }

    render()
    {
        // const {Language, me} = this.props;
        const {tabsArr,defaultTab} = this.state;
    
        // console.log('defaultTab', defaultTab);
    
        return (
            <Fragment>
                <div data-component='HeaderTabs'
                     className={classnames('m-box', {
                     })}
                >
                    <Tabs
                          activeKey={defaultTab}
                          tabBarGutter={0}
                          onChange={this.tabChange.bind(this)}
                    >
                        {
                            tabsArr && tabsArr.map((item,i) => {
                                if (!item.checked)
                                    return null;
                                
                                return (
                                    <TabPane tab={item.module_name} key={item.module_id}>
                                    </TabPane>
                                )
                        })}
                    </Tabs>
                </div>
            </Fragment>
        );
    }
}

HeaderTabs.propTypes =
{
    Language             : PropTypes.object,
    sider             : PropTypes.object,
    curSider: PropTypes.string,
};

const mapStateToProps = (state) =>
{
    return {
        sider:state.sider,
        me:state.me,
        curSider:state.sider.curSider
    };
};

const mapDispatchToProps = () =>
{
    return {
        // dispatch
    };
};

const HeaderTabsContainer = withRoomContext(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderTabs)));

export default HeaderTabsContainer;

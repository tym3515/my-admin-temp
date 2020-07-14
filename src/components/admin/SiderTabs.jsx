import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {withRoomContext} from '../RoomContext';
import PropTypes from 'prop-types';
import {withRouter, Link} from 'react-router-dom';
import {Menu, Icon} from 'antd';

const {SubMenu} = Menu;

const arr=[];

class SiderTabs extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			loading: false,
			mode: 'inline',
            silderMenu:props.sider[props.curSider] || arr,
			SelectedKeys:props.curSider
		};
	}
	
	componentDidMount() {
	   // this.setState({
       //     silderMenu:
       // })
    }
    
    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
		if(this.props.curSider !== nextProps.curSider){
			this.setState({
			    silderMenu:nextProps.sider[nextProps.curSider],
			})
		}
	
		if(!nextProps.history.location.pathname.includes(this.state.SelectedKeys)){
			this.setState({
				SelectedKeys:nextProps.history.location.pathname.substr(1)
			})
		}
	}
	
	
	renderMenu(array){
    
        return array && array.map((item)=> {
    
            if (item.children && item.children.length)
            {
                return (
                    <SubMenu key={item.router} title={<span>
                        <Icon type="appstore" />
                        <span>{item.label}</span>
                      </span>}>
                        {
                            this.renderMenu(item.children)
                        }
                    </SubMenu>
                )
            }
            return (
                <Menu.Item key={item.router} onClick={this.onSiderClick.bind(this)}>
					<Link  to={{ pathname: `/${item.router}`, state:{label: item.label}}}>
						{
							item.iconType === 'edit' ?
							<Icon type="edit" /> :item.iconType === 'folder' ?
								<Icon type="folder" /> :item.iconType === 'file-text' ?
								<Icon type="file-text" />:item.iconType === 'hdd' ?<Icon type="hdd" />:
								<Icon type="mail"/>
						}
						{item.label}
					</Link>
                </Menu.Item>
            )
        })
    }
	
	onSiderClick(data){
		console.log('onSiderClick', data);
	
	}
    
    onSilderChange(data){
        console.log('onSilderChange', data);
		this.setState({
			SelectedKeys:data.key
		})
    }
	
	render() {
		const {
			// Language,history,
			silderW} = this.props;
		const {silderMenu, SelectedKeys} = this.state;
		// console.log('SelectedKeys', SelectedKeys);
		
		return (
			<Fragment>
				<div data-component='SilderTabs'
					 className={classnames('m-box', {
                         Dark:true
                     })}
				>
					<Menu
                        className={'silder-menu'}
						style={{width: silderW}}
						defaultSelectedKeys={[SelectedKeys]}
						selectedKeys={[SelectedKeys]}
						// defaultOpenKeys={['sub1']}
						mode={this.state.mode}
                        onClick={this.onSilderChange.bind(this)}
					>
                        {
                            this.renderMenu(silderMenu)
                        }
					</Menu>
				</div>
            </Fragment>
        );
    }
}

SiderTabs.propTypes =
{
	Language: PropTypes.object,
	sider: PropTypes.object,
	curSider: PropTypes.string,
	// location: PropTypes.object,
};

const mapStateToProps = (state) => {
    return {
		sider:state.sider,
		curSider:state.sider.curSider,
		// location:state.history.location,
    };
};

const mapDispatchToProps = () => {
    return {
		// dispatch
    };
};

const SilderTabsContainer = withRoomContext(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SiderTabs)));

export default SilderTabsContainer;

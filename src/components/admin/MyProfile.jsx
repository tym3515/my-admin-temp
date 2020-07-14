import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { withRoomContext } from '../RoomContext';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Upload, Icon, message, Form } from 'antd';
import { proxy } from '../../config'
import { getUrl } from '../../utils/utils'

class MyProfile extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state={
            loading   : false,
            imageUrl:props.me.avatar
        };
    }
    
    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    
    beforeUpload(file){
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };
    
    handleSubmit(){
    
    }

    render()
    {
        const {
            // Language,
            me
        } = this.props;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl } = this.state;

        return (
            <Fragment>
                <div data-component='MyProfile'
                     className={classnames('m-box', {
                     })}
                >
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item label="用户名">
                            <div className="my-form-item-control">{me.username}</div>
                        </Form.Item>
                        <Form.Item label="头像">
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action={proxy}
                                beforeUpload={this.beforeUpload}
                                onChange={this.handleChange}
                            >
                                {imageUrl ? <img src={getUrl(imageUrl)} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </Form.Item>
               
                        <Form.Item label="所在单位">
                            <div className="my-form-item-control">{me.company}</div>
                        </Form.Item>
                    </Form>
                </div>
            </Fragment>
        );
    }
}

MyProfile.propTypes =
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
        // onToggleAdvancedMode  : (mode) => dispatch(stateActions.toggleAdvancedMode(mode)),

    };
};

const MyProfileContainer = withRoomContext(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(MyProfile)));

export default MyProfileContainer;

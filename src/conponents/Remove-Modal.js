import React, {Component} from 'react';
import {Alert, Modal,message} from "antd";

class RemoveModal extends Component {
    render() {
        let {showDialog,hiddenDialog,onSubmit} = this.props
        return (
            <div>
                <Modal
                    title="删除操作"
                    visible={showDialog}
                    onCancel={hiddenDialog}
                    onOk={onSubmit}
                    cancelText={'取消'}
                    okText={'确定'}>
                    <Alert showIcon  message="此操作具有不可逆性，是否确定删除？" type="warning" />
                </Modal>
            </div>
        );
    }
}

export default RemoveModal;
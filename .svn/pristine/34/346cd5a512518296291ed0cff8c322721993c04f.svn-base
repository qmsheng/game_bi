/**
 * Created by Administrator on 2016/9/13.
 */
import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';

export default class PopWin extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    componentDidMount() {
        $('#'+this.props.config.id).modal({
            closable:false,
            onDeny    : function(){

            },
            onApprove : function() {
                return false;
            }
        });
    }

    render() {
        let config = this.props.config;
        return (
            <div id={config.id} className="ui small modal">
                <div className="header">
                    {this.props.title}
                </div>
                <div className="content">
                    {this.props.children}
                </div>
                <div className="actions">
                    <div className="ui black deny button" onClick={config.handleCancel.bind(this)}>
                        取消
                    </div>
                    <div className="ui positive right labeled icon button" onClick={config.handleSave.bind(this)}>
                        确认
                        <i className="checkmark icon"></i>
                    </div>
                </div>
            </div>
        );
    }
}
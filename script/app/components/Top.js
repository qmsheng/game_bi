/**
 * Created by Administrator on 2016/9/13.
 */
import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';

export default class Top extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    componentDidMount() {
        $('.ui.dropdown').dropdown();
    }

    render() {
        return (
            <div className="z-top ui fixed transparent main menu">
                <div className="header item">
                    <FormattedMessage id="APP_TITLE" defaultMessage='BI' />
                </div>
                <a className="item"><FormattedMessage id="APP_LINK_TITLE_CONSOLE" defaultMessage='控制台' /></a>

                <div className="right menu">
                    <div className="ui dropdown item">
                        <FormattedMessage id="APP_LINK_TITLE_ACCOUNT_MANAGE" defaultMessage='账号管理' /> <i className="dropdown icon"></i>
                        <div className="menu">
                            <a className="item"><FormattedMessage id="APP_LINK_TITLE_CHANGE_PWD" defaultMessage='修改密码' /></a>
                            <a className="item" onClick={this.props.handleLogout}><FormattedMessage id="APP_LINK_TITLE_LOGOUT" defaultMessage='退出登录' /></a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
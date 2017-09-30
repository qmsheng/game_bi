/**
 * Created by Administrator on 2016/9/12.
 */
import React, {Component} from 'react';
import { IntlProvider, addLocaleData, FormattedMessage} from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';

import intl from 'intl';
import {zh_CN} from '../lang/zh_CN';
import {en_US} from '../lang/en_US';
addLocaleData([...en,...zh]);

import LoginAction from '../actions/LoginAction';
import LoginStore from '../stores/LoginStore';

export default class Login extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = LoginStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        LoginStore.listen(this.onChange);
        $('.ui.form').form({
            fields: {
                username : {
                    identifier: 'username',
                    rules: [
                        {
                            type : 'empty',
                            prompt : '请输入登录账号！！！'
                        }
                    ]
                },
                password : {
                    identifier: 'password',
                    rules :[
                        {
                            type : 'empty',
                            prompt : '请输入登录密码！！！'
                        }
                    ]
                },
            }
        });

    }

    componentWillUnmount() {
        LoginStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
        if (this.state.logined) {
            this.context.router.push('/');
        }
    }

    handleInput(name, event) {
        var newState={};
        newState[name]=event.target.value;
        this.setState(newState);
    }

    handleClickLogin() {
        let params = {username:this.state.username, password:this.state.password};
        LoginAction.login(params);
    }

    chooseLocale() {
        switch(navigator.language.split('-')[0]){
            case 'en':
                return en_US;
                break;
            case 'zh-CN':
                return zh_CN;
                break;
            default:
                return zh_CN;
                break;
        }
        return zh_CN;
    }

    render() {
        let msgLang = this.chooseLocale();
        return (
            <IntlProvider locale="zh" messages={msgLang} >
            <div className="z-login">
                <div className="z-login-form">
                    <div className="ui centered grid">
                        <div className="z-login-panel column">
                            <div className="z-login-panel-content">
                                <h2 className="ui center aligned header">
                                    <FormattedMessage id="APP_TITLE" defaultMessage='BI后台管理系统' />
                                </h2>
                                <br />
                                <div className="ui form">
                                    <div className="ui error message">

                                    </div>
                                    <div className="field">
                                        <div className="ui fluid large left icon input">
                                            <input type="text" name="username" value={this.state.username} onChange={this.handleInput.bind(this,'username')} placeholder="用户名..."/>
                                            <i className="user icon"></i>
                                        </div>
                                    </div>

                                    <div className="field">
                                        <div className="ui fluid large left icon input">
                                            <input type="password" name="password"  value={this.state.password} onChange={this.handleInput.bind(this,'password')} placeholder="密码..." />
                                            <i className="lock icon"></i>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="ui fluid primary big submit button" onClick={this.handleClickLogin.bind(this)}>
                                            <FormattedMessage id="LOGIN_BUTTON_LOGIN" defaultMessage='登录' />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </IntlProvider>
        );
    }
}
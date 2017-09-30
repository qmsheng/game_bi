/**
 * Created by Administrator on 2016/11/14.
 */
import React, {Component} from 'react';

import { IntlProvider, addLocaleData, FormattedMessage} from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';

import intl from 'intl';
import {zh_CN} from '../lang/zh_CN';
import {en_US} from '../lang/en_US';
addLocaleData([...en,...zh]);

import AppAction from "../actions/AppAction";
import AppStore from "../stores/AppStore";
import Loading from "../components/Loading"

import Top from '../components/Top';
import Left from '../components/Left';
import SubMenu from '../components/SubMenu';

export default class App extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = AppStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        AppStore.listen(this.onChange);
        AppAction.initApp();
    }

    componentWillUnmount() {
        AppStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
        if (this.state.loginFailed) {
            this.context.router.push('/login');
        }
    }

    handleLogout() {
        AppAction.logout();
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
        let page = (<div className="z-full-container"><Loading /></div>);
        if (this.state.inited && this.state.loginFailed == false) {
            let menu = null;
            let subMenu = null;
            let url = this.props.location.pathname;
            let selected = -1;
            let selectedSubMenu = -1;

            for(var i = 0; i < this.state.user.menus.length; i++){
                if (this.state.user.menus[i].url == url) {
                    selected = i;
                    for(var j = 0; j <  this.state.user.menus[i].menus.length; j++) {
                        if (this.state.user.menus[i].url == url) {
                            selectedSubMenu = j;
                            break;
                        }
                    }
                    break;
                } else {
                    for(var j = 0; j <  this.state.user.menus[i].menus.length; j++) {
                        if (this.state.user.menus[i].menus[j].url == url) {
                            selectedSubMenu = j;
                            selected = i;
                            break;
                        }
                    }
                    if (selected >= 0) {
                        break;
                    }
                }
            }

            if (selected >= 0) {
                menu = this.state.user.menus[selected];
                if (selectedSubMenu >= 0) {
                    subMenu = menu.menus[selectedSubMenu];
                }
            }

            let contentTitle = <div></div>;
            if (subMenu) {
                contentTitle = (
                    <div className="z-base-panel">
                        <h3>{subMenu.menu_name}</h3>
                        <div className="ui divider"></div>
                    </div>
                );
            }


            page = (<div className="z-full-container">
                {this.state.loading ? <Loading /> : <div></div>}
                <Top handleLogout={this.handleLogout.bind(this)} />
                <div className="z-main">
                    <Left menus={this.state.user.menus} selected={selected} />
                    <div className="z-main-right">
                        <SubMenu menu={menu} selected={selectedSubMenu} />
                        <div className={menu != null && menu.menus.length > 0 ? "z-content-with-submenu-container" : ".z-content-no-submenu-container"}>
                            <div className="z-content">
                                {contentTitle}
                                {this.props.children}
                            </div>
                        </div>

                    </div>
                </div>
            </div>);
        }
        return (
            <IntlProvider locale="zh" messages={msgLang} >
                {page}
            </IntlProvider>
        );
    }
}
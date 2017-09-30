/**
 * Created by Administrator on 2016/9/12.
 */
import React, {Component} from 'react';

import ServerAction from "../actions/ServerAction";
import ServerStore from "../stores/ServerStore";

import DataTable from "../components/DataTable"
import PopWin from "../components/PopWin"
import BiForm from "../components/BiForm"

export default class Server extends Component {
    constructor(props) {
        super(props);
        this.state = ServerStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        ServerStore.listen(this.onChange);
        ServerAction.query(1);
    }

    componentWillUnmount() {
        ServerStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleClickAdd(event) {
        let server = {id:'',platform_id:'',server_id:'',server_name:'',server_ip:'',platform_server_id:'',login_port:'', description:'', http_port:'', lang:'', login_key:'', pay_key:'', http_api_server_address:'', platform:{platform_name:''}, status:'', active:'', created_at:''};
        ServerAction.setEditObj(server);
        ServerAction.showWin(true);
    }

    handleEdit(server,event) {
        let clone = {};
        $.extend(clone,server);
        ServerAction.setEditObj(clone);
        ServerAction.showWin(true);
    }

    handleDelete(id) {
        ServerAction.delete(id);
    }


    handleOpenSer(id) {
        let params = {
            server_id:this.state.server.server_id,
        };

        ServerAction.openSer(params);
    }

    handleCloseSer() {
        let params = {
            server_id:this.state.server.server_id,
        };

        ServerAction.closeSer(params);
    }

    handleMakeGSSer() {
        let params = {
            server_ids:this.state.server.server_ids,
            is_restart:this.state.server.is_restart,
            authentication_key:this.state.server.authentication_key,
        };

        ServerAction.makeGSSer(params);
    }

    handleInput(name, val, event) {
        var newState=this.state.server;
        if (val != "") {
            newState[name]=val;
        } else {
            newState[name]=event.target.value;
        }
        ServerAction.setEditObj(newState);
    }

    handleQueryPage(page) {
        ServerAction.query(page);
    }

    handleClickSave() {
        ServerAction.save(this.state.server);
    }

    handleSelectStartDate(date, text) {
        var newState=this.state.server;
        newState['created_at'] = date;
        ServerAction.setEditObj(newState);
        return true;
    }

    render() {
        let table = {
            data:this.state.servers.data ? this.state.servers.data : {},
            page:this.state.servers.current_page ?this.state.servers.current_page:1,
            max:this.state.servers.last_page ? this.state.servers.last_page : 1,
            query:this.handleQueryPage.bind(this),
            fields:[
                {width:'',styleName:'',title:'区服ID',type:'text',fieldName:'server_id'},
                {width:'',styleName:'',title:'区服名称',type:'text',fieldName:'server_name'},
                {width:'',styleName:'',title:'服务器ID',type:'text',fieldName:'platform_server_id'},
                {width:'',styleName:'',title:'所属平台',type:'text',fieldName:'platform',subFieldName:'platform_name'},
                {width:'',styleName:'',title:'服务器IP(域名)',type:'text',fieldName:'server_ip'},
                {width:'',styleName:'',title:'游戏端口',type:'text',fieldName:'login_port'},
                {width:'',styleName:'',title:'HTTP通知端口',type:'text',fieldName:'http_port'},
                {width:'',styleName:'',title:'语言',type:'text',fieldName:'lang'},
                {width:'',styleName:'',title:'登录KEY',type:'text',fieldName:'login_key'},
                {width:'',styleName:'',title:'支付KEY',type:'text',fieldName:'pay_key'},
                {width:'',styleName:'',title:'客户端API接口地址',type:'text',fieldName:'http_api_server_address'},
                {width:'',styleName:'',title:'当前状态',type:'text',fieldName:'status'},
                {width:'',styleName:'',title:'激活状态',type:'active',fieldName:'active'},
                {width:'80',styleName:'center aligned',title:'操作',type:'op',fieldName:'', options:{edit:this.handleEdit.bind(this), delete:this.handleDelete.bind(this)}},
                {width:'80',styleName:'center aligned',title:'关服',type:'op',fieldName:'', options:{edit:this.handleEdit.bind(this)}},
                {width:'80',styleName:'center aligned',title:'开服',type:'op',fieldName:'', options:{delete:this.handleOpenSer.bind(this)}},
            ]
        };

        let form = {
            data: this.state.server,
            input:this.handleInput.bind(this),
            styles:'ui equal width form',
            fields: [
                {type:'row'},
                {label: '区服ID', fieldName: 'server_id', type: 'text', styles:'required field'},
                {label: '区服名称', fieldName: 'server_name', type: 'text', styles:'required field'},
                {label: '所属平台', fieldName: 'platform_id', type: 'select', options:{key:'id',val:'platform_name', data:this.state.platforms}, styles:'required field'},
                {type:'erow'},

                {type:'row'},
                {label: '语言', fieldName: 'lang', type: 'text', styles:'required field'},
                {label: '服务器ID', fieldName: 'platform_server_id', type: 'text', styles:'required field'},
                {label: '区服描述', fieldName: 'description', type: 'text', styles:'field'},
                {type:'erow'},

                {type:'row'},
                {label: '服务器IP(域名)', fieldName: 'server_ip', type: 'text', styles:'required field'},
                {label: '游戏端口', fieldName: 'login_port', type: 'text', styles:'required field'},
                {label: 'HTTP监听端口', fieldName: 'http_port', type: 'text', styles:'required field'},
                {type:'erow'},

                {type:'row'},
                {label: '登录KEY', fieldName: 'login_key', type: 'text', styles:'required field'},
                {label: '支付KEY', fieldName: 'pay_key', type: 'text', styles:'required field'},
                {label: '客户端API接口地址', fieldName: 'http_api_server_address', type: 'text', styles:'required field'},
                {type:'erow'},

                {label: '', fieldName: '',type: 'submit', styles:'', options:{text:'保存',handleClick:this.handleClickSave.bind(this)}},
            ]
        };

        let form2 = {
            data: this.state.server,
            input:this.handleInput.bind(this),
            styles:'ui equal width form',
            fields: [
                {type:'row'},
                {label: '区服ID', fieldName: 'server_id', type: 'text', styles:'required field'},
                {type:'erow'},

                {type:'row'},
                {type:'submit', options:{text:'关服', handleClick:this.handleCloseSer.bind(this)}},
                {type:'submit', options:{text:'开服', handleClick:this.handleOpenSer.bind(this)}},
                {type:'erow'},
            ]
        };

        let form3 = {
            data: this.state.server,
            input:this.handleInput.bind(this),
            styles:'ui equal width form',
            fields: [
                {type:'row'},
                {label: '编服ID', fieldName: 'server_ids', type: 'select', options:{key:'id',val:'id', data:this.state.gsserverinfo}, styles:'required field'},
                {label: '是否重启服务器', fieldName: 'is_restart', type: 'text', styles:'required field'},
                {label: '鉴权key', fieldName: 'authentication_key', type: 'text', styles:'required field'},
                {type:'erow'},

                {type:'row'},
                {type:'submit', options:{text:'提交', handleClick:this.handleMakeGSSer.bind(this)}},
                {type:'erow'},
            ]
        };

        let edit = <div></div>;
        if (this.state.showWin) {
            edit = (
                <div className="ui segment">
                    <BiForm config={form} />

                    <h1>1)开关服</h1>
                    <BiForm config={form2} />

                    <h1>2)编译游戏服务器</h1>
                    <BiForm config={form3} />
                </div>);
        }

        return (
            <div>
                <div className="ui segments">
                    <div className="ui segment">
                        <button className="ui button" type="submit" onClick={this.handleClickAdd.bind(this)}>新增服务器</button>
                    </div>
                    {edit}
                </div>
                <div className="ui segments">
                    <div className="ui segment">
                        <DataTable title="服务器列表" config={table} />
                    </div>
                </div>
            </div>
        );
    }
}
/**
 * Created by Administrator on 2016/9/12.
 */
import React, {Component} from 'react';

import UserAction from "../actions/UserAction";
import UserStore from "../stores/UserStore";

import DataTable from "../components/DataTable";
import PopWin from "../components/PopWin";
import BiForm from "../components/BiForm";

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = UserStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        UserStore.listen(this.onChange);
        UserAction.query(1);
    }

    componentWillUnmount() {
        UserStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleEdit(user,event) {
        let clone = {};
        $.extend(clone,user);
        let ids = [];
        for(let i = 0; i < clone.roles.length; i++) {
            ids.push(clone.roles[i].id);
        }
        clone['role_ids'] = ids;
        UserAction.setEditObj(clone);
        UserAction.showWin(true);
    }

    handleDelete(id) {
        UserAction.delete(id);
    }

    handleInput(name, val, event) {
        var newState=this.state.user;
        if (val != "") {
            newState[name]=val;
        } else {
            newState[name]=event.target.value;
        }
        UserAction.setEditObj(newState);
    }

    handleClickSave() {
        UserAction.save(this.state.user);
    }

    handleQueryPage(page) {
        UserAction.query(page);
    }

    handleCheck(id,e) {
        let user = this.state.user;
        if(e.target.checked) {
            user['role_ids'].push(id);
        } else {
            user['role_ids'].splice($.inArray(id, user['role_ids']), 1);
        }
        UserAction.setEditObj(user);
    }

    handleClickAdd(event) {
        UserAction.setEditObj({username:'',display_name:'',email:'',roles:[],qq:'',id:'', role_id:'', roles:[],role_ids:[]});
        UserAction.showWin(true);
    }

    render() {
        let table = {
            data:this.state.users.data ? this.state.users.data : {},
            page:this.state.users.current_page ?this.state.users.current_page:1,
            max:this.state.users.last_page ? this.state.users.last_page : 1,
            query:this.handleQueryPage.bind(this),
            fields:[
                {width:'',styleName:'',title:'用户名',type:'text',fieldName:'username'},
                {width:'',styleName:'',title:'昵称',type:'text',fieldName:'display_name'},
                {width:'',styleName:'',title:'电子邮箱',type:'text',fieldName:'email'},
                {width:'',styleName:'',title:'QQ',type:'text',fieldName:'qq'},
                {width:'',styleName:'',title:'角色',type:'text',fieldName:'roles',subFieldNames:'role_name'},
                {width:'',styleName:'',title:'是否激活',type:'active',fieldName:'active'},
                {width:'80',styleName:'center aligned',title:'操作',type:'op',fieldName:'', options:{edit:this.handleEdit.bind(this), delete:this.handleDelete.bind(this)}}
            ]
        };

        let tableRole = {
            title:'角色列表',
            data:this.state.roles ? this.state.roles : {},
            fields:[
                {width:'50',styleName:'',title:'选择',type:'ck',fieldName:'id', ref:this.state.user.role_ids, options:{check:this.handleCheck.bind(this)}},
                {width:'',styleName:'',title:'角色名',type:'text',fieldName:'role_name'}
            ]
        };

        let form = {
            data: this.state.user,
            input:this.handleInput.bind(this),
            styles:'ui equal width form',
            fields: [
                {type:'row',styles:'inline fields'},
                {label: '账号', fieldName: 'username', type: 'text', styles:'required field'},
                {label: '昵称', fieldName: 'display_name', type: 'text', styles:'required field'},
                {label: '邮箱', fieldName: 'email', type: 'text', styles:'required field'},
                {label: 'QQ号', fieldName: 'qq',type: 'text', styles:'required field'},
                {label: '', fieldName: '',type: 'submit', styles:'', options:{text:'保存',handleClick:this.handleClickSave.bind(this)}},
                {type:'erow'},
                {label: '', fieldName: '',type: 'datatable', table:tableRole, styles:'required field'},
            ]
        };

        let edit = <div></div>;
        if (this.state.showWin) {
            edit = (
                <div className="ui segment">
                    <BiForm config={form} />
                </div>);
        }
        return (
            <div>
                <div className="ui segments">
                    <div className="ui segment">
                        <button className="ui button" type="submit" onClick={this.handleClickAdd.bind(this)}>新增账号</button>
                    </div>
                    {edit}
                </div>
                <div className="ui segments">
                    <div className="ui segment">
                        <DataTable title="账号列表" config={table} />
                    </div>
                </div>
            </div>
        );
    }
}
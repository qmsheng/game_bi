/**
 * Created by Administrator on 2016/9/12.
 */
import React, {Component} from 'react';

import RoleAction from "../actions/RoleAction";
import RoleStore from "../stores/RoleStore";

import DataTable from "../components/DataTable"
import BiForm from "../components/BiForm"
import PopWin from "../components/PopWin"

export default class Role extends Component {
    constructor(props) {
        super(props);
        this.state = RoleStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        RoleStore.listen(this.onChange);
        RoleAction.query(1);
        RoleAction.queryMenu(1);
        RoleAction.queryPermission(1);
    }

    componentWillUnmount() {
        RoleStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleClickAdd() {
        RoleAction.setEditObj({role_name:'',id:'', description:'', current_page:1, last_page:1});
        RoleAction.showWin(true);
    }

    handleEdit(role) {
        let clone = {};;
        $.extend(clone,role);
        let ids = [];
        for(let i = 0; i < clone.menus.length; i++) {
            ids.push(clone.menus[i].id);
        }
        clone['menu_ids'] = ids;
        ids = [];
        for(let i = 0; i < clone.permissions.length; i++) {
            ids.push(clone.permissions[i].id);
        }
        clone['permission_ids'] = ids;
        RoleAction.setEditObj(clone);
        RoleAction.showWin(true);
    }

    handleDelete(id) {
        RoleAction.delete(id);
    }

    handleInput(name, val, event) {
        var newState=this.state.role;
        if (val) {
            newState[name]=val;
        } else {
            newState[name]=event.target.value;
        }
        RoleAction.setEditObj(newState);
    }

    handleQueryPage(page) {
        RoleAction.query(page);
    }

    handleQueryPageMenu(page) {
        RoleAction.queryMenu(page);
    }

    handleQueryPagPermission(page) {
        RoleAction.queryPermission(page);
    }

    handleClickSave() {
        RoleAction.save(this.state.role);
    }

    handleCheck(id,e) {
        let role = this.state.role;
        if(e.target.checked) {
            role['menu_ids'].push(id);
        } else {
            role['menu_ids'].splice($.inArray(id, role['menu_ids']), 1);
        }
        RoleAction.setEditObj(role);
    }

    handleCheckPermission(id,e) {
        let role = this.state.role;
        if(e.target.checked) {
            role['permission_ids'].push(id);
        } else {
            role['permission_ids'].splice($.inArray(id, role['permission_ids']), 1);
        }
        RoleAction.setEditObj(role);
    }

    render() {
        let table = {
            data:this.state.roles.data ? this.state.roles.data : {},
            page:this.state.roles.current_page ?this.state.roles.current_page:1,
            max:this.state.roles.last_page ? this.state.roles.last_page : 1,
            query:this.handleQueryPage,
            fields:[
                {width:'30%',styleName:'',title:'角色名',type:'text',fieldName:'role_name'},
                {width:'',styleName:'',title:'描述',type:'text',fieldName:'description'},
                {width:'80',styleName:'center aligned',title:'操作',type:'op',fieldName:'', options:{edit:this.handleEdit.bind(this), delete:this.handleDelete.bind(this)}}
            ]
        };

        let tableMenu = {
            title:'菜单列表',
            data:this.state.menus.data ? this.state.menus.data : {},
            page:this.state.menus.current_page ?this.state.menus.current_page:1,
            max:this.state.menus.last_page ? this.state.menus.last_page : 1,
            query:this.handleQueryPageMenu.bind(this),
            fields:[
                {width:'50',styleName:'',title:'选择',type:'ck',fieldName:'id', ref:this.state.role?this.state.role.menu_ids:[], options:{check:this.handleCheck.bind(this)}},
                {width:'',styleName:'',title:'菜单名',type:'text',fieldName:'menu_name'},
                {width:'',styleName:'',title:'链接',type:'text',fieldName:'url'},
                {width:'',styleName:'',title:'描述',type:'text',fieldName:'description'}
            ]
        };
        let tablePermission = {
            title:'权限列表',
            data:this.state.permissions.data ? this.state.permissions.data : [],
            page:this.state.permissions.current_page ?this.state.permissions.current_page:1,
            max:this.state.permissions.last_page ? this.state.permissions.last_page : 1,
            query:this.handleQueryPagPermission.bind(this),
            fields:[
                {width:'50',styleName:'',title:'选择',type:'ck',fieldName:'id', ref:this.state.role?this.state.role.permission_ids:[], options:{check:this.handleCheckPermission.bind(this)}},
                {width:'',styleName:'',title:'链接',type:'text',fieldName:'permission_name'},
                {width:'',styleName:'',title:'方式',type:'text',fieldName:'method'},
                {width:'',styleName:'',title:'描述',type:'text',fieldName:'description'}
            ]
        };

        let form = {
            data: this.state.role,
            input:this.handleInput.bind(this),
            styles:'ui equal width form',
            fields: [
                {type:'row',styles:'inline fields'},
                {label: '角色名', fieldName: 'role_name', type: 'text', require:true},
                {label: '区服描述', fieldName: 'description', type: 'text', require:false},
                {label: '', fieldName: '',type: 'submit', styles:'', options:{text:'保存',handleClick:this.handleClickSave.bind(this)}},
                {type:'erow'},
                {label: '', fieldName: '',type: 'datatable', table:tableMenu, styles:'required field'},
                {label: '', fieldName: '',type: 'datatable', table:tablePermission, styles:'required field'},
            ]
        };

        let edit = <div></div>;
        if (this.state.showWin) {
            edit = (
                <div className="ui segment">
                    <BiForm config={form} />
                </div>
            );
        }
        return (
            <div>
                <div className="ui segments">
                    <div className="ui segment">
                        <button className="ui button" type="submit" onClick={this.handleClickAdd.bind(this)}>新增角色</button>
                    </div>
                    {edit}
                </div>
                <div className="ui segments">
                    <div className="ui segment">
                        <DataTable title="角色列表" config={table} />
                    </div>
                </div>
            </div>
        );
    }
}
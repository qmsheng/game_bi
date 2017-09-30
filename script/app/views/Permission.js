/**
 * Created by Administrator on 2016/9/12.
 */
import React, {Component} from 'react';

import PermissionAction from "../actions/PermissionAction";
import PermissionStore from "../stores/PermissionStore";

import DataTable from "../components/DataTable"
import BiForm from "../components/BiForm"

export default class Permission extends Component {
    constructor(props) {
        super(props);
        this.state = PermissionStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        PermissionStore.listen(this.onChange);
        PermissionAction.query(1);
    }

    componentWillUnmount() {
        PermissionStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleEdit(permission) {
        let clone = {};;
        $.extend(clone,permission);
        PermissionAction.setEditObj(clone);
        PermissionAction.showWin(true);
    }

    handleDelete(id) {
        PermissionAction.delete(id);
    }

    handleClickAdd(event) {
        PermissionAction.setEditObj({permission:'',method:'', id:'', description:''});
        PermissionAction.showWin(true);
    }

    handleInput(name, val, event) {
        var newState=this.state.permission;
        if (val != "") {
            newState[name]=val;
        } else {
            newState[name]=event.target.value;
        }
        PermissionAction.setEditObj(newState);
    }

    handleClickSave() {
        console.log(this.state.permission);
        PermissionAction.save(this.state.permission);
    }



    render() {

        let form = {
            data: this.state.permission,
            input:this.handleInput.bind(this),
            fields: [
                {type:'row',styles:'inline fields'},
                {label: '链接地址', fieldName: 'permission', type: 'text',styles:'required field'},
                {label: '方式', fieldName: 'method', type: 'select', styles:'required field', options:{key:'id', val:'val',data:[
                    {id:'GET',val:'GET'},
                    {id:'POST',val:'POST'},
                    {id:'PUT',val:'PUT'},
                    {id:'DELETE',val:'DELETE'}
                ]}},
                {label: '描述', fieldName: 'description', type: 'text', styles:'field'},
                {label: '', fieldName: '',type: 'submit', styles:'', options:{text:'保存',handleClick:this.handleClickSave.bind(this)}},
                {type:'erow'}
            ]
        };

        let table = {
            data:this.state.permissions.data ? this.state.permissions.data : {},
            page:this.state.permissions.current_page ?this.state.permissions.current_page:1,
            max:this.state.permissions.last_page ? this.state.permissions.last_page : 1,
            query:this.handleQueryPage,
            fields:[
                {width:'',styleName:'',title:'链接地址',type:'text',fieldName:'permission'},
                {width:'',styleName:'',title:'方式',type:'text',fieldName:'method'},
                {width:'',styleName:'',title:'描述',type:'text',fieldName:'description'},
                {width:'80',styleName:'',title:'操作',type:'op',fieldName:'', options:{edit:this.handleEdit.bind(this), delete:this.handleDelete.bind(this)}}

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
                        <button className="ui button" type="submit" onClick={this.handleClickAdd.bind(this)}>添加权限</button>
                    </div>
                    {edit}
                </div>
                <div className="ui segments">
                    <div className="ui segment">
                        <DataTable title="权限列表" config={table} />
                    </div>
                </div>
            </div>
        );
    }
}
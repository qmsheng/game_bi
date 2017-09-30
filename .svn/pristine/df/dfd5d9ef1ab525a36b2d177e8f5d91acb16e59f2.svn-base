/**
 * Created by Administrator on 2016/9/12.
 */
import React, {Component} from 'react';

import RoleCopyAction from "../actions/RoleCopyAction";
import RoleCopyStore from "../stores/RoleCopyStore";

import BiForm from "../components/BiForm"
import DataTable from "../components/DataTable"

import PopWin from "../components/PopWin"

export default class QueryPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = RoleCopyStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        RoleCopyStore.listen(this.onChange);
        RoleCopyAction.query();
    }

    componentWillUnmount() {
        RoleCopyStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleClickQueryPlayer() {
        RoleCopyAction.queryPlayer(this.state.form);
    }

    handleClickCopyPlayer(obj){
        $('#copy').modal('show');
        let copy = this.state.copy;
        copy['role_id'] = obj.role_id;
        copy['server_id'] = obj.server_id;
        RoleCopyAction.setCopy(copy);
    }

    handleInput(name, val, event) {
        var newState=this.state.form;
        if (val != "") {
            newState[name]=val;
        } else {
            newState[name]=event.target.value;
        }
        this.setState({form:newState});
        RoleCopyAction.setEditObj(newState);
    }

    handleQueryPage(page) {

    }

    handleInputChange(name, val, event) {
        var newState=this.state.copy;
        if (val != "") {
            newState[name]=val;
        } else {
            newState[name]=event.target.value;
        }
        RoleCopyAction.setCopy(newState);
    }

    handleClickApply() {
        RoleCopyAction.copyPlayer(this.state.copy);
        $('#copy').modal('hide');
    }

    handleClickCancel() {
        $('#copy').modal('hide');
    }

    render() {
        let form = {
            data: this.state.form,
            input:this.handleInput.bind(this),
            fields: [
                {type:'row', styles:'inline fields'},
                {label: '平台', fieldName: 'platform_id', type: 'select', options:{key:'id',val:'platform_name', data:this.state.platforms}, styles:'required field'},
                {label: '区服', fieldName: 'server_id', type: 'select', options:{key:'server_id',val:'server_name', ref:'platform_id', data:this.state.servers}, styles:'required field'},
                {label: '角色名', fieldName: 'role_name', type: 'text', styles:'field'},
                {label: '角色ID', fieldName: 'role_id', type: 'text', styles:'field'},
                {type:'submit', options:{text:'查询玩家信息', handleClick:this.handleClickQueryPlayer.bind(this)}},
                {type:'erow'}
            ]
        };

        let table = {
            data:this.state.role_infos,
            fields:[
                {width:'',styleName:'',title:'角色ID',type:'text',fieldName:'role_id'},
                {width:'',styleName:'',title:'角色名',type:'text',fieldName:'role_name'},
                {width:'',styleName:'',title:'创建时间',type:'text',fieldName:'create_time'},
                {width:'',styleName:'',title:'等级',type:'text',fieldName:'level'},
                {width:'',styleName:'center aligned',title:'操作',type:'buttons',fieldName:'', options:{buttons:[
                    {title:'复制', click:this.handleClickCopyPlayer.bind(this), styles:''}
                ]}},
            ]
        };

        let popWin = {
            id : 'copy',
            handleCancel: this.handleClickCancel.bind(this),
            handleSave: this.handleClickApply.bind(this)
        };

        let editForm = {
            data: this.state.copy,
            input:this.handleInputChange.bind(this),
            fields: [
                {label: '新账号名', fieldName: 'new_account', type: 'text', styles:'required field'},
                {label: '新角色名', fieldName: 'new_name', type: 'text', styles:'required field'}
            ]
        }

        return (
            <div>
                <div className="ui segments">
                    <div className="ui segment">
                        <BiForm config={form} />
                    </div>
                </div>
                <DataTable title="玩家信息" config={table} />
                <PopWin title="复制" config={popWin}>
                    <BiForm config={editForm} />
                </PopWin>
            </div>
        );
    }
}
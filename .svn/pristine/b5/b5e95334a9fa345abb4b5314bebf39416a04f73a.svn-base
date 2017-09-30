/**
 * Created by Administrator on 2016/9/12.
 */
import React, {Component} from 'react';

import KickPlayerAction from "../actions/KickPlayerAction";
import KickPlayerStore from "../stores/KickPlayerStore";

import BiForm from "../components/BiForm"
import DataTable from "../components/DataTable"

import PopWin from "../components/PopWin"

export default class KickPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = KickPlayerStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        KickPlayerStore.listen(this.onChange);
        KickPlayerAction.query();
    }

    componentWillUnmount() {
        KickPlayerStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleClickKickPlayer(obj) {
        $('#kick').modal('hide');
        KickPlayerAction.kickPlayer(obj.role_id, obj.server_id);
    }


    handleClickSilencePlayer(obj) {
        $('#kick').modal('show');
        let freeze = this.state.freeze;
        freeze['type'] = 'silence';
        freeze['role_id'] = obj.role_id;
        freeze['server_id'] = obj.server_id;
        KickPlayerAction.setFreeze(freeze);
    }

    handleClickUnSilencePlayer(obj) {
        $('#kick').modal('hide');
        KickPlayerAction.sendUnSilence(obj.role_id, obj.server_id);
    }

    handleClickFreezePlayer(obj) {
        $('#kick').modal('show');
        let freeze = this.state.freeze;
        freeze['type'] = 'freeze';
        freeze['role_id'] = obj.role_id;
        freeze['server_id'] = obj.server_id;
        KickPlayerAction.setFreeze(freeze);
    }

    handleClickUnFreezePlayer(obj) {
        $('#kick').modal('hide');
        KickPlayerAction.sendUnFreeze(obj.role_id, obj.server_id);
    }

    handleClickQuery() {
        KickPlayerAction.queryFreezeInfo(this.state.form);
    }

    handleInput(name, val, event) {
        var newState=this.state.form;
        if (val != "") {
            newState[name]=val;
        } else {
            newState[name]=event.target.value;
        }
        KickPlayerAction.setEditObj(newState);
    }

    handleInputChange(name, val, event) {
        var newState=this.state.freeze;
        if (val != "") {
            newState[name]=val;
        } else {
            newState[name]=event.target.value;
        }
        KickPlayerAction.setFreeze(newState);
    }

    handleClickApply() {
        KickPlayerAction.sendFreeze(this.state.freeze);
        $('#kick').modal('hide');
    }

    handleClickCancel() {
        $('#kick').modal('hide');
    }

    render() {
        let form = {
            data: this.state.form,
            input:this.handleInput.bind(this),
            fields: [
                {type:'row', styles:'inline fields'},
                {label: '平台', fieldName: 'platform_id', type: 'select', options:{key:'id',val:'platform_name', data:this.state.platforms}, styles:'required field'},
                {label: '区服', fieldName: 'server_id', type: 'select', options:{key:'server_id',val:'server_name',ref:'platform_id', data:this.state.servers}, styles:'required field'},
                {label: '角色名', fieldName: 'role_name', type: 'text', styles:'required field'},
                {label: '角色ID', fieldName: 'role_id', type: 'text', styles:'required field'},
                {type:'submit', options:{text:'查询', handleClick:this.handleClickQuery.bind(this)}},
                {type:'erow'},
            ]
        };

        let table = {
            data:this.state.freezes ? this.state.freezes : {},
            fields:[
                {width:'',styleName:'',title:'服务器ID',type:'text',fieldName:'server_id'},
                {width:'',styleName:'',title:'角色ID',type:'text',fieldName:'role_id'},
                {width:'',styleName:'',title:'角色名',type:'text',fieldName:'role_name'},
                {width:'',styleName:'',title:'在线/不在线',type:'active',fieldName:'online'},
                {width:'',styleName:'',title:'禁言',type:'text',fieldName:'silence_hour'},
                {width:'',styleName:'',title:'封停',type:'text',fieldName:'freeze_hour'},
                {width:'300',styleName:'center aligned',title:'操作',type:'buttons',fieldName:'', options:{buttons:[
                    {title:'踢下线', click:this.handleClickKickPlayer.bind(this), styles:''},
                    {title:'禁言', click:this.handleClickSilencePlayer.bind(this), styles:''},
                    {title:'解禁', click:this.handleClickUnSilencePlayer.bind(this), styles:''},
                    {title:'封停', click:this.handleClickFreezePlayer.bind(this), styles:''},
                    {title:'解封', click:this.handleClickUnFreezePlayer.bind(this), styles:''}
                ]}},
            ]
        };

        let popWin = {
            id : 'kick',
            handleCancel: this.handleClickCancel.bind(this),
            handleSave: this.handleClickApply.bind(this)
        };

        let editForm = {
            data: this.state.freeze,
            input:this.handleInputChange.bind(this),
            fields: [
                {label: '小时数', fieldName: 'hour', type: 'text', styles:'required field'}
            ]
        }

        return (
            <div>
                <div className="ui segments">
                    <div className="ui segment">
                        <BiForm config={form} />
                    </div>
                </div>
                <DataTable title="在线人数信息" config={table} />
                <PopWin title="封号/禁言" config={popWin}>
                    <BiForm config={editForm} />
                </PopWin>
            </div>
        );
    }
}
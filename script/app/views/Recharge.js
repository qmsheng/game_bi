/**
 * Created by QiuMaoSheng on 2017/06/21
 */
import React, {Component} from 'react';

import RechargeAction from "../actions/RechargeAction";
import RechargeStore from "../stores/RechargeStore";

import BiForm from "../components/BiForm"
import DataTable from "../components/DataTable"

export default class Recharge extends Component {
    constructor(props) {
        super(props);
        this.state = RechargeStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        RechargeStore.listen(this.onChange);
        RechargeAction.query();
    }

    componentWillUnmount() {
        RechargeStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleClickRecharge() {
        let params = {
            platform_name:this.state.form.platform_name,
            server_id:this.state.form.server_id,
            start_time:this.state.form.start_time.format('YYYY-MM-DD'),
            end_time:this.state.form.end_time.format('YYYY-MM-DD'),
            role_name:this.state.form.role_name,
        };
        RechargeAction.queryRecharge(params);
    }

    handleInput(name, val, event) {
        var newState=this.state.form;
        if (val != "") {
            newState[name]=val;
        } else {
            newState[name]=event.target.value;
        }
        RechargeAction.setEditFormObj(newState);
    }

    handleSelectStartDate(date, text) {
        var newState=this.state.form;
        newState['start_time'] = date;
        RechargeAction.setEditFormObj(newState);
        return true;
    }

    handleSelectEndDate(date, text) {
        var newState=this.state.form;
        newState['end_time'] = date;
        RechargeAction.setEditFormObj(newState);
        return true;
    }

    render() {
        let form = {
            data: this.state.form,
            input:this.handleInput.bind(this),
            fields: [
                {type:'row', styles:'inline fields'},
                {label: '平台', fieldName: 'platform_name', type: 'select', options:{key:'platform_name',val:'platform_name', data:this.state.platforms}, styles:'required field'},
                {label: '区服', fieldName: 'server_id', type: 'select', options:{key:'server_id',val:'server_name', data:this.state.servers, ref:'platform_name'}, styles:'required field'},
                {label: '开始时间', fieldName: 'start_time', type: 'datepicker', options:{change:this.handleSelectStartDate.bind(this)},styles:'required field'},
                {label: '结束时间', fieldName: 'end_time', type: 'datepicker', options:{change:this.handleSelectEndDate.bind(this)},styles:'required field'},
                {label: '玩家昵称', fieldName: 'role_name', type: 'text', styles:'required field'},
                {type:'submit', options:{text:'查询', handleClick:this.handleClickRecharge.bind(this)}},
                {type:'erow'}
            ]
        };

        let table = {
            data:this.state.recharge_info,
            fields:[
                {width:'',styleName:'',title:'平台名',type:'text',fieldName:'platform_name'},
                {width:'',styleName:'',title:'服务器',type:'text',fieldName:'platform_svr_id'},
                {width:'',styleName:'',title:'时间日期',type:'text',fieldName:'time'},
                {width:'',styleName:'',title:'订单流水号',type:'text',fieldName:'pay_id'},
                {width:'',styleName:'',title:'货币（CNY）',type:'text',fieldName:'money'},
                {width:'',styleName:'',title:'钻石数',type:'text',fieldName:'game_gold'},
                {width:'',styleName:'',title:'玩家昵称',type:'text',fieldName:'role_name'},
                {width:'',styleName:'',title:'玩家ID',type:'text',fieldName:'role_id'},
                {width:'',styleName:'',title:'玩家UID',type:'text',fieldName:'account'},
            ]
        };
        return (
            <div>
                <div className="ui segments">
                    <div className="ui segment">
                        <BiForm config={form} />
                    </div>
                </div>
                <DataTable title="单服报表" config={table} />
            </div>
        );
    }
}
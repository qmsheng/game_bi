/**
 * Created by LiuXiao on 2017/2/22.
 */

import React, {Component} from 'react';

import ChargeOrderAction from "../actions/ChargeOrderAction";
import ChargeOrderStore from "../stores/ChargeOrderStore";

import BiForm from "../components/BiForm"
import DataTable from "../components/DataTable"

export default class ChargeOrder extends Component {
    constructor(props) {
        super(props);
        this.state = ChargeOrderStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        ChargeOrderStore.listen(this.onChange);
        ChargeOrderAction.query();
    }

    componentWillUnmount() {
        ChargeOrderStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleClickChargeOrder() {
        let params = {
            server_id:this.state.form.server_id,
            start_time:this.state.form.start_time.format('YYYY-MM-DD'),
            end_time:this.state.form.end_time.format('YYYY-MM-DD'),
            uid:this.state.form.uid
        };
        ChargeOrderAction.queryChargeOrder(params);
    }

    handleInput(name, val, event) {
        var newState=this.state.form;
        if (val != "") {
            newState[name]=val;
        } else {
            newState[name]=event.target.value;
        }
        ChargeOrderAction.setEditFormObj(newState);
    }

    handleSelectStartDate(date, text) {
        var newState=this.state.form;
        newState['start_time'] = date;
        ChargeOrderAction.setEditFormObj(newState);
        return true;
    }

    handleSelectEndDate(date, text) {
        var newState=this.state.form;
        newState['end_time'] = date;
        ChargeOrderAction.setEditFormObj(newState);
        return true;
    }

    render() {
        let form = {
            data: this.state.form,
            input:this.handleInput.bind(this),
            fields: [
                {type:'row', styles:'inline fields'},
                {label: '平台', fieldName: 'platform_id', type: 'select', options:{key:'id',val:'platform_name', data:this.state.platforms}, styles:'required field'},
                {label: '区服', fieldName: 'server_id', type: 'select', options:{key:'server_id',val:'server_name', data:this.state.servers, ref:'platform_id'}, styles:'required field'},
                {label: '开始时间', fieldName: 'start_time', type: 'datepicker', options:{change:this.handleSelectStartDate.bind(this)},styles:'field'},
                {label: '结束时间', fieldName: 'end_time', type: 'datepicker', options:{change:this.handleSelectEndDate.bind(this)},styles:'field'},
                {label: '玩家uid', fieldName: 'uid', type: 'text', styles:'field'},
                {type:'submit', options:{text:'查询', handleClick:this.handleClickChargeOrder.bind(this)}},
                {type:'erow'}
            ]
        };

        let table = {
            data:this.state.reports,
            fields:[
                {width:'',styleName:'',title:'平台名',type:'text',fieldName:'platform_name'},
                {width:'',styleName:'',title:'服务器',type:'text',fieldName:'server_id'},
                {width:'',styleName:'',title:'时间',type:'text',fieldName:'time'},
                {width:'',styleName:'',title:'订单流水号',type:'text',fieldName:'pay_id'},
                {width:'',styleName:'',title:'订单金额',type:'text',fieldName:'money'},
                {width:'',styleName:'',title:'钻石充值数量',type:'text',fieldName:'game_gold'},
                {width:'',styleName:'',title:'玩家昵称',type:'text',fieldName:'role_name'},
                {width:'',styleName:'',title:'玩家ID',type:'text',fieldName:'role_id'},
                {width:'',styleName:'',title:'玩家uid',type:'text',fieldName:'account'}
            ]
        };
        return (
            <div>
                <div className="ui segments">
                    <div className="ui segment">
                        <BiForm config={form} />
                    </div>
                </div>
                <DataTable title="订单查询" config={table} />
            </div>
        );
    }
}

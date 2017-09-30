/**
 * Created by LiuXiao on 2017/2/22.
 */

import React, {Component} from 'react';

import PayDataAction from "../actions/PayDataAction";
import PayDataStore from "../stores/PayDataStore";

import BiForm from "../components/BiForm"
import DataTable from "../components/DataTable"

export default class PayData extends Component {
    constructor(props) {
        super(props);
        this.state = PayDataStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        PayDataStore.listen(this.onChange);
        PayDataAction.query();
    }

    componentWillUnmount() {
        PayDataStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleClickPayData() {
        let params = {
            server_id:this.state.form.server_id,
            start_time:this.state.form.start_time.format('YYYY-MM-DD'),
            end_time:this.state.form.end_time.format('YYYY-MM-DD'),
        };
        PayDataAction.queryPayData(params);
    }

    handleInput(name, val, event) {
        var newState=this.state.form;
        if (val != "") {
            newState[name]=val;
        } else {
            newState[name]=event.target.value;
        }
        PayDataAction.setEditFormObj(newState);
    }

    handleSelectStartDate(date, text) {
        var newState=this.state.form;
        newState['start_time'] = date;
        PayDataAction.setEditFormObj(newState);
        return true;
    }

    handleSelectEndDate(date, text) {
        var newState=this.state.form;
        newState['end_time'] = date;
        PayDataAction.setEditFormObj(newState);
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
                {label: '', fieldName: 'start_time', type: 'datepicker', options:{change:this.handleSelectStartDate.bind(this)},styles:'field'},
                {label: '', fieldName: 'end_time', type: 'datepicker', options:{change:this.handleSelectEndDate.bind(this)},styles:'field'},
                {type:'submit', options:{text:'查询', handleClick:this.handleClickPayData.bind(this)}},
                {type:'erow'}
            ]
        };

        let table = {
            data:this.state.reports,
            fields:[
                {width:'',styleName:'',title:'平台名',type:'text',fieldName:'platform_name'},
                {width:'',styleName:'',title:'服务器',type:'text',fieldName:'server_name'},
                {width:'',styleName:'',title:'日期',type:'text',fieldName:'time'},
                {width:'',styleName:'',title:'连接数',type:'text',fieldName:'connect'},
                {width:'',styleName:'',title:'创角数',type:'text',fieldName:'create'},
                {width:'',styleName:'',title:'老用户登陆数',type:'text',fieldName:'old_login'},
                {width:'',styleName:'',title:'总活跃用户数',type:'text',fieldName:'active'},
                {width:'',styleName:'',title:'活跃用户数(新/老)',type:'text',fieldName:'active_user'},
                {width:'',styleName:'',title:'付费金额(新/老)',type:'text',fieldName:'pay_value'},
                {width:'',styleName:'',title:'活跃用户付费数(新/老)',type:'text',fieldName:'active_pay'},
                {width:'',styleName:'',title:'活跃付费比(新/老)',type:'text',fieldName:'active_pay_percent'},
                {width:'',styleName:'',title:'活跃用户ARPPU(新/老)',type:'text',fieldName:'active_arppu'},
                {width:'',styleName:'',title:'活跃用户ARPU(新/老)',type:'text',fieldName:'active_arpu'}
            ]
        };
        return (
            <div>
                <div className="ui segments">
                    <div className="ui segment">
                        <BiForm config={form} />
                    </div>
                </div>
                <DataTable title="付费数据" config={table} />
            </div>
        );
    }
}
/**
 * Created by QiuMaoSheng on 2017/09/22
 */
import React, {Component} from 'react';

import TotalServerReportAction from "../actions/TotalServerReportAction";
import TotalServerReportStore from "../stores/TotalServerReportStore";

import BiForm from "../components/BiForm"
import DataTable from "../components/DataTable"

export default class TotalServerReport extends Component {
    constructor(props) {
        super(props);
        this.state = TotalServerReportStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        TotalServerReportStore.listen(this.onChange);
        TotalServerReportAction.query();
    }

    componentWillUnmount() {
        TotalServerReportStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleClickTotalServerReport() {
        let params = {
            platform_id:this.state.form.platform_id,
            start_time:this.state.form.start_time.format('YYYY-MM-DD'),
            end_time:this.state.form.end_time.format('YYYY-MM-DD')
        };
        TotalServerReportAction.queryTotalServerReport(params);
    }

    handleInput(name, val, event) {
        var newState=this.state.form;
        if (val != "") {
            newState[name]=val;
        } else {
            newState[name]=event.target.value;
        }
        TotalServerReportAction.setEditFormObj(newState);
    }

    handleSelectStartDate(date, text) {
        var newState=this.state.form;
        newState['start_time'] = date;
        TotalServerReportAction.setEditFormObj(newState);
        return true;
    }

    handleSelectEndDate(date, text) {
        var newState=this.state.form;
        newState['end_time'] = date;
        TotalServerReportAction.setEditFormObj(newState);
        return true;
    }

    render() {
        let form = {
            data: this.state.form,
            input:this.handleInput.bind(this),
            fields: [
                {type:'row', styles:'inline fields'},
                {label: '平台', fieldName: 'platform_id', type: 'select', options:{key:'id',val:'platform_name', data:this.state.platforms}, styles:'required field'},
                {label: '开始时间', fieldName: 'start_time', type: 'datepicker', options:{change:this.handleSelectStartDate.bind(this)},styles:'required field'},
                {label: '结束时间', fieldName: 'end_time', type: 'datepicker', options:{change:this.handleSelectEndDate.bind(this)},styles:'required field'},
                {type:'submit', options:{text:'查询', handleClick:this.handleClickTotalServerReport.bind(this)}},
                {type:'erow'}
            ]
        };

        let table = {
            data:this.state.reports,
            fields:[
                {width:'',styleName:'',title:'平台名',type:'text',fieldName:'platform_name'},
                {width:'',styleName:'',title:'服务器数量',type:'text',fieldName:'server_count'},
                {width:'',styleName:'',title:'连接数',type:'text',fieldName:'con_count'},
                {width:'',styleName:'',title:'用户数量',type:'text',fieldName:'create_user_count'},
                {width:'',styleName:'',title:'创角率',type:'text',fieldName:'create_role_rate'},
                {width:'',styleName:'',title:'登陆用户',type:'text',fieldName:'login_user_count'},
                {width:'',styleName:'',title:'活跃用户',type:'text',fieldName:'active_user_count'},
                {width:'',styleName:'',title:'在线人数（最高/平均）',type:'text',fieldName:'online_user_count'},
                {width:'',styleName:'',title:'充值金额（累计/当前）',type:'text',fieldName:'charge_money'},
                {width:'',styleName:'',title:'充值人数（累计/当前）',type:'text',fieldName:'charge_count'},
                {width:'',styleName:'',title:'ARPPU（总付费金额/日活跃用户数）',type:'text',fieldName:'arppu'},
                {width:'',styleName:'',title:'付费率',type:'text',fieldName:'pay_rate'},
            ]
        };
        return (
            <div>
                <div className="ui segments">
                    <div className="ui segment">
                        <BiForm config={form} />
                    </div>
                </div>
                <DataTable title="总报表" config={table} />
            </div>
        );
    }
}
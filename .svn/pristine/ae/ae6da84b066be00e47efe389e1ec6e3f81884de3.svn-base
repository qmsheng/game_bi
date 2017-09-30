/**
 * Created by Administrator on 2016/9/12.
 */
import React, {Component} from 'react';

import ServerReportAction from "../actions/ServerReportAction";
import ServerReportStore from "../stores/ServerReportStore";

import BiForm from "../components/BiForm"
import DataTable from "../components/DataTable"

export default class ServerReport extends Component {
    constructor(props) {
        super(props);
        this.state = ServerReportStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        ServerReportStore.listen(this.onChange);
        ServerReportAction.query();
    }

    componentWillUnmount() {
        ServerReportStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleClickServerReport() {
        let params = {
            server_id:this.state.form.server_id,
            start_time:this.state.form.start_time.format('YYYY-MM-DD'),
            end_time:this.state.form.end_time.format('YYYY-MM-DD')
        };
        ServerReportAction.queryServerReport(params);
    }

    handleInput(name, val, event) {
        var newState=this.state.form;
        if (val != "") {
            newState[name]=val;
        } else {
            newState[name]=event.target.value;
        }
        ServerReportAction.setEditFormObj(newState);
    }

    handleSelectStartDate(date, text) {
        var newState=this.state.form;
        newState['start_time'] = date;
        ServerReportAction.setEditFormObj(newState);
        return true;
    }

    handleSelectEndDate(date, text) {
        var newState=this.state.form;
        newState['end_time'] = date;
        ServerReportAction.setEditFormObj(newState);
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
                {type:'submit', options:{text:'查询', handleClick:this.handleClickServerReport.bind(this)}},
                {type:'erow'}
            ]
        };

        let table = {
            data:this.state.reports,
            fields:[
                {width:'',styleName:'',title:'平台名',type:'text',fieldName:'platform_name'},
                {width:'',styleName:'',title:'服务器',type:'text',fieldName:'server_name'},
                {width:'',styleName:'',title:'语种',type:'text',fieldName:'language'},
                {width:'',styleName:'',title:'日期',type:'text',fieldName:'time'},
                {width:'',styleName:'',title:'连接数',type:'text',fieldName:'connection'},
                {width:'',styleName:'',title:'新建角色',type:'text',fieldName:'create'},
                {width:'',styleName:'',title:'创角比例',type:'text',fieldName:'create_percent'},
                {width:'',styleName:'',title:'登陆数量',type:'text',fieldName:'login_count'},
                {width:'',styleName:'',title:'DAU',type:'text',fieldName:'new_activity'},
                {width:'',styleName:'',title:'DOU',type:'text',fieldName:'old_activity'},
                {width:'',styleName:'',title:'在线(最高/平均)',type:'text',fieldName:'online'},
                {width:'',styleName:'',title:'在线时间(平均)',type:'text',fieldName:'online_second'},
                {width:'',styleName:'',title:'次日留存',type:'text',fieldName:'next_lose'},
                {width:'',styleName:'',title:'7日留存',type:'text',fieldName:'seven_lose'},
                {width:'',styleName:'',title:'30日留存',type:'text',fieldName:'thirty_lose'},
                {width:'',styleName:'',title:'充值金额（累积/当前）',type:'text',fieldName:'recharge_money'},
                {width:'',styleName:'',title:'充值人数',type:'text',fieldName:'recharge_player_count'},
                {width:'',styleName:'',title:'充值次数',type:'text',fieldName:'recharge_count'},
                {width:'',styleName:'',title:'ARPPU',type:'text',fieldName:'arppu'},
                {width:'',styleName:'',title:'付费比',type:'text',fieldName:'pay_rate'},
                {width:'',styleName:'',title:'消费(累计/当前)',type:'text',fieldName:'pay'}
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
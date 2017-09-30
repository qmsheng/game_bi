/**
 * Created by LiuXiao on 2017/2/21.
 */

import React, {Component} from 'react';

import InComeReportAction from "../actions/InComeReportAction";
import InComeReportStore from "../stores/InComeReportStore";

import BiForm from "../components/BiForm"
import DataTable from "../components/DataTable"

export default class InComeReport extends Component {
    constructor(props) {
        super(props);
        this.state = InComeReportStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        InComeReportStore.listen(this.onChange);
        InComeReportAction.query();
    }

    componentWillUnmount() {
        InComeReportStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleClickInComeReport() {
        let params = {
            server_id:this.state.form.server_id,
            start_time:this.state.form.start_time.format('YYYY-MM-DD'),
            end_time:this.state.form.end_time.format('YYYY-MM-DD')
        };
        InComeReportAction.queryInComeReport(params);
    }

    handleInput(name, val, event) {
        var newState=this.state.form;
        if (val != "") {
            newState[name]=val;
        } else {
            newState[name]=event.target.value;
        }
        InComeReportAction.setEditFormObj(newState);
    }

    handleSelectStartDate(date, text) {
        var newState=this.state.form;
        newState['start_time'] = date;
        InComeReportAction.setEditFormObj(newState);
        return true;
    }

    handleSelectEndDate(date, text) {
        var newState=this.state.form;
        newState['end_time'] = date;
        InComeReportAction.setEditFormObj(newState);
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
                {type:'submit', options:{text:'查询', handleClick:this.handleClickInComeReport.bind(this)}},
                {type:'erow'}
            ]
        };

        let table = {
            data:this.state.reports,
            fields:[
                {width:'',styleName:'',title:'平台名',type:'text',fieldName:'platform_name'},
                {width:'',styleName:'',title:'服务器',type:'text',fieldName:'server_name'},
                {width:'',styleName:'',title:'日期',type:'text',fieldName:'time'},
                {width:'',styleName:'',title:'充值金额',type:'text',fieldName:'charge'},
                {width:'',styleName:'',title:'充值人数',type:'text',fieldName:'charge_people'},
                {width:'',styleName:'',title:'充值次数',type:'text',fieldName:'charge_times'}
            ]
        };
        return (
            <div>
                <div className="ui segments">
                    <div className="ui segment">
                        <BiForm config={form} />
                    </div>
                </div>
                <DataTable title="实时营收" config={table} />
            </div>
        );
    }
}

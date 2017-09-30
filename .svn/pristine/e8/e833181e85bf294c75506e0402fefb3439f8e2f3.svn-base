/**
 * Created by Administrator on 2016/9/12.
 */
import React, {Component} from 'react';

import NewReportAction from "../actions/NewReportAction";
import NewReportStore from "../stores/NewReportStore";

import BiForm from "../components/BiForm"
import DataTable from "../components/DataTable"

export default class NewReport extends Component {
    constructor(props) {
        super(props);
        this.state = NewReportStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        NewReportStore.listen(this.onChange);
        NewReportAction.query();
    }

    componentWillUnmount() {
        NewReportStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleClickNewReport() {
        let params = {
            server_id:this.state.form.server_id,
            start_time:this.state.form.start_time.format('YYYY-MM-DD'),
            end_time:this.state.form.end_time.format('YYYY-MM-DD')
        };
        NewReportAction.queryNewReport(params);
    }

    handleInput(name, val, event) {
        var newState=this.state.form;
        if (val != "") {
            newState[name]=val;
        } else {
            newState[name]=event.target.value;
        }
        NewReportAction.setEditFormObj(newState);
    }

    handleSelectStartDate(date, text) {
        var newState=this.state.form;
        newState['start_time'] = date;
        NewReportAction.setEditFormObj(newState);
        return true;
    }

    handleSelectEndDate(date, text) {
        var newState=this.state.form;
        newState['end_time'] = date;
        NewReportAction.setEditFormObj(newState);
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
                {type:'submit', options:{text:'查询', handleClick:this.handleClickNewReport.bind(this)}},
                {type:'erow'}
            ]
        };

        let table = {
            data:this.state.reports,
            fields:[
                {width:'',styleName:'',title:'平台名',type:'text',fieldName:'platform_name'},
                {width:'',styleName:'',title:'服务器',type:'text',fieldName:'server_name'},
                {width:'',styleName:'',title:'日期',type:'text',fieldName:'time'},
                {width:'',styleName:'',title:'连接数',type:'text',fieldName:'connection'},
                {width:'',styleName:'',title:'新建角色数量',type:'text',fieldName:'create'},
            ]
        };
        return (
            <div>
                <div className="ui segments">
                    <div className="ui segment">
                        <BiForm config={form} />
                    </div>
                </div>
                <DataTable title="实时新增" config={table} />
            </div>
        );
    }
}
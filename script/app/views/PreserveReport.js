/**
 * Created by Administrator on 2016/9/12.
 */
import React, {Component} from 'react';

import PreserveReportAction from "../actions/PreserveReportAction";
import PreserveReportStore from "../stores/PreserveReportStore";

import BiForm from "../components/BiForm"
import DataTable from "../components/DataTable"

export default class PreserveReport extends Component {
    constructor(props) {
        super(props);
        this.state = PreserveReportStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        PreserveReportStore.listen(this.onChange);
        PreserveReportAction.query();
    }

    componentWillUnmount() {
        PreserveReportStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleClickPreserveReport() {
        let params = {
            server_id:this.state.form.server_id,
            start_time:this.state.form.start_time.format('YYYY-MM-DD'),
            end_time:this.state.form.end_time.format('YYYY-MM-DD')
        };
        PreserveReportAction.queryPreserveReport(params);
    }

    handleInput(name, val, event) {
        var newState=this.state.form;
        if (val != "") {
            newState[name]=val;
        } else {
            newState[name]=event.target.value;
        }
        PreserveReportAction.setEditFormObj(newState);
    }

    handleSelectStartDate(date, text) {
        var newState=this.state.form;
        newState['start_time'] = date;
        PreserveReportAction.setEditFormObj(newState);
        return true;
    }

    handleSelectEndDate(date, text) {
        var newState=this.state.form;
        newState['end_time'] = date;
        PreserveReportAction.setEditFormObj(newState);
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
                {type:'submit', options:{text:'查询', handleClick:this.handleClickPreserveReport.bind(this)}},
                {type:'erow'}
            ]
        };

        let table = {
            data:this.state.reports,
            fields:[
                {width:'',styleName:'',title:'平台名',type:'text',fieldName:'platform_name'},
                {width:'',styleName:'',title:'服务器',type:'text',fieldName:'server_name'},
                {width:'',styleName:'',title:'日期',type:'text',fieldName:'time'},
                {width:'',styleName:'',title:'用户数量',type:'text',fieldName:'create'},
                {width:'',styleName:'',title:'次日留存',type:'text',fieldName:'next_lose'},
                {width:'',styleName:'',title:'3日留存',type:'text',fieldName:'three_lose'},
                {width:'',styleName:'',title:'4日留存',type:'text',fieldName:'four_lose'},
                {width:'',styleName:'',title:'5日留存',type:'text',fieldName:'five_lose'},
                {width:'',styleName:'',title:'6日留存',type:'text',fieldName:'six_lose'},
                {width:'',styleName:'',title:'7日留存',type:'text',fieldName:'seven_lose'},
                {width:'',styleName:'',title:'8日留存',type:'text',fieldName:'eight_lose'},
                {width:'',styleName:'',title:'9日留存',type:'text',fieldName:'nine_lose'},
                {width:'',styleName:'',title:'10日留存',type:'text',fieldName:'ten_lose'},
                {width:'',styleName:'',title:'11日留存',type:'text',fieldName:'eleven_lose'},
                {width:'',styleName:'',title:'12日留存',type:'text',fieldName:'twelve_lose'},
                {width:'',styleName:'',title:'13日留存',type:'text',fieldName:'thirteen_lose'},
                {width:'',styleName:'',title:'14日留存',type:'text',fieldName:'fourteen_lose'},
                {width:'',styleName:'',title:'15日留存',type:'text',fieldName:'fifteen_lose'},
                {width:'',styleName:'',title:'30日留存',type:'text',fieldName:'thirty_lose'},
                {width:'',styleName:'',title:'60日留存',type:'text',fieldName:'sixty_lose'},
                {width:'',styleName:'',title:'90日留存',type:'text',fieldName:'ninety_lose'},
                {width:'',styleName:'',title:'180日留存',type:'text',fieldName:'half_year_lose'},
                {width:'',styleName:'',title:'365日留存',type:'text',fieldName:'year_lose'},
            ]
        };
        return (
            <div>
                <div className="ui segments">
                    <div className="ui segment">
                        <BiForm config={form} />
                    </div>
                </div>
                <DataTable title="留存报表" config={table} />
            </div>
        );
    }
}
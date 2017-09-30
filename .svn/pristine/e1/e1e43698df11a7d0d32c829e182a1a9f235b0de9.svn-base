/**
 * Created by Administrator on 2016/9/12.
 */
import React, {Component} from 'react';

import QueryDistributedAction from "../actions/QueryDistributedAction";
import QueryDistributedStore from "../stores/QueryDistributedStore";

import BiForm from "../components/BiForm"
import DataTable from "../components/DataTable"

export default class QueryDistributed extends Component {
    constructor(props) {
        super(props);
        this.state = QueryDistributedStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        QueryDistributedStore.listen(this.onChange);
        QueryDistributedAction.query();
    }

    componentWillUnmount() {
        QueryDistributedStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleClickQueryDistributed() {
        QueryDistributedAction.queryOnline(this.state.form);
    }

    handleInput(name, val, event) {
        var newState=this.state.form;
        if (val != "") {
            newState[name]=val;
        } else {
            newState[name]=event.target.value;
        }
        QueryDistributedAction.setEditFormObj(newState);
    }

    handleSelectStartDate(date, text) {
        var newState=this.state.form;
        newState['start_time'] = date;
        QueryDistributedAction.setEditFormObj(newState);
    }

    handleSelectEndDate(date, text) {
        var newState=this.state.form;
        newState['end_time'] = date;
        QueryDistributedAction.setEditFormObj(newState);
    }

    render() {
        let form = {
            data: this.state.form,
            input:this.handleInput.bind(this),
            fields: [
                {type:'row', styles:'inline fields'},
                {label: '平台', fieldName: 'platform_id', type: 'select', options:{key:'id',val:'platform_name', data:this.state.platforms}, styles:'required field'},
                {label: '区服', fieldName: 'server_id', type: 'select', options:{key:'server_id',val:'server_name', data:this.state.servers, ref:'platform_id'}, styles:'required field'},
                {label: '分布类型', fieldName: 'query_type', type: 'select', options:{key:'query_type',val:'query_type_name', data:[
                    {query_type:1,query_type_name:'等级分布'},
                    {query_type:2,query_type_name:'在线时间分布'},
                ]}, styles:'required field'},
                //{label: '', fieldName: 'start_time', type: 'datepicker', options:{change:this.handleSelectStartDate.bind(this)},styles:'field'},
                //{label: '', fieldName: 'end_time', type: 'datepicker', options:{change:this.handleSelectEndDate.bind(this)},styles:'field'},
                {type:'submit', options:{text:'查询分布', handleClick:this.handleClickQueryDistributed.bind(this)}},
                {type:'erow'}
            ]
        };



        let query_result = <div></div>;
        if (this.state.query_type == 1) {
            let table = {
                data:this.state.distributeds,
                fields:[
                    {width:'',styleName:'',title:'平台名',type:'text',fieldName:'platform_name'},
                    {width:'',styleName:'',title:'区服ID',type:'text',fieldName:'server_id'},
                    {width:'',styleName:'',title:'区服名称',type:'text',fieldName:'server_name'},
                    {width:'',styleName:'',title:'开服日期',type:'text',fieldName:'open_time'},
                    {width:'',styleName:'',title:'查询日期',type:'text',fieldName:'time'},
                    {width:'',styleName:'',title:'用户数量',type:'text',fieldName:'total_create'},
                    {width:'',styleName:'',title:'等级',type:'text',fieldName:'lev'},
                    {width:'',styleName:'',title:'个数',type:'text',fieldName:'cnt'},
                    {width:'',styleName:'',title:'百分比',type:'text',fieldName:'percent'},
                    {width:'',styleName:'',title:'升级之间时间间隔',type:'text',fieldName:'diff'},
                ]
            };
            query_result = (<DataTable title="实时在线人数明细" config={table} />);
        }

        return (
            <div>
                <div className="ui segments">
                    <div className="ui segment">
                        <BiForm config={form} />
                    </div>
                </div>
                {query_result}
            </div>
        );
    }
}
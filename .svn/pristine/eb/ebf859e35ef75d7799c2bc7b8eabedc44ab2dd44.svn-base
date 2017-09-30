/**
 * Created by LiuXiao on 2017/2/16.
 */

import React, {Component} from 'react';

import QueryConsumeAction from "../actions/QueryConsumeAction";
import QueryConsumeStore from "../stores/QueryConsumeStore";

import BiForm from "../components/BiForm"
import DataTable from "../components/DataTable"

export default class QueryConsume extends Component {
    constructor(props) {
        super(props);
        this.state = QueryConsumeStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        QueryConsumeStore.listen(this.onChange);
        QueryConsumeAction.query();
    }

    componentWillUnmount() {
        QueryConsumeStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleClickQueryConsume() {
        let params = {
            server_id:this.state.form.server_id,
            start_time:this.state.form.start_time.format('YYYY-MM-DD'),
            end_time:this.state.form.end_time.format('YYYY-MM-DD')
        };
        QueryConsumeAction.queryConsume(params);
    }

    handleInput(name, val, event) {
        var newState=this.state.form;
        if (val != "") {
            newState[name]=val;
        } else {
            newState[name]=event.target.value;
        }
        QueryConsumeAction.setEditObj(newState);
    }

    handleSelectStartDate(date, text) {
        var newState=this.state.form;
        newState['start_time'] = date;
        QueryConsumeAction.setEditObj(newState);
        return true;
    }

    handleSelectEndDate(date, text) {
        var newState=this.state.form;
        newState['end_time'] = date;
        QueryConsumeAction.setEditObj(newState);
        return true;
    }

    render() {
        let form = {
            data: this.state.form,
            input:this.handleInput.bind(this),
            fields: [
                {type:'row', styles:'inline fields'},
                {label: '平台4', fieldName: 'platform_id', type: 'select', options:{key:'id',val:'platform_name', data:this.state.platforms}, styles:'required field'},
                {label: '区服', fieldName: 'server_id', type: 'select', options:{key:'server_id',val:'server_name', data:this.state.servers, ref:'platform_id'}, styles:'required field'},
                {label: '', fieldName: 'start_time', type: 'datepicker', options:{change:this.handleSelectStartDate.bind(this)},styles:'field'},
                {label: '', fieldName: 'end_time', type: 'datepicker', options:{change:this.handleSelectEndDate.bind(this)},styles:'field'},
                {type:'submit', options:{text:'查询', handleClick:this.handleClickQueryConsume.bind(this)}},
                {type:'erow'}
            ]
        };

        let table = {
            data:this.state.points,
            fields:[
                {width:'',styleName:'',title:'平台',type:'text',fieldName:'platform_name'},
                {width:'',styleName:'',title:'服务器',type:'text',fieldName:'server_name'},
                {width:'',styleName:'',title:'消费点ID',type:'text',fieldName:'type'},
                {width:'',styleName:'',title:'消费点名称',type:'text',fieldName:'type_name'},
                {width:'',styleName:'',title:'消费钻石数',type:'text',fieldName:'cnt'},
                {width:'',styleName:'',title:'被购买次数',type:'text',fieldName:'times'},
                {width:'',styleName:'',title:'金额占比',type:'text',fieldName:'percent'},
            ]
        };


        return (
            <div>
                <div className="ui segments">
                    <div className="ui segment">
                        <BiForm config={form} />
                    </div>
                </div>
                <DataTable title="消费点信息" config={table} />
            </div>
        );
    }
}

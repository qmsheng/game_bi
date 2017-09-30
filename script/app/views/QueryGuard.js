/**
 * Created by Administrator on 2016/9/12.
 */
import React, {Component} from 'react';

import QueryGuardAction from "../actions/QueryGuardAction";
import QueryGuardStore from "../stores/QueryGuardStore";

import BiForm from "../components/BiForm"
import DataTable from "../components/DataTable"

export default class QueryGuard extends Component {
    constructor(props) {
        super(props);
        this.state = QueryGuardStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        QueryGuardStore.listen(this.onChange);
        QueryGuardAction.query();
    }

    componentWillUnmount() {
        QueryGuardStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleClickQueryGuard() {
        let params = {
            server_id:this.state.form.server_id,
            start_time:this.state.form.start_time.format('YYYY-MM-DD'),
            end_time:this.state.form.end_time.format('YYYY-MM-DD')
        };
        QueryGuardAction.queryGuard(params);
    }

    handleInput(name, val, event) {
        var newState=this.state.form;
        if (val != "") {
            newState[name]=val;
        } else {
            newState[name]=event.target.value;
        }
        QueryGuardAction.setEditObj(newState);
    }

    handleSelectStartDate(date, text) {
        var newState=this.state.form;
        newState['start_time'] = date;
        QueryGuardAction.setEditObj(newState);
        return true;
    }

    handleSelectEndDate(date, text) {
        var newState=this.state.form;
        newState['end_time'] = date;
        QueryGuardAction.setEditObj(newState);
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
                {type:'submit', options:{text:'查询', handleClick:this.handleClickQueryGuard.bind(this)}},
                {type:'erow'}
            ]
        };

        let table = {
            data:this.state.points,
            fields:[
                {width:'',styleName:'',title:'平台',type:'text',fieldName:'platform_name'},
                {width:'',styleName:'',title:'服务器',type:'text',fieldName:'server_name'},
                {width:'',styleName:'',title:'流失点ID',type:'text',fieldName:'type'},
                {width:'',styleName:'',title:'流失点名称',type:'text',fieldName:'type_name'},
                {width:'',styleName:'',title:'完成人数',type:'text',fieldName:'cnt'},
            ]
        };


        return (
            <div>
                <div className="ui segments">
                    <div className="ui segment">
                        <BiForm config={form} />
                    </div>
                </div>
                <DataTable title="流失点信息" config={table} />
            </div>
        );
    }
}
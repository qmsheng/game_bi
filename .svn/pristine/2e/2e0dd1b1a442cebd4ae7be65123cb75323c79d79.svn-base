/**
 * Created by QiuMaoSheng on 2017/08/31
 */

import React, {Component} from 'react';

import ServerActivityAction from "../actions/ServerActivityAction";
import ServerActivityStore from "../stores/ServerActivityStore";

import BiForm from "../components/BiForm"
import DataTable from "../components/DataTable"

export default class ServerActivity extends Component {
    constructor(props) {
        super(props);
        this.state = ServerActivityStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        ServerActivityStore.listen(this.onChange);
        ServerActivityAction.query();
    }

    componentWillUnmount() {
        ServerActivityStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleClickServerActivity() {
        let params = {
            server_id:this.state.form.server_id,
            activity_id:this.state.form.activity_id,
            start_time:this.state.form.start_time.format('YYYY-MM-DD 04:00:00'),
            end_time:this.state.form.end_time.format('YYYY-MM-DD 04:00:00'),
        };

        ServerActivityAction.ServerActivity(params);
    }

    handleInput(name, val, event) {
        var newState=this.state.form;
        if (val != "") {
            newState[name]=val;
        } else {
            newState[name]=event.target.value;
        }

        if ( isNaN(newState.activity_id) ) {
            newState.activity_id = '';
            alert('活动id,请输入数字!');
        }

        ServerActivityAction.setEditObj(newState);
    }

    handleSelectStartDate(date, text) {
        var newState=this.state.form;
        newState['start_time'] = date;
        ServerActivityAction.setEditObj(newState);
        return true;
    }

    handleSelectEndDate(date, text) {
        var newState=this.state.form;
        newState['end_time'] = date;
        ServerActivityAction.setEditObj(newState);
        return true;
    }

    handleQueryPage() {
        ServerActivityAction.query(params);
    }

    render() {
        let form = {
            data: this.state.form,
            input:this.handleInput.bind(this),
            fields: [
                {type:'row'},
                {label: '所属平台', fieldName: 'platform_id', type: 'select', options:{key:'id',val:'platform_name', data:this.state.platforms}, styles:'required field'},
                {label: '服务器名称', fieldName: 'server_id', type: 'select', options:{key:'server_id',val:'server_name', data:this.state.servers, ref:'platform_id'}, styles:'required field'},
                {label: '活动id', fieldName: 'activity_id', type: 'select', options:{key:'id',val:'status', data:this.state.act_sta}, styles:'required field'},
                {label: '活动开始时间', fieldName: 'start_time', type: 'datepicker', options:{change:this.handleSelectStartDate.bind(this)},styles:'required field'},
                {label: '活动结束时间', fieldName: 'end_time', type: 'datepicker', options:{change:this.handleSelectEndDate.bind(this)},styles:'required field'},
                {type:'erow'},

                {type:'row'},
                {type:'submit', options:{text:'更新', handleClick:this.handleClickServerActivity.bind(this)}},
                {type:'erow'},
            ]
        };

        let table = {
            data:this.state.query ? this.state.query : {},
            query:this.handleQueryPage.bind(this),
            fields:[
                {width:'',styleName:'',title:'平台',type:'text',fieldName:'platform'},
                {width:'',styleName:'',title:'服务器id',type:'text',fieldName:'server_id'},
                {width:'',styleName:'',title:'活动id',type:'text',fieldName:'activity_id'},
                {width:'',styleName:'',title:'活动名称',type:'text',fieldName:'activity_name'},
                {width:'',styleName:'',title:'活动开始时间',type:'text',fieldName:'start_time'},
                {width:'',styleName:'',title:'活动结束时间',type:'text',fieldName:'end_time'},
            ]
        };

        return (
            <div>
                <div className="ui segments">
                    <div className="ui segment">
                        <BiForm config={form} />
                    </div>
                </div>
                <DataTable title="活动任务列表" config={table} />
            </div>
        );
    }
}

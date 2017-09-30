/**
 * Created by Administrator on 2016/9/12.
 */
import React, {Component} from 'react';

import QueryOnlineAction from "../actions/QueryOnlineAction";
import QueryOnlineStore from "../stores/QueryOnlineStore";

import BiForm from "../components/BiForm"
import DataTable from "../components/DataTable"

import ReactD3, {LineChart} from 'react-d3-components'

export default class QueryOnline extends Component {
    constructor(props) {
        super(props);
        this.state = QueryOnlineStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        QueryOnlineStore.listen(this.onChange);
        QueryOnlineAction.query();
    }

    componentWillUnmount() {
        QueryOnlineStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleClickQueryOnline() {
        let params = {
            server_id:this.state.form.server_id,
            start_time:this.state.form.start_time.format('YYYY-MM-DD'),
            end_time:this.state.form.end_time.format('YYYY-MM-DD')
        };
        QueryOnlineAction.queryOnline(params);
//        QueryOnlineAction.queryOnline(this.state.form);
    }

    handleInput(name, val, event) {
        var newState=this.state.form;
        if (val != "") {
            newState[name]=val;
        } else {
            newState[name]=event.target.value;
        }
        this.setState({form:newState});
    }

    handleSelectStartDate(date, text) {
        var newState=this.state.form;
        newState['start_time'] = date;
        QueryOnlineAction.setEditFormObj(newState);
        return true;
    }

    handleSelectEndDate(date, text) {
        var newState=this.state.form;
        newState['end_time'] = date;
        QueryOnlineAction.setEditFormObj(newState);
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
                {label: '', fieldName: 'start_time', type: 'datepicker', options:{change:this.handleSelectStartDate.bind(this)},styles:'required field'},
                {label: '', fieldName: 'end_time', type: 'datepicker', options:{change:this.handleSelectEndDate.bind(this)},styles:'required field'},
                {type:'submit', options:{text:'查询在线人数', handleClick:this.handleClickQueryOnline.bind(this)}},
                {type:'erow'}
            ]
        };

        let table = {
            data:this.state.onlines,
            fields:[
                {width:'',styleName:'',title:'平台名',type:'text',fieldName:'platform_name'},
                {width:'',styleName:'',title:'区服ID',type:'text',fieldName:'server_id'},
                {width:'',styleName:'',title:'区服名称',type:'text',fieldName:'server_name'},
                {width:'',styleName:'',title:'时间',type:'text',fieldName:'time'},
                {width:'',styleName:'',title:'在线人数',type:'text',fieldName:'online_num'},
            ]
        };




        let chart = <div></div>;
        if (this.state.onlines.length > 0) {
            let value_array = [];
            for(let i = 0; i < this.state.onlines.length; i++) {

                let dt = this.state.onlines[i].time;
                dt = dt.replace(/-/g,"/");
                dt = new Date(dt);
                value_array.push({x:dt, y:this.state.onlines[i].online_num});
            }
            let data = {
                label: '', values: value_array
            };

            chart = (
            <div className="ui segments">
                <div className="ui secondary segment">
                    实时在线人数
                </div>
                <div className="ui segment">
                    <LineChart
                        data={data}
                        width={800}
                        height={400}
                        margin={{top: 10, bottom: 50, left: 50, right: 20}} />
                </div>
            </div>);
        }

        return (
            <div>
                <div className="ui segments">
                    <div className="ui segment">
                        <BiForm config={form} />
                    </div>
                </div>
                {chart}
                <DataTable title="实时在线人数明细" config={table} />
            </div>
        );
    }
}
/**
 * Created by qiumaosheng on 2017/08/29.
 */

import React, {Component} from 'react';

import NewFrameFrequencyAction from "../actions/NewFrameFrequencyAction";
import NewFrameFrequencyStore from "../stores/NewFrameFrequencyStore";

import BiForm from "../components/BiForm"
import DataTable from "../components/DataTable"

export default class NewFrameFrequency extends Component {
    constructor(props) {
        super(props);
        this.state = NewFrameFrequencyStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        NewFrameFrequencyStore.listen(this.onChange);
        NewFrameFrequencyAction.query();
    }

    componentWillUnmount() {
        NewFrameFrequencyStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleClickNewFrameFrequency() {
        let params = {
            server_id:this.state.form.server_id,
            start_time:this.state.form.start_time.format('YYYY-MM-DD'),
            end_time:this.state.form.end_time.format('YYYY-MM-DD'),
        };
        NewFrameFrequencyAction.queryNewFrameFrequency(params);
    }

    handleInput(name, val, event) {
        var newState=this.state.form;
        if (val != "") {
            newState[name]=val;
        } else {
            newState[name]=event.target.value;
        }
        NewFrameFrequencyAction.setEditFormObj(newState);
    }

    handleSelectStartDate(date, text) {
        var newState=this.state.form;
        newState['start_time'] = date;
        NewFrameFrequencyAction.setEditFormObj(newState);
        return true;
    }

    handleSelectEndDate(date, text) {
        var newState=this.state.form;
        newState['end_time'] = date;
        NewFrameFrequencyAction.setEditFormObj(newState);
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
                {label: '开始时间', fieldName: 'start_time', type: 'datepicker', options:{change:this.handleSelectStartDate.bind(this)},styles:'field'},
                {label: '结束时间', fieldName: 'end_time', type: 'datepicker', options:{change:this.handleSelectEndDate.bind(this)},styles:'field'},
                {type:'submit', options:{text:'查询', handleClick:this.handleClickNewFrameFrequency.bind(this)}},
                {type:'erow'}
            ]
        };

        let table = {
            data:this.state.player_info,
            fields:[
                {width:'',styleName:'',title:'帧数',type:'text',fieldName:'frame_frequency_level'},
                {width:'',styleName:'',title:'人次',type:'text',fieldName:'frame_frequency'},
                {width:'',styleName:'',title:'人次对应比例',type:'text',fieldName:'frame_frequency_rate'},
                {width:'',styleName:'',title:'人数（按个人总平均帧数）',type:'text',fieldName:'frame_frequency_count_average'},
                {width:'',styleName:'',title:'人数对应比例',type:'text',fieldName:'frame_frequency_count_average_rate'},
            ]
        };
        return (
            <div>
                <div className="ui segments">
                    <div className="ui segment">
                        <BiForm config={form} />
                    </div>
                </div>
                <DataTable title="新玩家帧数统计列表" config={table} />
            </div>
        );
    }
}

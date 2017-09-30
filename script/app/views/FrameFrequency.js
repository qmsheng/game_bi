/**
 * Created by Administrator on 2016/9/12.
 */
import React, {Component} from 'react';

import FrameFrequencyAction from "../actions/FrameFrequencyAction";
import FrameFrequencyStore from "../stores/FrameFrequencyStore";

import BiForm from "../components/BiForm"
import DataTable from "../components/DataTable"

export default class FrameFrequency extends Component {
    constructor(props) {
        super(props);
        this.state = FrameFrequencyStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        FrameFrequencyStore.listen(this.onChange);
        FrameFrequencyAction.query();
    }

    componentWillUnmount() {
        FrameFrequencyStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleClickFrameFrequency() {
        let params = {
            serverid:this.state.form.serverid,
            start_time:this.state.form.start_time.format('YYYY-MM-DD'),
            end_time:this.state.form.end_time.format('YYYY-MM-DD'),
            page:this.state.form.page,
        };
        FrameFrequencyAction.FrameFrequency(params);
    }

    handleInput(name, val, event) {
        var newState=this.state.form;
        if (val != "") {
            newState[name]=val;
        } else {
            newState[name]=event.target.value;
        }
        FrameFrequencyAction.setEditObj(newState);
    }

    handleSelectStartDate(date, text) {
        var newState=this.state.form;
        newState['start_time'] = date;
        FrameFrequencyAction.setEditObj(newState);
        return true;
    }

    handleSelectEndDate(date, text) {
        var newState=this.state.form;
        newState['end_time'] = date;
        FrameFrequencyAction.setEditObj(newState);
        return true;
    }

    render() {
        let form = {
            data: this.state.form,
            input:this.handleInput.bind(this),
            fields: [
                {type:'row', styles:'inline fields'},
                {label: '平台', fieldName: 'platform_id', type: 'select', options:{key:'id',val:'platform_name', data:this.state.platforms}, styles:'required field'},
                {label: '区服', fieldName: 'serverid', type: 'select', options:{key:'server_id',val:'server_name', data:this.state.servers, ref:'platform_id'}, styles:'required field'},
                {label: '开始时间', fieldName: 'start_time', type: 'datepicker', options:{change:this.handleSelectStartDate.bind(this)},styles:'required field'},
                {label: '结束时间', fieldName: 'end_time', type: 'datepicker', options:{change:this.handleSelectEndDate.bind(this)},styles:'required field'},
                {label: '翻页（默认每页20条）', fieldName: 'page', type: 'text', styles:'field'},
                {type:'submit', options:{text:'查询', handleClick:this.handleClickFrameFrequency.bind(this)}},
                {type:'erow'}
            ]
        };

        let table = {
            data:this.state.player_info,
            fields:[
                {width:'',styleName:'',title:'平台',type:'text',fieldName:'platform'},
                {width:'',styleName:'',title:'服务器',type:'text',fieldName:'serverid'},
                {width:'',styleName:'',title:'用户uid',type:'text',fieldName:'uid'},
                {width:'',styleName:'',title:'用户浏览器',type:'text',fieldName:'strData1'},
                {width:'',styleName:'',title:'用户帧频数',type:'text',fieldName:'numberData1'},
                {width:'',styleName:'',title:'抓取帧频记录时间',type:'text',fieldName:'LogTime'},
                {width:'',styleName:'',title:'用户首次登入时间',type:'text',fieldName:'first_login_time'},
                {width:'',styleName:'',title:'用户首次登出时间',type:'text',fieldName:'first_loginont_time'},
                {width:'',styleName:'',title:'用户最后登入时间',type:'text',fieldName:'last_login_time'},
                {width:'',styleName:'',title:'用户最后登出时间',type:'text',fieldName:'last_loginont_time'},
            ]
        };


        return (
            <div>
                <div className="ui segments">
                    <div className="ui segment">
                        <BiForm config={form} />
                    </div>
                </div>
                <DataTable title="玩家帧数列表" config={table} />
            </div>
        );
    }
}
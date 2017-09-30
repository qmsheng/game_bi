/**
 * Created by QiuMaoSheng on 2017/06/21
 */
import React, {Component} from 'react';

import BindDiamondAction from "../actions/BindDiamondAction";
import BindDiamondStore from "../stores/BindDiamondStore";

import BiForm from "../components/BiForm"
import DataTable from "../components/DataTable"

export default class BindDiamond extends Component {
    constructor(props) {
        super(props);
        this.state = BindDiamondStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        BindDiamondStore.listen(this.onChange);
        BindDiamondAction.query();
    }

    componentWillUnmount() {
        BindDiamondStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleClickBindDiamond() {
        let params = {
            platform_name:this.state.form.platform_name,
            server_id:this.state.form.server_id,
            start_time:this.state.form.start_time.format('YYYY-MM-DD'),
            end_time:this.state.form.end_time.format('YYYY-MM-DD'),
            role_name:this.state.form.role_name,
        };
        BindDiamondAction.queryBindDiamond(params);
    }

    handleInput(name, val, event) {
        var newState=this.state.form;
        if (val != "") {
            newState[name]=val;
        } else {
            newState[name]=event.target.value;
        }
        BindDiamondAction.setEditFormObj(newState);
    }

    handleSelectStartDate(date, text) {
        var newState=this.state.form;
        newState['start_time'] = date;
        BindDiamondAction.setEditFormObj(newState);
        return true;
    }

    handleSelectEndDate(date, text) {
        var newState=this.state.form;
        newState['end_time'] = date;
        BindDiamondAction.setEditFormObj(newState);
        return true;
    }

    render() {
        let form = {
            data: this.state.form,
            input:this.handleInput.bind(this),
            fields: [
                {type:'row', styles:'inline fields'},
                {label: '平台', fieldName: 'platform_name', type: 'select', options:{key:'platform_name',val:'platform_name', data:this.state.platforms}, styles:'required field'},
                {label: '区服', fieldName: 'server_id', type: 'select', options:{key:'server_id',val:'server_name', data:this.state.servers, ref:'platform_name'}, styles:'required field'},
                {label: '开始时间', fieldName: 'start_time', type: 'datepicker', options:{change:this.handleSelectStartDate.bind(this)},styles:'required field'},
                {label: '结束时间', fieldName: 'end_time', type: 'datepicker', options:{change:this.handleSelectEndDate.bind(this)},styles:'required field'},
                {type:'submit', options:{text:'查询', handleClick:this.handleClickBindDiamond.bind(this)}},
                {type:'erow'}
            ]
        };

        let table = {
            data:this.state.arr_bind_diamond,
            fields:[
                {width:'',styleName:'',title:'平台名',type:'text',fieldName:'platform'},
                {width:'',styleName:'',title:'服务器',type:'text',fieldName:'server_id'},
                {width:'',styleName:'',title:'产出点',type:'text',fieldName:'total_numberData2'},
                {width:'',styleName:'',title:'产出次数',type:'text',fieldName:'index'},
                {width:'',styleName:'',title:'产出数量',type:'text',fieldName:'count_numberData2'},
            ]
        };
        return (
            <div>
                <div className="ui segments">
                    <div className="ui segment">
                        <BiForm config={form} />
                    </div>
                </div>
                <DataTable title="绑钻产出列表" config={table} />
            </div>
        );
    }
}
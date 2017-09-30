/**
 * Created by QiuMaoSheng on 2017/05/27
 */

import React, {Component} from 'react';

import AddTestAction from "../actions/AddTestAction";
import AddTestStore from "../stores/AddTestStore";

import BiForm from "../components/BiForm"
import DataTable from "../components/DataTable"

export default class AddTest extends Component {
    constructor(props) {
        super(props);
        this.state = AddTestStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        AddTestStore.listen(this.onChange);
        AddTestAction.query();
    }

    componentWillUnmount() {
        AddTestStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleClickAddTest() {
        let params = {
            gs_id:this.state.form.gs_id,
            activity_id:this.state.form.activity_id,
            start_time:this.state.form.start_time.format('YYYY-MM-DD 04:00:00'),
            end_time:this.state.form.end_time.format('YYYY-MM-DD 04:00:00'),
            reward_start_time:this.state.form.reward_start_time.format('YYYY-MM-DD 04:00:00'),
            reward_end_time:this.state.form.reward_end_time.format('YYYY-MM-DD 04:00:00'),
            info:this.state.form.info,
            data_group_id:this.state.form.data_group_id,
        };

        AddTestAction.AddTest(params);
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

        if ( isNaN(newState.data_group_id) ) {
            newState.data_group_id = '';
            alert('活动组id,请输入数字!');
        }

        AddTestAction.setEditObj(newState);
    }

    handleSelectStartDate(date, text) {
        var newState=this.state.form;
        newState['start_time'] = date;
        AddTestAction.setEditObj(newState);
        return true;
    }


    handleSelectStartDate2(date, text) {
        var newState=this.state.form;
        newState['reward_start_time'] = date;
        AddTestAction.setEditObj(newState);
        return true;
    }

    handleSelectStartDate3(date, text) {
        var newState=this.state.form;
        newState['reward_end_time'] = date;
        AddTestAction.setEditObj(newState);
        return true;
    }

    handleSelectEndDate(date, text) {
        var newState=this.state.form;
        newState['end_time'] = date;
        AddTestAction.setEditObj(newState);
        return true;
    }

    handleQueryPage() {
        let params = {
            type_id:this.state.form.type_id,
            platform_names:this.state.form.platform_names,
            activity_ids:this.state.form.activity_ids,
        };

        AddTestAction.query(params);
    }

    handleDelPage() {
        let params = {
            inst_ids:this.state.form.inst_ids,
        };

        AddTestAction.DelTest(params);
    }

    render() {
        let form = {
            data: this.state.form,
            input:this.handleInput.bind(this),
            fields: [
                {type:'row'},
                {label: '所属平台', fieldName: 'platform_id', type: 'select', options:{key:'id',val:'platform_name', data:this.state.platforms}, styles:'required field'},
                {label: '服务器名称', fieldName: 'gs_id', type: 'select', options:{key:'server_id',val:'server_name', data:this.state.servers, ref:'platform_id'}, styles:'required field'},
                {label: '活动id', fieldName: 'activity_id', type: 'text', styles:'required field'},
                {label: '活动开始时间', fieldName: 'start_time', type: 'datepicker', options:{change:this.handleSelectStartDate.bind(this)},styles:'required field'},
                {label: '活动结束时间', fieldName: 'end_time', type: 'datepicker', options:{change:this.handleSelectEndDate.bind(this)},styles:'required field'},
                {type:'erow'},

                {type:'row'},
                {label: '奖励开始时间', fieldName: 'reward_start_time', type: 'datepicker', options:{change:this.handleSelectStartDate2.bind(this)},styles:'required field'},
                {label: '奖励结束时间', fieldName: 'reward_end_time', type: 'datepicker', options:{change:this.handleSelectStartDate3.bind(this)},styles:'required field'},
                {label: '奖励数据', fieldName: 'info', type: 'text', styles:'required field'},
                {label: '活动组id', fieldName: 'data_group_id', type: 'text', styles:'required field'},
                {type:'erow'},

                {type:'row'},
                {type:'submit', options:{text:'保存', handleClick:this.handleClickAddTest.bind(this)}},
                {type:'erow'},
            ]
        };

        let form2 = {
            data: this.state.form,
            input:this.handleInput.bind(this),
            fields: [
                {type:'row'},
                {label: '活动状态', fieldName: 'type_id', type: 'select', options:{key:'id',val:'status', data:this.state.act_sta}, styles:'required field'},
                {label: '平台名称', fieldName: 'platform_names', type: 'select', options:{key:'platform_name',val:'platform_name', data:this.state.platforms}, styles:'required field'},
                {label: '活动ID', fieldName: 'activity_ids', type: 'text', styles:'required field'},
                {type:'erow'},

                {type:'row'},
                {type:'submit', options:{text:'查询', handleClick:this.handleQueryPage.bind(this)}},
                {type:'erow'},
            ]
        };

        let form3 = {
            data: this.state.form,
            input:this.handleInput.bind(this),
            fields: [
                {type:'row'},
                {label: '当前活动实例ID', fieldName: 'inst_ids', type: 'text', styles:'required field'},
                {type:'erow'},

                {type:'row'},
                {type:'submit', options:{text:'删除', handleClick:this.handleDelPage.bind(this)}},
                {type:'erow'},
            ]
        };

        let table = {
            data:this.state.query ? this.state.query : {},
            query:this.handleQueryPage.bind(this),
            fields:[
                {width:'',styleName:'',title:'当前活动实例id',type:'text',fieldName:'inst_id'},
                {width:'',styleName:'',title:'服务器id',type:'text',fieldName:'gs_id'},
                {width:'',styleName:'',title:'活动id',type:'text',fieldName:'activity_id'},
                {width:'',styleName:'',title:'活动开始时间',type:'text',fieldName:'start_time'},
                {width:'',styleName:'',title:'活动结束时间',type:'text',fieldName:'end_time'},
                {width:'',styleName:'',title:'奖励开始时间',type:'text',fieldName:'reward_start_time'},
                {width:'',styleName:'',title:'奖励结束时间',type:'text',fieldName:'reward_end_time'},
                {width:'',styleName:'',title:'奖励数据',type:'text',fieldName:'info'},
                {width:'',styleName:'',title:'活动组id',type:'text',fieldName:'data_group_id'},
                {width:'',styleName:'',title:'服务器名称',type:'text',fieldName:'server_name'},
                {width:'',styleName:'',title:'平台名称',type:'text',fieldName:'platform_name'},
                {width:'',styleName:'',title:'活动状态',type:'text',fieldName:'activity_status'},
            ]
        };

        return (
            <div>
                <div className="ui segments">
                    <div className="ui segment">
                        <h1>1)新增活动</h1>
                        <BiForm config={form} />

                        <h1>2)查询活动</h1>
                        <BiForm config={form2} />

                        <h1>3)删除活动</h1>
                        <BiForm config={form3} />
                    </div>
                </div>
                <DataTable title="活动任务列表" config={table} />
            </div>
        );
    }
}

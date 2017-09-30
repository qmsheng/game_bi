/**
 * Created by LiuXiao on 2017/2/28.
 */

import React, {Component} from 'react';

import CdKeyQueryAction from "../actions/CdKeyQueryAction";
import CdKeyQueryStore from "../stores/CdKeyQueryStore";

import BiForm from "../components/BiForm"
import DataTable from "../components/DataTable"

export default class CdKeyQuery extends Component {
    constructor(props) {
        super(props);
        this.state = CdKeyQueryStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        CdKeyQueryStore.listen(this.onChange);
        CdKeyQueryAction.query();
    }

    componentWillUnmount() {
        CdKeyQueryStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleClickQueryCdKey() {
        CdKeyQueryAction.queryCdKey(this.state.form);
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

    handleQueryPage(page) {

    }

    render() {
        let form = {
            data: this.state.form,
            input:this.handleInput.bind(this),
            fields: [
                {type:'row', styles:'inline fields'},
                {label: 'CdKey',   fieldName: 'cdkey', type: 'text', styles:'field'},
                {label: '生成批次', fieldName: 'batch', type: 'text', styles:'field'},
                {label: '玩家名',   fieldName: 'user', type: 'text', styles:'field'},
                {type:'submit', options:{text:'查询', handleClick:this.handleClickQueryCdKey.bind(this)}},
                {type:'erow'}
            ]
        };

        let table = {
            data:this.state.role_infos,
            fields:[
                {width:'',styleName:'',title:'cdKey',type:'text',fieldName:'cdKey'},
                {width:'',styleName:'',title:'状态',type:'text',fieldName:'state'},
                {width:'',styleName:'',title:'使用时间',type:'text',fieldName:'use_time'},
                {width:'',styleName:'',title:'平台',type:'text',fieldName:'platform'},
                {width:'',styleName:'',title:'礼包Id',type:'text',fieldName:'chestId'},
                {width:'',styleName:'',title:'描述',type:'text',fieldName:'name'},
                {width:'',styleName:'',title:'批次',type:'text',fieldName:'batch'},
                {width:'',styleName:'',title:'生效时间',type:'text',fieldName:'start_time'},
                {width:'',styleName:'',title:'截止时间',type:'text',fieldName:'end_time'},
                {width:'',styleName:'',title:'玩家',type:'text',fieldName:'user'},
            ]
        };
        return (
            <div>
                <div className="ui segments">
                    <div className="ui segment">
                        <BiForm config={form} />
                    </div>
                </div>
                <DataTable title="礼品码查询" config={table} />
            </div>
        );
    }
}
/**
 * Created by LiuXiao on 2017/2/22.
 */

import React, {Component} from 'react';

import DiamondSpreadAction from "../actions/DiamondSpreadAction";
import DiamondSpreadStore from "../stores/DiamondSpreadStore";

import BiForm from "../components/BiForm"
import DataTable from "../components/DataTable"

export default class DiamondSpread extends Component {
    constructor(props) {
        super(props);
        this.state = DiamondSpreadStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        DiamondSpreadStore.listen(this.onChange);
        DiamondSpreadAction.query();
    }

    componentWillUnmount() {
        DiamondSpreadStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleClickDiamondSpread() {
        let params = {
            server_id:this.state.form.server_id,
        };
        DiamondSpreadAction.queryDiamondSpread(params);
    }

    handleInput(name, val, event) {
        var newState=this.state.form;
        if (val != "") {
            newState[name]=val;
        } else {
            newState[name]=event.target.value;
        }
        DiamondSpreadAction.setEditFormObj(newState);
    }

    render() {
        let form = {
            data: this.state.form,
            input:this.handleInput.bind(this),
            fields: [
                {type:'row', styles:'inline fields'},
                {label: '平台', fieldName: 'platform_id', type: 'select', options:{key:'id',val:'platform_name', data:this.state.platforms}, styles:'required field'},
                {label: '区服', fieldName: 'server_id', type: 'select', options:{key:'server_id',val:'server_name', data:this.state.servers, ref:'platform_id'}, styles:'required field'},
                {type:'submit', options:{text:'查询', handleClick:this.handleClickDiamondSpread.bind(this)}},
                {type:'erow'}
            ]
        };

        let table = {
            data:this.state.reports,
            fields:[
                {width:'',styleName:'',title:'平台名',type:'text',fieldName:'platform_name'},
                {width:'',styleName:'',title:'服务器',type:'text',fieldName:'server_name'},
 //               {width:'',styleName:'',title:'开服日期',type:'text',fieldName:'open_date'},
                {width:'',styleName:'',title:'日期',type:'text',fieldName:'date'},
                {width:'',styleName:'',title:'用户数量',type:'text',fieldName:'user_count'},
                {width:'',styleName:'',title:'今日活跃用户',type:'text',fieldName:'active'},
                {width:'',styleName:'',title:'钻石数(全部/当前)',type:'text',fieldName:'diamond'},
                {width:'',styleName:'',title:'金币数(全部/当前)',type:'text',fieldName:'gold'}
            ]
        };
        return (
            <div>
                <div className="ui segments">
                    <div className="ui segment">
                        <BiForm config={form} />
                    </div>
                </div>
                <DataTable title="钻石分布" config={table} />
            </div>
        );
    }
}
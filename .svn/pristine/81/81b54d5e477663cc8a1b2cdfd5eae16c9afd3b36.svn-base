/**
 * Created by Administrator on 2016/9/12.
 */
import React, {Component} from 'react';

import QueryPlayerAction from "../actions/QueryPlayerAction";
import QueryPlayerStore from "../stores/QueryPlayerStore";

import BiForm from "../components/BiForm"
import DataTable from "../components/DataTable"

export default class QueryPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = QueryPlayerStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        QueryPlayerStore.listen(this.onChange);
        QueryPlayerAction.query();
    }

    componentWillUnmount() {
        QueryPlayerStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleClickQueryPlayer() {
        QueryPlayerAction.queryPlayer(this.state.form);
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
                {label: '平台', fieldName: 'platform_id', type: 'select', options:{key:'id',val:'platform_name', data:this.state.platforms}, styles:'required field'},
                {label: '区服', fieldName: 'server_id', type: 'select', options:{key:'server_id',val:'server_name', ref:'platform_id', data:this.state.servers}, styles:'required field'},
                {label: '角色名', fieldName: 'role_name', type: 'text', styles:'field'},
                {label: '角色ID', fieldName: 'role_id', type: 'text', styles:'field'},
                {label: 'uid', fieldName: 'uid', type: 'text', styles:'field'},
                {label: '翻页（默认每页20条）', fieldName: 'page', type: 'text', styles:'field'},
                {type:'submit', options:{text:'查询玩家信息', handleClick:this.handleClickQueryPlayer.bind(this)}},
                {type:'erow'}
            ]
        };

        let table = {
            data:this.state.role_infos,
            fields:[
                {width:'',styleName:'',title:'角色ID',type:'text',fieldName:'role_id'},
                {width:'',styleName:'',title:'uid',type:'text',fieldName:'uid'},
                {width:'',styleName:'',title:'角色名',type:'text',fieldName:'name'},
                {width:'',styleName:'',title:'创建时间',type:'text',fieldName:'create_time'},
                {width:'',styleName:'',title:'等级',type:'text',fieldName:'level'},
                {width:'',styleName:'',title:'经验',type:'text',fieldName:'exper'},
                {width:'',styleName:'',title:'VIP等级',type:'text',fieldName:'vip_level'},
                {width:'',styleName:'',title:'金币数',type:'text',fieldName:'gold'},
                {width:'',styleName:'',title:'钻石数',type:'text',fieldName:'diamond'},
                {width:'',styleName:'',title:'战力',type:'text',fieldName:'fighting_force'},
                {width:'',styleName:'',title:'魂能数',type:'text',fieldName:'soul'},
                {width:'',styleName:'',title:'最后上线时间',type:'text',fieldName:'last_login_time'},
                {width:'',styleName:'',title:'最后下线时间',type:'text',fieldName:'last_logout_time'},
            ]
        };
        return (
            <div>
                <div className="ui segments">
                    <div className="ui segment">
                        <BiForm config={form} />
                    </div>
                </div>
                <DataTable title="玩家信息" config={table} />
            </div>
        );
    }
}
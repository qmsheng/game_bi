/**
 * Created by Administrator on 2016/9/12.
 */
import React, {Component} from 'react';

import SendNoticeAction from "../actions/SendNoticeAction";
import SendNoticeStore from "../stores/SendNoticeStore";

import BiForm from "../components/BiForm"
import DataTable from "../components/DataTable"

export default class SendNotice extends Component {
    constructor(props) {
        super(props);
        this.state = SendNoticeStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        SendNoticeStore.listen(this.onChange);
        SendNoticeAction.query();
        SendNoticeAction.queryNotice();
    }

    componentWillUnmount() {
        SendNoticeStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleCheck(id,event) {
        let newState=this.state.form;
        if (event.target.checked) {
            newState.server_ids.push(id);
        } else {
            newState.server_ids.splice($.inArray(id, newState.server_ids), 1);
        }
        SendNoticeAction.setEditObj(newState);
    }

    handleClickSendNotice() {
        SendNoticeAction.sendNotice(this.state.form);
        SendNoticeAction.sending(true);
    }

    handleClickDelNotice() {
        SendNoticeAction.delNotice(this.state.form);
        SendNoticeAction.sending(true);
    }

    handleClickAdd() {
        SendNoticeAction.setEditObj({server_id:'',platform_id:'',server_target:'', content:'',interval:'',start_time:'', end_time:'', error:0, server_ids:[], showWin:false});
        SendNoticeAction.showWin(true);
    }

    handleInput(name, val, event) {
        let newState=this.state.form;
        if (val != "") {
            newState[name]=val;
        } else {
            newState[name]=event.target.value;
        }
        SendNoticeAction.setEditObj(newState);
        return true;
    }

    render() {

        let form = {
            data: this.state.form,
            input:this.handleInput.bind(this),
            fields: [
                {type:'row', styles:'fields'},
                {label: '平台', fieldName: 'platform_id', type: 'select', options:{key:'id',val:'platform_name', data:this.state.platforms}, styles:'required field'},
                {label: '区服', fieldName: 'server_id', type: 'select', options:{key:'server_id',val:'server_name', data:this.state.servers, ref:'platform_id'}, styles:'required field'},
                {type:'erow'},

                {type:'row'},
                {label: '开始时间YYYY-MM-DD-HH-MM', fieldName: 'start_time', type: 'text'},
                {label: '结束时间YYYY-MM-DD-HH-MM', fieldName: 'end_time', type: 'text'},
                {type:'erow'},

                {type:'row'},
                {label: '内容', fieldName: 'content', type: 'text', options:{row:1}, styles:'eight wide required field'},
                {type:'erow'},

                {type:'row'},
                {type:'submit', btstyles:(this.state.sending ? 'ui disabled button' : 'ui button'),options:{text:'发送公告', handleClick:this.handleClickSendNotice.bind(this)}},
                {type:'erow'},
            ]
        };

        let form2 = {
            data: this.state.form,
            input:this.handleInput.bind(this),
            fields: [
                {type:'row'},
                {label: '平台', fieldName: 'platform_id', type: 'select', options:{key:'id',val:'platform_name', data:this.state.platforms}, styles:'required field'},
                {label: '区服', fieldName: 'server_id', type: 'select', options:{key:'server_id',val:'server_name', data:this.state.servers, ref:'platform_id'}, styles:'required field'},
                {label: '公告编号', fieldName: 'id', type: 'text'},
                {type:'erow'},

                {type:'row'},
                {type:'submit', options:{text:'删除', handleClick:this.handleClickDelNotice.bind(this)}},
                {type:'erow'},
            ]
        };

        let table = {
            data:this.state.notices,
            fields:[
                {width:'',styleName:'',title:'公告编号',type:'text',fieldName:'id'},
                {width:'',styleName:'',title:'平台名称',type:'text',fieldName:'platform_name'},
                {width:'',styleName:'',title:'服务器',type:'text',fieldName:'server_id'},
                {width:'',styleName:'',title:'全局发放',type:'text',fieldName:'interval'},
                {width:'',styleName:'',title:'标题',type:'text',fieldName:'content'},
                {width:'',styleName:'',title:'发送时间',type:'text',fieldName:'start_time'},
                {width:'',styleName:'',title:'结束时间',type:'text',fieldName:'end_time'},
                {width:'',styleName:'',title:'状态',type:'text',fieldName:'status'},
            ]
        };

        let edit = <div></div>;
        if (this.state.showWin) {
            edit = (
                <div className="ui segment">
                    <BiForm config={form} />
                </div>
            );
        }
        return (
            <div>
                <div className="ui segments">
                    <div className="ui segment">
                        <h1>1)发放公告</h1>
                        <BiForm config={form} />

                        <h1>2)删除公告</h1>
                        <BiForm config={form2} />
                    </div>
                </div>
                <DataTable title="已发发公告列表" config={table} />
            </div>
        );
    }
}
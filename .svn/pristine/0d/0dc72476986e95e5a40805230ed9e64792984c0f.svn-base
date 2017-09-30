/**
 * Created by Administrator on 2016/9/12.
 */
import React, {Component} from 'react';

import SendMailAction from "../actions/SendMailAction";
import SendMailStore from "../stores/SendMailStore";

import BiForm from "../components/BiForm"
import DataTable from "../components/DataTable"

export default class SendMail extends Component {
    constructor(props) {
        super(props);
        this.state = SendMailStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        SendMailStore.listen(this.onChange);
        SendMailAction.query();
        SendMailAction.querySendMail();
    }

    componentWillUnmount() {
        SendMailStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleClickSendMail() {
        if (this.state.sending == false)
            SendMailAction.sendMail(this.state.form);
        this.setState({sending:true});
    }

    handleClicktemporary() {
        if (this.state.sending == false)
            SendMailAction.temporary(this.state.form);
        this.setState({sending:true});
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

    render() {
        let form = {
            data: this.state.form,
            input:this.handleInput.bind(this),
            fields: [
                {type:'row', styles:'inline fields'},
                {label: '平台', fieldName: 'platform_id', type: 'select', options:{key:'id',val:'platform_name', data:this.state.platforms}, styles:'required field',selectall:true},
                {label: '区服', fieldName: 'server_id', type: 'select', options:{key:'server_id',val:'server_name',ref:'platform_id', data:this.state.servers}, styles:'required field', selectall:true},
                {label: '角色名', fieldName: 'role_name', type: 'text', styles:'field'},
                {type:'erow'},
                {label: '标题', fieldName: 'title', type: 'text', styles:'eight wide required field'},
                {label: '内容', fieldName: 'content', type: 'textarea', options:{row:2}, styles:'eight wide required field'},
                {label: '道具(格式：ID,数量;ID,数量)', fieldName: 'items', type: 'text', styles:'eight wide field'},
                {type:'submit', btstyles:(this.state.sending ? 'ui disabled button' : 'ui button'), options:{text:'发送邮件', handleClick:this.handleClickSendMail.bind(this)}},
                {type:'submit', btstyles:(this.state.sending ? 'ui disabled button' : 'ui button'), options:{text:'指定发送(还没有加入上传文件功能，不知道怎么用请不要点)', handleClick:this.handleClicktemporary.bind(this)}},
            ]
        };

        let table = {
            data:this.state.mail_info,
            fields:[
                {width:'',styleName:'',title:'玩家编号',type:'text',fieldName:'role_id'},
                {width:'',styleName:'',title:'补偿编号',type:'text',fieldName:'mail_id'},
                {width:'',styleName:'',title:'标题',type:'text',fieldName:'title'},
                {width:'',styleName:'',title:'正文',type:'text',fieldName:'mail_context'},
                {width:'',styleName:'',title:'礼物箱id',type:'text',fieldName:'prop_group_id'},
                {width:'',styleName:'',title:'礼物品质',type:'text',fieldName:'prop_group_quality'},
                {width:'',styleName:'',title:'邮件创建时间',type:'text',fieldName:'create_time'},
                {width:'',styleName:'',title:'有效期(分钟)',type:'text',fieldName:'duration'},
                {width:'',styleName:'',title:'发送者role_id',type:'text',fieldName:'sender'},
                {width:'',styleName:'',title:'邮件头图标路径',type:'text',fieldName:'pic_path'},
            ]
        };

        return (
            <div>
                <div className="ui segments">
                    <div className="ui segment">
                        <BiForm config={form} />
                    </div>
                </div>
                <DataTable title="玩家补偿列表" config={table} />
            </div>
        );
    }
}
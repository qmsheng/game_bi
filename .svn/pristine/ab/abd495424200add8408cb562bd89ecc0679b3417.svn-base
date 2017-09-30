/**
 * Created by LiuXiao on 2017/2/27.
 */

import React, {Component} from 'react';

import CdKeyAction from "../actions/CdKeyAction";
import CdKeyStore from "../stores/CdKeyStore";

import BiForm from "../components/BiForm"
import DataTable from "../components/DataTable"
import PopWin from "../components/PopWin"

export default class CdKey extends Component {
    constructor(props) {
        super(props);
        this.state = CdKeyStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        CdKeyStore.listen(this.onChange);
        CdKeyAction.query(1);
    }

    componentWillUnmount() {
        CdKeyStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleQueryPage(page) {
        CdKeyAction.query(page);
    }

    handleClickAddCdKey() {
        if (this.state.sending == false)
            CdKeyAction.generateCdKey(this.state.form);
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

    handleEdit()
    {}

    handleStop()
    {}

    handleExport(obj)
    {
        CdKeyAction.exportCdKey(obj.batch);
    }

    render() {
        let table = {
            data:this.state.cdkeys.data ? this.state.cdkeys.data : {},
            page:this.state.cdkeys.current_page ?this.state.cdkeys.current_page:1,
            max:this.state.cdkeys.last_page ? this.state.cdkeys.last_page : 1,
            query:this.handleQueryPage.bind(this),
            fields:[
                {width:'',styleName:'',title:'批次',type:'text',fieldName:'batch'},
                {width:'',styleName:'',title:'平台',type:'text',fieldName:'platform_name'},
                {width:'',styleName:'',title:'数量',type:'text',fieldName:'number'},
                {width:'',styleName:'',title:'描述',type:'text',fieldName:'name'},
                {width:'',styleName:'',title:'礼包Id',type:'text',fieldName:'chestId'},
                {width:'',styleName:'',title:'创建时间',type:'text',fieldName:'create_time'},
                {width:'',styleName:'',title:'生效时间',type:'text',fieldName:'start_time'},
                {width:'',styleName:'',title:'失效时间',type:'text',fieldName:'end_time'},
                {width:'',styleName:'',title:'状态',type:'text',fieldName:'state'},
                {width:'300',styleName:'center aligned',title:'操作',type:'buttons',fieldName:'', options:{buttons:[
                    {title:'修改', click:this.handleEdit.bind(this), styles:''},
                    {title:'中止/启用', click:this.handleStop.bind(this), styles:''},
                    {title:'导出', click:this.handleExport.bind(this), styles:''},
                ]}},
            ]
        };

        let form = {
            data: this.state.form,
            input:this.handleInput.bind(this),
            styles:'ui equal width form',
            fields: [
                {type:'row'},
                {label: '平台限制', fieldName: 'platform_id', type: 'select', options:{key:'id',val:'platform_name', data:this.state.platforms}, styles:'required field',selectall:true},
                {label: '礼包Id',   fieldName: 'chestId', type: 'text', styles:'required field'},
                {label: '生成批次', fieldName: 'batch', type: 'text', styles:'required field'},
                {type:'erow'},

                {type:'row'},
                {label: '数量', fieldName: 'number', type: 'text', styles:'required field'},
                {label: '生效时间', fieldName: 'start_time', type: 'text', styles:'required field'},
                {label: '截止时间', fieldName: 'end_time', type: 'text', styles:'required field'},
                {type:'erow'},

                {type:'row'},
                {label: '礼品码前缀', fieldName: 'prefix', type: 'text', styles:'required field'},
                {label: '礼品码长度', fieldName: 'length', type: 'text', styles:'field'},
                {label: '描述', fieldName: 'name', type: 'text', styles:'required field'},
                {type:'erow'},

                {type:'submit', btstyles:(this.state.sending ? 'ui disabled button' : 'ui button'), options:{text:'生成', handleClick:this.handleClickAddCdKey.bind(this)}},
            ]
        };

        return (
            <div>
                <div className="ui segments">
                    <div className="ui segment">
                        <DataTable title="服务器列表" config={table} />
                    </div>
                </div>
                <div className="ui segments">
                    <div className="ui segment">
                        <BiForm config={form} />
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Created by Administrator on 2016/9/12.
 */
import React, {Component} from 'react';

import LostReportAction from "../actions/LostReportAction";
import LostReportStore from "../stores/LostReportStore";

import DataTable from "../components/DataTable"
import BiForm from "../components/BiForm"
import PopWin from "../components/PopWin"

export default class LostReport extends Component {
    constructor(props) {
        super(props);
        this.state = LostReportStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        LostReportStore.listen(this.onChange);
        LostReportAction.query(1);
    }

    componentWillUnmount() {
        LostReportStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleClickAdd(event) {
        let lost ={type_id:'',id:'', type_name:''};
        LostReportAction.setEditObj(lost);
        LostReportAction.showWin(true);
    }

    handleEdit(lost) {
        let clone = {};;
        $.extend(clone,lost);
        LostReportAction.setEditObj(clone);
        LostReportAction.showWin(true);
    }

    handleDelete(id) {
        LostReportAction.delete(id);
    }

    handleInput(name, val, event) {
        var newState=this.state.lost;
        if (val != "") {
            newState[name]=val;
        } else {
            newState[name]=event.target.value;
        }

        LostReportAction.setEditObj(newState);
    }

    handleQueryPage(page) {
        LostReportAction.query(page);
    }

    handleClickSave() {
        LostReportAction.save(this.state.lost);
    }

    handleClickCloseWin() {
        this.setState({showWin:true});
    }

    render() {
        let form = {
            data: this.state.lost,
            input:this.handleInput.bind(this),
            fields: [
                {type:'row',styles:'inline fields'},
                {label: '排序id', fieldName: 'order_by', type: 'text', styles:'required field'},
                {label: '流失点ID', fieldName: 'type_id', type: 'text', styles:'required field'},
                {label: '流失点名称', fieldName: 'type_name', type: 'text', styles:'required field'},
                {label: '', fieldName: '',type: 'submit', styles:'', options:{text:'保存',handleClick:this.handleClickSave.bind(this)}},
                {type:'erow'}
            ]
        };

        let table = {
            data:this.state.losts.data ? this.state.losts.data : {},
            page:this.state.losts.current_page ?this.state.losts.current_page:1,
            max:this.state.losts.last_page ? this.state.losts.last_page : 1,
            query:this.handleQueryPage.bind(this),
            fields:[
                {width:'',styleName:'',title:'排序id',type:'text',fieldName:'order_by'},
                {width:'',styleName:'',title:'流失点ID',type:'text',fieldName:'type_id'},
                {width:'',styleName:'',title:'流失点名称',type:'text',fieldName:'type_name'},
                {width:'80',styleName:'',title:'操作',type:'op',fieldName:'',options:{edit:this.handleEdit.bind(this), delete:this.handleDelete.bind(this)}}
            ]
        };

        let edit = <div></div>;
        if (this.state.showWin) {
            edit = (
                <div className="ui segment">
                    <BiForm config={form} />
                </div>);
        }

        return (
            <div>
                <div className="ui segments">
                    <div className="ui segment">
                        <button className="ui button" type="submit" onClick={this.handleClickAdd.bind(this)}>添加流失点</button>
                    </div>
                    {edit}
                </div>

                <div className="ui segments">
                    <div className="ui segment">
                        <DataTable title="流失点列表" config={table} />
                    </div>
                </div>
            </div>
        );
    }
}
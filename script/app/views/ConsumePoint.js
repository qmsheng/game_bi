/**
 * Created by LiuXiao on 2017/2/15.
 */

import React, {Component} from 'react';

import ConsumePointAction from "../actions/ConsumePointAction";
import ConsumePointStore from "../stores/ConsumePointStore";

import DataTable from "../components/DataTable"
import BiForm from "../components/BiForm"
import PopWin from "../components/PopWin"

export default class ConsumePoint extends Component {
    constructor(props) {
        super(props);
        this.state = ConsumePointStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        ConsumePointStore.listen(this.onChange);
        ConsumePointAction.query(1);
    }

    componentWillUnmount() {
        ConsumePointStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleClickAdd(event) {
        let consume ={type_id:'',id:'', name:''};
        ConsumePointAction.setEditObj(consume);
        ConsumePointAction.showWin(true);
    }

    handleEdit(consume) {
        let clone = {};;
        $.extend(clone,consume);
        ConsumePointAction.setEditObj(clone);
        ConsumePointAction.showWin(true);
    }

    handleDelete(id) {
        ConsumePointAction.delete(id);
    }

    handleInput(name, val, event) {
        var newState=this.state.consume;
        if (val != "") {
            newState[name]=val;
        } else {
            newState[name]=event.target.value;
        }

        ConsumePointAction.setEditObj(newState);
    }

    handleQueryPage(page) {
        ConsumePointAction.query(page);
    }

    handleClickSave() {
        ConsumePointAction.save(this.state.consume);
    }

    handleClickCloseWin() {
        this.setState({showWin:true});
    }

    render() {
        let form = {
            data: this.state.consume,
            input:this.handleInput.bind(this),
            fields: [
                {type:'row',styles:'inline fields'},
                {label: '消费点ID', fieldName: 'type_id', type: 'text', styles:'required field'},
                {label: '消费点名称', fieldName: 'name', type: 'text', styles:'required field'},
                {label: '', fieldName: '',type: 'submit', styles:'', options:{text:'保存',handleClick:this.handleClickSave.bind(this)}},
                {type:'erow'}
            ]
        };

        let table = {
            data:this.state.consumes.data ? this.state.consumes.data : {},
            page:this.state.consumes.current_page ?this.state.consumes.current_page:1,
            max:this.state.consumes.last_page ? this.state.consumes.last_page : 1,
            query:this.handleQueryPage.bind(this),
            fields:[
                {width:'',styleName:'',title:'消费点ID',type:'text',fieldName:'type_id'},
                {width:'',styleName:'',title:'消费点名称',type:'text',fieldName:'name'},
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
                        <button className="ui button" type="submit" onClick={this.handleClickAdd.bind(this)}>添加消费点</button>
                    </div>
                    {edit}
                </div>

                <div className="ui segments">
                    <div className="ui segment">
                        <DataTable title="消费点列表" config={table} />
                    </div>
                </div>
            </div>
        );
    }
}

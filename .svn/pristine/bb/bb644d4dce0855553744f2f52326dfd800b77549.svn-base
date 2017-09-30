/**
 * Created by Administrator on 2016/9/12.
 */
import React, {Component} from 'react';

import MenuAction from "../actions/MenuAction";
import MenuStore from "../stores/MenuStore";

import DataTable from "../components/DataTable"
import BiForm from "../components/BiForm"

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = MenuStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        MenuStore.listen(this.onChange);
        MenuAction.query(1);
    }

    componentWillUnmount() {
        MenuStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleClickAdd(event) {
        event.preventDefault();
        let menu ={menu_name:'',id:'',url:'',icon:'',parent_id:'0', description:''};
        MenuAction.setEditObj(menu);
        MenuAction.showWin(true);
    }

    handleEdit(menu) {
        let clone = {};
        $.extend(clone,menu);
        MenuAction.setEditObj(clone);
        MenuAction.showWin(true);
    }

    handleDelete(id) {
        MenuAction.delete(id);
    }

    handleInput(name, val, event) {
        var newState=this.state.menu;
        if (val != "") {
            newState[name]=val;
        } else {
            newState[name]=event.target.value;
        }
        MenuAction.setEditObj(newState);
    }

    handleQueryPage(page) {
        MenuAction.query(page);
    }

    handleClickSave() {
        MenuAction.save(this.state.menu);
    }

    handleClickCloseWin() {
        this.setState({showWin:true});
    }

    render() {
        let form = {
            data: this.state.menu,
            input:this.handleInput.bind(this),
            fields: [
                {type:'row',styles:'inline fields'},
                {label: '菜单项', fieldName: 'menu_name', type: 'text',styles:'required field'},
                {label: '链接', fieldName: 'url', type: 'text', styles:'required field'},
                {label: '图标', fieldName: 'icon', type: 'text', styles:'required field'},
                {label: '父ID', fieldName: 'parent_id', type: 'select', options:{key:'id',val:'menu_name', data:this.state.parent_menus}, styles:'required field'},
                {label: '描述', fieldName: 'description', type: 'text', styles:'required field'},
                {label: '', fieldName: '',type: 'submit', styles:'', options:{text:'保存',handleClick:this.handleClickSave.bind(this)}},
                {type:'erow'}
            ]
        };

        let table = {
            data:this.state.menus.data ? this.state.menus.data : {},
            page:this.state.menus.current_page ?this.state.menus.current_page:1,
            max:this.state.menus.last_page ? this.state.menus.last_page : 1,
            query:this.handleQueryPage,
            fields:[
                {width:'',styleName:'',title:'ID',type:'text',fieldName:'id'},
                {width:'',styleName:'',title:'菜单项',type:'text',fieldName:'menu_name'},
                {width:'',styleName:'',title:'链接',type:'text',fieldName:'url'},
                {width:'',styleName:'',title:'图标',type:'text',fieldName:'icon'},
                {width:'',styleName:'',title:'描述',type:'text',fieldName:'description'},
                {width:'',styleName:'',title:'父ID',type:'text',fieldName:'parent_id'},
                {width:'80',styleName:'',title:'操作',type:'op',fieldName:'', options:{edit:this.handleEdit.bind(this), delete:this.handleDelete.bind(this)}}

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
                        <button className="ui button" type="submit" onClick={this.handleClickAdd.bind(this)}>添加菜单项</button>
                    </div>
                    {edit}
                </div>
                <div className="ui segments">
                    <div className="ui segment">
                        <DataTable title="菜单项列表" config={table} />
                    </div>
                </div>
            </div>
        );
    }
}
/**
 * Created by Administrator on 2016/9/12.
 */
import React, {Component} from 'react';

import PlatformAction from "../actions/PlatformAction";
import PlatformStore from "../stores/PlatformStore";

import DataTable from "../components/DataTable"
import BiForm from "../components/BiForm"
import PopWin from "../components/PopWin"

export default class Platform extends Component {
    constructor(props) {
        super(props);
        this.state = PlatformStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        PlatformStore.listen(this.onChange);
        PlatformAction.query(1);
    }

    componentWillUnmount() {
        PlatformStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleClickAdd(event) {
        let platform ={platform_name:'',id:'', description:''};
        PlatformAction.setEditObj(platform);
        PlatformAction.showWin(true);
    }

    handleEdit(platform) {
        let clone = {};;
        $.extend(clone,platform);
        PlatformAction.setEditObj(clone);
        PlatformAction.showWin(true);
    }

    handleDelete(id) {
        PlatformAction.delete(id);
    }

    handleInput(name, val, event) {
        var newState=this.state.platform;
        if (val != "") {
            newState[name]=val;
        } else {
            newState[name]=event.target.value;
        }

        PlatformAction.setEditObj(newState);
    }

    handleQueryPage(page) {
        PlatformAction.query(page);
    }

    handleClickSave() {
        PlatformAction.save(this.state.platform);
    }

    handleClickCloseWin() {
        this.setState({showWin:true});
    }

    render() {
        let form = {
            data: this.state.platform,
            input:this.handleInput.bind(this),
            fields: [
                {type:'row',styles:'inline fields'},
                {label: '平台名', fieldName: 'platform_name', type: 'text', styles:'required field'},
                {label: '描述', fieldName: 'description', type: 'text'},
                {label: '', fieldName: '',type: 'submit', styles:'', options:{text:'保存',handleClick:this.handleClickSave.bind(this)}},
                {type:'erow'}
            ]
        };

        let table = {
            data:this.state.platforms.data ? this.state.platforms.data : {},
            page:this.state.platforms.current_page ?this.state.platforms.current_page:1,
            max:this.state.platforms.last_page ? this.state.platforms.last_page : 1,
            query:this.handleQueryPage.bind(this),
            fields:[
                {width:'30%',styleName:'',title:'平台名',type:'text',fieldName:'platform_name'},
                {width:'',styleName:'',title:'描述',type:'text',fieldName:'description'},
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
                        <button className="ui button" type="submit" onClick={this.handleClickAdd.bind(this)}>添加平台</button>
                    </div>
                    {edit}
                </div>

                <div className="ui segments">
                    <div className="ui segment">
                        <DataTable title="平台列表" config={table} />
                    </div>
                </div>
            </div>
        );
    }
}
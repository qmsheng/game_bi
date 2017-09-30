/**
 * Created by QiuMaoSheng on 2017/05/27
 */

import alt from '../alt';
import AddTestAction from "../actions/AddTestAction";
import moment from 'moment';

class AddTestStore {
    constructor() {
        this.bindActions(AddTestAction);
        this.act_sta = [{"id": 0,"status": "默认"},{"id": 1,"status": "待开始"},{"id": 2,"status": "进行中"},{"id": 3,"status": "已结束"}];
        this.platforms = [];
        this.servers = [];
        this.query = [];
        this.insert = [];
        this.form = {gs_id:'', activity_id:'',start_time:moment(),end_time:moment(),reward_start_time:moment(),reward_end_time:moment(),info:'',data_group_id:''};
    }

    onSetEditObj(obj) {
        this.form = obj;
    }

    onQueryResponse(data) {
        this.query = data.data.query;
        this.platforms = data.data.platforms;
        this.servers = data.data.servers;
    }

    onAddTestResponse(data) {
        this.insert = data.data.insert;
        this.form.error = data.result;
    }
}

export default alt.createStore(AddTestStore);

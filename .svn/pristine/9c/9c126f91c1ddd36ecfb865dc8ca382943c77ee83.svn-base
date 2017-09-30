/**
 * Created by QiuMaoSheng on 2017/08/31
 */

import alt from '../alt';
import ServerActivityAction from "../actions/ServerActivityAction";
import moment from 'moment';

class ServerActivityStore {
    constructor() {
        this.bindActions(ServerActivityAction);
        this.act_sta = [{"id": 1,"status": 1},{"id": 2,"status": 2},{"id": 3,"status": 3},{"id": 4,"status": 4},{"id": 5,"status": 5},{"id": 6,"status": 6},{"id": 7,"status": 7}];
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

    onServerActivityResponse(data) {
        this.insert = data.data.insert;
        this.form.error = data.result;
    }
}

export default alt.createStore(ServerActivityStore);

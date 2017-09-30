/**
 * Created by LiuXiao on 2017/2/16.
 */

import alt from '../alt';
import QueryConsumeAction from "../actions/QueryConsumeAction";
import moment from 'moment';

class QueryConsumeStore {
    constructor() {
        this.bindActions(QueryConsumeAction);
        this.platforms = [];
        this.servers = [];
        this.points = [];
        this.form = {server_id:'', platform_id:'',start_time:moment(),end_time:moment()};
    }

    onSetEditObj(obj) {
        this.form = obj;
    }

    onQueryResponse(data) {
        this.servers = data.data.servers;
        this.platforms = data.data.platforms;
    }

    onQueryConsumeResponse(data) {
        this.points = data.data.points;
        this.form.error = data.result;
    }
}

export default alt.createStore(QueryConsumeStore);

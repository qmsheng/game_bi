/**
 * Created by Administrator on 2016/9/14.
 */
import alt from '../alt';
import QueryGuardAction from "../actions/QueryGuardAction";
import moment from 'moment';

class QueryGuardStore {
    constructor() {
        this.bindActions(QueryGuardAction);
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

    onQueryGuardResponse(data) {
        this.points = data.data.points;
        this.form.error = data.result;
    }
}

export default alt.createStore(QueryGuardStore);

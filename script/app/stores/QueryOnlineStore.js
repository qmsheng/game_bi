/**
 * Created by Administrator on 2016/9/14.
 */
import alt from '../alt';
import QueryOnlineAction from "../actions/QueryOnlineAction";

class QueryOnlineStore {
    constructor() {
        this.bindActions(QueryOnlineAction);
        this.platforms = [];
        this.servers = [];
        this.onlines = [];
        this.form = {server_id:'', platform_id:'',role_name:'', start_date:'',end_date:'',error:''};
    }

    onQueryResponse(data) {
        this.servers = data.data.servers;
        this.platforms = data.data.platforms;
    }

    onQueryOnlineResponse(data) {
        this.onlines = data.data.server_onlines;
        this.form.error = data.result;
    }

    onSetEditFormObj(obj) {
        this.form = obj;
    }
}

export default alt.createStore(QueryOnlineStore);

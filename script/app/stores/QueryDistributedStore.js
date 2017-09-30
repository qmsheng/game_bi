/**
 * Created by Administrator on 2016/9/14.
 */
import alt from '../alt';
import QueryDistributedAction from "../actions/QueryDistributedAction";

class QueryDistributedStore {
    constructor() {
        this.bindActions(QueryDistributedAction);
        this.platforms = [];
        this.servers = [];
        this.onlines = [];
        this.form = {server_id:'', platform_id:'',query_type:'', start_time:'',end_time:'', error:''};
        this.query_type = 0;
    }

    onSetEditFormObj(obj) {
        this.form = obj;
    }

    onQueryResponse(data) {
        this.servers = data.data.servers;
        this.platforms = data.data.platforms;
    }

    onQueryDistributedResponse(data) {
        this.distributeds = data.data.distributeds;
        this.form.error = data.result;
        this.query_type = data.data.query_type;
    }
}

export default alt.createStore(QueryDistributedStore);

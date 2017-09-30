/**
 * Created by Administrator on 2016/9/14.
 */
import alt from '../alt';
import QueryPlayerAction from "../actions/QueryPlayerAction";

class QueryPlayerStore {
    constructor() {
        this.bindActions(QueryPlayerAction);
        this.platforms = [];
        this.servers = [];
        this.role_infos = [];
        this.form = {server_id:'',platform_id:'', role_name:'',role_id:'',uid:'', error:'',page:''};
    }

    onQueryResponse(data) {
        this.platforms = data.data.platforms;
        this.servers = data.data.servers;
    }

    onQueryPlayerResponse(data) {
        this.role_infos = data.data.role_infos;
        this.form.error = data.result;
    }
}

export default alt.createStore(QueryPlayerStore);

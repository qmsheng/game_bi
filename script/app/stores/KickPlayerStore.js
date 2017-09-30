/**
 * Created by Administrator on 2016/9/14.
 */
import alt from '../alt';
import KickPlayerAction from "../actions/KickPlayerAction";

class KickPlayerStore {
    constructor() {
        this.bindActions(KickPlayerAction);
        this.platforms = [];
        this.servers = [];
        this.form = {server_id:'',platform_id:'', role_name:'', role_id:'', error:''};
        this.freezes = [];
        this.freeze = {role_id:'', hour:'', type:'', server_id:''};
    }

    onQueryResponse(data) {
        this.platforms = data.data.platforms;
        this.servers = data.data.servers;
    }

    onQueryFreezeResponse(data) {
        this.freezes = data.data.freezes;
    }

    onSetFreeze(obj) {
        this.freeze = obj;
    }

    onKickPlayerResponse(data) {
        this.form.error = data.result;
    }

    onSendFreezeResponse(data) {
        console.log(data);
    }

    onSetEditObj(obj) {
        this.form = obj;
    }
}

export default alt.createStore(KickPlayerStore);

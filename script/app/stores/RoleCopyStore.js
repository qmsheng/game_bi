/**
 * Created by Administrator on 2016/9/14.
 */
import alt from '../alt';
import RoleCopyAction from "../actions/RoleCopyAction";

class RoleCopyStore {
    constructor() {
        this.bindActions(RoleCopyAction);
        this.platforms = [];
        this.servers = [];
        this.role_infos = [];
        this.form = {server_id:'',platform_id:'', role_name:'',role_id:'', error:''};
        this.copy = {role_id:'', new_account:'', new_name:'', server_id:''};
    }

    onQueryResponse(data) {
        this.platforms = data.data.platforms;
        this.servers = data.data.servers;
    }

    onQueryPlayerResponse(data) {
        this.role_infos = data.data.role_infos;
        this.form.error = data.result;
    }

    onCopyPlayerResponse(obj) {
        this.copy = obj;
    }

    onSetCopy(obj) {
        this.copy = obj;
    }

    onSetEditObj(obj) {
        this.form = obj;
    }
}

export default alt.createStore(RoleCopyStore);

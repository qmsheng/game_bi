/**
 * Created by Administrator on 2016/9/14.
 */
import alt from '../alt';
import ServerAction from "../actions/ServerAction";

class ServerStore {
    constructor() {
        this.bindActions(ServerAction);
        this.servers = {};
        this.gsserverinfo = {};
        this.platforms = [];
        this.checkItems = [];
        this.server = {id:'',platform_id:'',platform_server_id:'',server_id:'',server_name:'',server_ip:'',login_port:'',description:'', http_port:'', lang:'', login_key:'', pay_key:'', http_api_server_address:'', platform:{platform_name:''}, status:'', active:'', created_at:''};
        this.showWin = false;
    }

    onSetEditObj(obj) {
        this.server = obj;
    }

    onShowWin(show) {
        this.showWin = show;
    }

    onSaveResponse(data) {
        if (data.result == 0) {
            ServerAction.query(this.servers.current_page);
            this.showWin = false;
        }
    }

    onQueryResponse(data) {
        this.servers = data.data.servers;
        this.gsserverinfo = data.data.gsserverinfo;
        this.platforms = data.data.platforms;
        this.server = {id:'',platform_id:'',server_id:'',platform_server_id:'',server_name:'',server_ip:'',login_port:'',description:'', http_port:'', lang:'', login_key:'', pay_key:'', http_api_server_address:'', platform:{platform_name:''}, status:'', active:'', created_at:''};
    }

    onDeleteResponse(data) {
        if (data.result == 0) {
            ServerAction.query(this.servers.current_page);
        }
    }
}

export default alt.createStore(ServerStore);

/**
 * Created by Administrator on 2016/9/14.
 */
import alt from '../alt';
import SendMailAction from "../actions/SendMailAction";

class SendMailStore {
    constructor() {
        this.bindActions(SendMailAction);
        this.platforms = [];
        this.servers = [];
        this.mail_info = [];
        this.form = {server_id:0, platform_id:0,role_name:'', title:'', content:'', items:'', error:''};
        this.sending = false;

    }

    onQueryResponse(data) {
        this.platforms = data.data.platforms;
        this.servers = data.data.servers;
    }

    onSendMailResponse(data) {
        this.form.error = data.result;
        this.sending = false;
    }

    onQuerySendMailResponse(data) {
        this.mail_info = data.data.mail_info;
    }
}

export default alt.createStore(SendMailStore);

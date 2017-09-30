/**
 * Created by Administrator on 2016/9/14.
 */
import alt from '../alt';
import SendNoticeAction from "../actions/SendNoticeAction";

class SendNoticeStore {
    constructor() {
        this.bindActions(SendNoticeAction);
        this.platforms = [];
        this.servers = [];
        this.form = {server_id:'',platform_id:'',content:'',interval:'',start_time:'', end_time:'', error:0, server_ids:[]};
        this.showWin = false;
        this.notices = [];
        this.sending = false;
    }

    onShowWin(show) {
        this.showWin = show;
    }

    onSending(sending) {
        this.sending = sending;
    }

    onSetEditObj(obj) {
        this.form = obj;
    }

    onSetEditQueryObj(obj) {
        this.queryForm = obj;
    }

    onQueryResponse(data) {
        this.platforms = data.data.platforms;
        this.servers = data.data.servers;
    }

    onSendNoticeResponse(data) {
        this.form.error = data.result;
        this.sending = false;
    }

    onQueryNoticeResponse(data) {
        this.notices = data.data.notices;
    }

    onDelNoticeResponse(data) {
        this.notices = data.data.notices;
    }
    
}

export default alt.createStore(SendNoticeStore);

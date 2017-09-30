/**
 * Created by Administrator on 2016/9/14.
 */
import alt from '../alt';
import ServerReportAction from "../actions/ServerReportAction";

class ServerReportStore {
    constructor() {
        this.bindActions(ServerReportAction);
        this.platforms = [];
        this.servers = [];
        this.reports = [];
        this.form = {server_id:'', platform_id:'',start_date:'', end_date:'', error:''};

    }

    onQueryResponse(data) {
        this.servers = data.data.servers;
        this.platforms = data.data.platforms;
    }

    onQueryServerReportResponse(data) {
        this.reports = data.data.reports;
        this.form.error = data.result;
    }

    onSetEditFormObj(obj) {
        this.form = obj;
    }
}

export default alt.createStore(ServerReportStore);

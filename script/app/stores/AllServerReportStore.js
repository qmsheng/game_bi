/**
 * Created by QiuMaoSheng on 2017/06/21
 */
import alt from '../alt';
import AllServerReportAction from "../actions/AllServerReportAction";
import moment from 'moment';

class AllServerReportStore {
    constructor() {
        this.bindActions(AllServerReportAction);
        this.platforms = [];
        this.servers = [];
        this.reports = [];
        this.form = {server_id:'0', platform_id:'',start_date:'', end_date:'', error:'',start_time:moment(),end_time:moment()};

    }

    onQueryResponse(data) {
        this.servers = data.data.servers;
        this.platforms = data.data.platforms;
    }

    onQueryAllServerReportResponse(data) {
        this.reports = data.data.reports;
        this.form.error = data.result;
    }

    onSetEditFormObj(obj) {
        this.form = obj;
    }
}

export default alt.createStore(AllServerReportStore);

/**
 * Created by QiuMaoSheng on 2017/09/22
 */
import alt from '../alt';
import TotalServerReportAction from "../actions/TotalServerReportAction";
import moment from 'moment';

class TotalServerReportStore {
    constructor() {
        this.bindActions(TotalServerReportAction);
        this.platforms = [];
        this.servers = [];
        this.reports = [];
        this.form = {platform_id:'',start_date:'', end_date:'', error:'',start_time:moment(),end_time:moment()};

    }

    onQueryResponse(data) {
        this.servers = data.data.servers;
        this.platforms = data.data.platforms;
    }

    onQueryTotalServerReportResponse(data) {
        this.reports = data.data.reports;
        this.form.error = data.result;
    }

    onSetEditFormObj(obj) {
        this.form = obj;
    }
}

export default alt.createStore(TotalServerReportStore);

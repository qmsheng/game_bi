/**
 * Created by Administrator on 2016/12/29.
 */
import alt from '../alt';
import PreserveReportAction from "../actions/PreserveReportAction";

class PreserveReportStore {
    constructor() {
        this.bindActions(PreserveReportAction);
        this.platforms = [];
        this.servers = [];
        this.reports = [];
        this.form = {server_id:'', platform_id:'',start_date:'', end_date:'', error:''};

    }

    onQueryResponse(data) {
        this.servers = data.data.servers;
        this.platforms = data.data.platforms;
    }

    onQueryPreserveReportResponse(data) {
        this.reports = data.data.reports;
        this.form.error = data.result;
    }

    onSetEditFormObj(obj) {
        this.form = obj;
    }
}

export default alt.createStore(PreserveReportStore);
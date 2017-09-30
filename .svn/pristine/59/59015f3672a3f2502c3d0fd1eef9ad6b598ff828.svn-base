/**
 * Created by LiuXiao on 2017/2/22.
 */

import alt from '../alt';
import PayDataAction from "../actions/PayDataAction";

class ChargeOrderStore {
    constructor() {
        this.bindActions(PayDataAction);
        this.platforms = [];
        this.servers = [];
        this.reports = [];
        this.form = {server_id:'', platform_id:'',start_date:'', end_date:'', error:''};

    }

    onQueryResponse(data) {
        this.servers = data.data.servers;
        this.platforms = data.data.platforms;
    }

    onQueryPayDataResponse(data) {
        this.reports = data.data.reports;
        this.form.error = data.result;
    }

    onSetEditFormObj(obj) {
        this.form = obj;
    }
}

export default alt.createStore(ChargeOrderStore);
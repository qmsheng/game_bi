/**
 * Created by LiuXiao on 2017/2/22.
 */

import alt from '../alt';
import ChargeOrderAction from "../actions/ChargeOrderAction";
import moment from 'moment';

class ChargeOrderStore {
    constructor() {
        this.bindActions(ChargeOrderAction);
        this.platforms = [];
        this.servers = [];
        this.reports = [];
        this.form = {server_id:'', platform_id:'',start_date:'', end_date:'', error:'',uid:'',start_time:moment(),end_time:moment()};

    }

    onQueryResponse(data) {
        this.servers = data.data.servers;
        this.platforms = data.data.platforms;
    }

    onQueryChargeOrderResponse(data) {
        this.reports = data.data.reports;
        this.form.error = data.result;
    }

    onSetEditFormObj(obj) {
        this.form = obj;
    }
}

export default alt.createStore(ChargeOrderStore);

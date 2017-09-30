/**
 * Created by QiuMaoSheng on 2017/06/21
 */
import alt from '../alt';
import RechargeAction from "../actions/RechargeAction";
import moment from 'moment';

class RechargeStore {
    constructor() {
        this.bindActions(RechargeAction);
        this.platforms = [];
        this.servers = [];
        this.recharge_info = [];
        this.form = {server_id:'', platform_name:'',start_date:'', end_date:'', error:'',start_time:moment(),end_time:moment()};

    }

    onQueryResponse(data) {
        this.servers = data.data.servers;
        this.platforms = data.data.platforms;
    }

    onQueryRechargeResponse(data) {
        this.recharge_info = data.data.recharge_info;
        this.form.error = data.result;
    }

    onSetEditFormObj(obj) {
        this.form = obj;
    }
}

export default alt.createStore(RechargeStore);

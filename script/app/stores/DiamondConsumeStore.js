/**
 * Created by QiuMaoSheng on 2017/07/14
 */
import alt from '../alt';
import DiamondConsumeAction from "../actions/DiamondConsumeAction";
import moment from 'moment';

class DiamondConsumeStore {
    constructor() {
        this.bindActions(DiamondConsumeAction);
        this.platforms = [];
        this.servers = [];
        this.arr_diamond_consume = [];
        this.form = {server_id:'', platform_name:'',start_date:'', end_date:'', error:'',start_time:moment(),end_time:moment()};

    }

    onQueryResponse(data) {
        this.servers = data.data.servers;
        this.platforms = data.data.platforms;
    }

    onQueryDiamondConsumeResponse(data) {
        this.arr_diamond_consume = data.data.arr_diamond_consume;
        this.form.error = data.result;
    }

    onSetEditFormObj(obj) {
        this.form = obj;
    }
}

export default alt.createStore(DiamondConsumeStore);

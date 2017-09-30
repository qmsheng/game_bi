/**
 * Created by QiuMaoSheng on 2017/06/21
 */
import alt from '../alt';
import BindDiamondAction from "../actions/BindDiamondAction";
import moment from 'moment';

class BindDiamondStore {
    constructor() {
        this.bindActions(BindDiamondAction);
        this.platforms = [];
        this.servers = [];
        this.arr_bind_diamond = [];
        this.form = {server_id:'', platform_name:'',start_date:'', end_date:'', error:'',start_time:moment(),end_time:moment()};

    }

    onQueryResponse(data) {
        this.servers = data.data.servers;
        this.platforms = data.data.platforms;
    }

    onQueryBindDiamondResponse(data) {
        this.arr_bind_diamond = data.data.arr_bind_diamond;
        this.form.error = data.result;
    }

    onSetEditFormObj(obj) {
        this.form = obj;
    }
}

export default alt.createStore(BindDiamondStore);

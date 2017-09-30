/**
 * Created by qiumaosheng on 2017/08/29.
 */

import alt from '../alt';
import AllFrameFrequencyAction from "../actions/AllFrameFrequencyAction";
import moment from 'moment';

class AllFrameFrequencyStore {
    constructor() {
        this.bindActions(AllFrameFrequencyAction);
        this.platforms = [];
        this.servers = [];
        this.player_info = [];
        this.form = {server_id:'', platform_id:'',start_date:'', end_date:'', error:'',uid:'',start_time:moment(),end_time:moment()};

    }

    onQueryResponse(data) {
        this.servers = data.data.servers;
        this.platforms = data.data.platforms;
    }

    onQueryAllFrameFrequencyResponse(data) {
        this.player_info = data.data.player_info;
        this.form.error = data.result;
    }

    onSetEditFormObj(obj) {
        this.form = obj;
    }
}

export default alt.createStore(AllFrameFrequencyStore);

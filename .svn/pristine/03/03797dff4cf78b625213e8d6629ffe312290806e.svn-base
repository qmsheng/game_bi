/**
 * Created by Administrator on 2016/9/14.
 */
import alt from '../alt';
import FrameFrequencyAction from "../actions/FrameFrequencyAction";
import moment from 'moment';

class FrameFrequencyStore {
    constructor() {
        this.bindActions(FrameFrequencyAction);
        this.platforms = [];
        this.servers = [];
        this.player_info = [];
       this.form = {serverid:'', platform_id:'',start_time:moment(),end_time:moment(),page:''};
    }

    onSetEditObj(obj) {
        this.form = obj;
    }

    onQueryResponse(data) {
        this.servers = data.data.servers;
        this.platforms = data.data.platforms;
    }

    onFrameFrequencyResponse(data) {
        this.player_info = data.data.player_info;
        this.form.error = data.result;
    }
}

export default alt.createStore(FrameFrequencyStore);

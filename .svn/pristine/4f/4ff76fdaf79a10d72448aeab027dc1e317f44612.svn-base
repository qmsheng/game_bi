/**
 * Created by LiuXiao on 2017/2/22.
 */

import alt from '../alt';
import DiamondSpreadAction from "../actions/DiamondSpreadAction";

class DiamondSpreadStore {
    constructor() {
        this.bindActions(DiamondSpreadAction);
        this.platforms = [];
        this.servers = [];
        this.reports = [];
        this.form = {server_id:'', platform_id:'', error:''};

    }

    onQueryResponse(data) {
        this.servers = data.data.servers;
        this.platforms = data.data.platforms;
    }

    onQueryDiamondSpreadResponse(data) {
        this.reports = data.data.reports;
        this.form.error = data.result;
    }

    onSetEditFormObj(obj) {
        this.form = obj;
    }
}

export default alt.createStore(DiamondSpreadStore);
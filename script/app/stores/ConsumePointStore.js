/**
 * Created by LiuXiao on 2017/2/15.
 */

import alt from '../alt';
import ConsumePointAction from "../actions/ConsumePointAction";

class ConsumePointStore {
    constructor() {
        this.bindActions(ConsumePointAction);
        this.consumes = [];
        this.consume = {type_id:'',id:'', name:''}
        this.showWin = false;
    }

    onSetEditObj(obj) {
        this.consume = obj;
    }

    onShowWin(show) {
        this.showWin = show;
    }

    onSaveResponse(data) {
        if (data.result == 0) {
            ConsumePointAction.query(this.consumes.current_page);
            this.showWin = false;
        }
    }

    onQueryResponse(data) {
        this.consumes = data.data.consumes;
        this.consume={type_id:'',id:'',name:''}
    }

    onDeleteResponse(data) {
        if (data.result == 0) {
            ConsumePointAction.query(this.consumes.current_page);
        }
    }
}

export default alt.createStore(ConsumePointStore);
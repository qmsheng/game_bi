/**
 * Created by Administrator on 2016/9/14.
 */
import alt from '../alt';
import LostReportAction from "../actions/LostReportAction";

class LostReportStore {
    constructor() {
        this.bindActions(LostReportAction);
        this.losts = [];
        this.lost = {type_id:'',id:'', type_name:''}
        this.showWin = false;
    }

    onSetEditObj(obj) {
        this.lost = obj;
    }

    onShowWin(show) {
        this.showWin = show;
    }

    onSaveResponse(data) {
        if (data.result == 0) {
            LostReportAction.query(this.losts.current_page);
            this.showWin = false;
        }
    }

    onQueryResponse(data) {
        this.losts = data.data.losts;
        this.lost={type_id:'',id:'', type_name:''}
    }

    onDeleteResponse(data) {
        if (data.result == 0) {
            LostReportAction.query(this.losts.current_page);
        }
    }
}

export default alt.createStore(LostReportStore);

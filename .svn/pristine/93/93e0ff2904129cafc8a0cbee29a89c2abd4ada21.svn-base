/**
 * Created by Administrator on 2016/9/14.
 */
import alt from '../alt';
import PlatformAction from "../actions/PlatformAction";

class PlatformStore {
    constructor() {
        this.bindActions(PlatformAction);
        this.platforms = [];
        this.platform = {platform_name:'',id:'', description:''}
        this.checkItems = [];
        this.showWin = false;
    }

    onSetEditObj(obj) {
        this.platform = obj;
    }

    onShowWin(show) {
        this.showWin = show;
    }

    onSaveResponse(data) {
        if (data.result == 0) {
            PlatformAction.query(this.platforms.current_page);
            this.showWin = false;
        }
    }

    onQueryResponse(data) {
        this.platforms = data.data.platforms;
        this.platform={platform_name:'',id:'', description:''}
    }

    onDeleteResponse(data) {
        if (data.result == 0) {
            PlatformAction.query(this.platforms.current_page);
        }
    }
}

export default alt.createStore(PlatformStore);

/**
 * Created by LiuXiao on 2017/2/28.
 */

import alt from '../alt';
import CdKeyQueryAction from "../actions/CdKeyQueryAction";

class CdKeyQueryStore {
    constructor() {
        this.bindActions(CdKeyQueryAction);
        this.platforms = [];
        this.cdkeys = [];
        this.form = {cdkey:'', user:'', batch:'', error:''};
    }

    onQueryResponse(data) {
    }

    onQueryPlayerResponse(data) {
        this.cdkeys = data.data.cdkeys;
        this.form.error = data.result;
    }
}

export default alt.createStore(CdKeyQueryStore);
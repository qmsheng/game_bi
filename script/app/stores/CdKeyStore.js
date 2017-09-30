/**
 * Created by LiuXiao on 2017/2/27.
 */

import alt from '../alt';
import CdKeyAction from "../actions/CdKeyAction";

class CdKeyStore {
    constructor() {
        this.bindActions(CdKeyAction);
        this.platforms = [];
        this.form = {platform_id:0, chestId:'', number:'', batch:'', start_time:'', end_time:'', prefix:'', length:12, name:'', error:''};
        this.sending = false;
        this.cdkeys = [];
        this.cdkey = {batch:'', name:'', number:'', state:'',create_time:'',start_time:'',end_time:'', platform_name:'', chestId:''}
    }

    onQueryResponse(data) {
        this.platforms = data.data.platforms;
        this.cdkeys = data.data.cdkeys;
        this.cdkey={batch:'', name:'', number:'', state:'',create_time:'',start_time:'',end_time:'', platform_name:'', chestId:''};
    }

    onGenerateCdKeyResponse(data) {
        this.form.error = data.result;
        this.sending = false;
        CdKeyAction.query(this.servers.current_page);
    }

    onExportCdKeyResponse(data) {
        this.form.error = data.result;
    }
}

export default alt.createStore(CdKeyStore);
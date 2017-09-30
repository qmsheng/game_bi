/**
 * Created by Administrator on 2016/9/14.
 */
import alt from '../alt';

import {ajaxRequest} from '../utils/Net'

class SendNoticeAction {
    constructor() {
        this.generateActions(
            'queryResponse',
            'sendNoticeResponse',
            'setEditObj',
            'showWin',
            'setEditQueryObj',
            'queryNoticeResponse',
            'delNoticeResponse',
            'sending'
        );
    }

    query() {
        ajaxRequest('/admin/queryMGame', {}, this.queryResponse, 'POST');
    }

    queryNotice() {
        ajaxRequest('/admin/queryNotice', {}, this.queryNoticeResponse, 'POST');
    }

    
    delNotice(params) {
        ajaxRequest('/admin/delNotice', params, this.delNoticeResponse, 'POST');
    }

    sendNotice(params) {
        ajaxRequest('/admin/sendNotice', params, this.sendNoticeResponse, 'POST');
    }
}

export default alt.createActions(SendNoticeAction);
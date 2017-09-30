/**
 * Created by Administrator on 2016/9/14.
 */
import alt from '../alt';

import {ajaxRequest} from '../utils/Net'

class SendMailAction {
    constructor() {
        this.generateActions(
            'queryResponse',
            'sendMailResponse',
            'temporaryResponse',
            'querySendMailResponse',
        );
    }

    query() {
        ajaxRequest('/admin/queryMGame', {}, this.queryResponse, 'POST');
    }

    sendMail(params) {
        ajaxRequest('/admin/sendMail', params, this.sendMailResponse, 'POST');
    }

    temporary(params) {
        ajaxRequest('/admin/tempAPI', params, this.temporaryResponse, 'POST');
    }

    querySendMail() {
        ajaxRequest('/admin/querySendMail', {}, this.querySendMailResponse, 'POST');
    }
}

export default alt.createActions(SendMailAction);
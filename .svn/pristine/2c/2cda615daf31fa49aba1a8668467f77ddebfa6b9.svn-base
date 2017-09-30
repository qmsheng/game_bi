/**
 * Created by Administrator on 2016/9/14.
 */
import alt from '../alt';

import {ajaxRequest} from '../utils/Net'

class ServerReportAction {
    constructor() {
        this.generateActions(
            'queryResponse',
            'queryServerReportResponse',
            'setEditFormObj'
        );
    }

    query() {
        ajaxRequest('/admin/queryQGame', {}, this.queryResponse, 'POST');
    }

    queryServerReport(params) {
        ajaxRequest('/admin/queryServerReport', params, this.queryServerReportResponse, 'POST');
    }
}

export default alt.createActions(ServerReportAction);
/**
 * Created by LiuXiao on 2017/2/21.
 */

import alt from '../alt';

import {ajaxRequest} from '../utils/Net'

class InComeReportAction {
    constructor() {
        this.generateActions(
            'queryResponse',
            'queryInComeReportResponse',
            'setEditFormObj'
        );
    }

    query() {
        ajaxRequest('/admin/queryQGame', {}, this.queryResponse, 'POST');
    }

    queryInComeReport(params) {
        ajaxRequest('/admin/queryInComeReport', params, this.queryInComeReportResponse, 'POST');
    }
}

export default alt.createActions(InComeReportAction);
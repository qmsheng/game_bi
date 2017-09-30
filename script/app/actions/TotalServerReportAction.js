/**
 * Created by QiuMaoSheng on 2017/09/22
 */
import alt from '../alt';

import {ajaxRequest} from '../utils/Net'

class TotalServerReportAction {
    constructor() {
        this.generateActions(
            'queryResponse',
            'queryTotalServerReportResponse',
            'setEditFormObj'
        );
    }

    query() {
        ajaxRequest('/admin/queryQGame', {}, this.queryResponse, 'POST');
    }

    queryTotalServerReport(params) {
        ajaxRequest('/admin/queryTotalServerReport', params, this.queryTotalServerReportResponse, 'POST');
    }
}

export default alt.createActions(TotalServerReportAction);
/**
 * Created by QiuMaoSheng on 2017/06/21
 */
import alt from '../alt';

import {ajaxRequest} from '../utils/Net'

class AllServerReportAction {
    constructor() {
        this.generateActions(
            'queryResponse',
            'queryAllServerReportResponse',
            'setEditFormObj'
        );
    }

    query() {
        ajaxRequest('/admin/queryQGame', {}, this.queryResponse, 'POST');
    }

    queryAllServerReport(params) {
        ajaxRequest('/admin/queryAllServerReport', params, this.queryAllServerReportResponse, 'POST');
    }
}

export default alt.createActions(AllServerReportAction);
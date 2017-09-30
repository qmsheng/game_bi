/**
 * Created by Administrator on 2016/12/29.
 */
import alt from '../alt';

import {ajaxRequest} from '../utils/Net'

class PreserveReportAction {
    constructor() {
        this.generateActions(
            'queryResponse',
            'queryPreserveReportResponse',
            'setEditFormObj'
        );
    }

    query() {
        ajaxRequest('/admin/queryQGame', {}, this.queryResponse, 'POST');
    }

    queryPreserveReport(params) {
        ajaxRequest('/admin/queryPreserveReport', params, this.queryPreserveReportResponse, 'POST');
    }
}

export default alt.createActions(PreserveReportAction);
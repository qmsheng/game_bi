/**
 * Created by Administrator on 2016/12/28.
 */
import alt from '../alt';

import {ajaxRequest} from '../utils/Net'

class NewReportAction {
    constructor() {
        this.generateActions(
            'queryResponse',
            'queryNewReportResponse',
            'setEditFormObj'
        );
    }

    query() {
        ajaxRequest('/admin/queryQGame', {}, this.queryResponse, 'POST');
    }

    queryNewReport(params) {
        ajaxRequest('/admin/queryNewReport', params, this.queryNewReportResponse, 'POST');
    }
}

export default alt.createActions(NewReportAction);
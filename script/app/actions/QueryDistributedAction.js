/**
 * Created by Administrator on 2016/9/14.
 */
import alt from '../alt';

import {ajaxRequest} from '../utils/Net'

class QueryDistributedAction {
    constructor() {
        this.generateActions(
            'queryResponse',
            'queryDistributedResponse',
            'setEditFormObj'
        );
    }

    query() {
        ajaxRequest('/admin/queryQGame', {}, this.queryResponse, 'POST');
    }

    queryOnline(params) {
        ajaxRequest('/admin/queryDistribute', params, this.queryDistributedResponse, 'POST');
    }
}

export default alt.createActions(QueryDistributedAction);
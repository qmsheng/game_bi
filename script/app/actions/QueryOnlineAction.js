/**
 * Created by Administrator on 2016/9/14.
 */
import alt from '../alt';

import {ajaxRequest} from '../utils/Net'

class QueryOnlineAction {
    constructor() {
        this.generateActions(
            'queryResponse',
            'queryOnlineResponse',
            'setEditFormObj'
        );
    }

    query() {
        ajaxRequest('/admin/queryQGame', {}, this.queryResponse, 'POST');
    }

    queryOnline(params) {
        ajaxRequest('/admin/queryOnline', params, this.queryOnlineResponse, 'POST');
    }
}

export default alt.createActions(QueryOnlineAction);
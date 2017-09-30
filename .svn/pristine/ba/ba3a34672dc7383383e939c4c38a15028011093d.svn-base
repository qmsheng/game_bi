/**
 * Created by LiuXiao on 2017/2/16.
 */

import alt from '../alt';

import {ajaxRequest} from '../utils/Net'

class QueryConsumeAction {
    constructor() {
        this.generateActions(
            'queryResponse',
            'queryConsumeResponse',
            'setEditObj'
        );
    }

    query() {
        ajaxRequest('/admin/queryQGame', {}, this.queryResponse, 'POST');
    }

    queryConsume(params) {
        ajaxRequest('/admin/queryConsume', params, this.queryConsumeResponse, 'POST');
    }
}

export default alt.createActions(QueryConsumeAction);

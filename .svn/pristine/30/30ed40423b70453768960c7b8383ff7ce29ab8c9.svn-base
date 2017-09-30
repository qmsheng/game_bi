/**
 * Created by Administrator on 2016/9/14.
 */
import alt from '../alt';

import {ajaxRequest} from '../utils/Net'

class QueryPlayerAction {
    constructor() {
        this.generateActions(
            'queryResponse',
            'queryPlayerResponse'
        );
    }

    query() {
        ajaxRequest('/admin/queryQGame', {}, this.queryResponse, 'POST');
    }

    queryPlayer(params) {
        ajaxRequest('/admin/queryPlayer', params, this.queryPlayerResponse, 'POST');
    }
}

export default alt.createActions(QueryPlayerAction);
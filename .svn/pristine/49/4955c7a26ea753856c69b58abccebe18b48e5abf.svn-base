/**
 * Created by Administrator on 2016/9/14.
 */
import alt from '../alt';

import {ajaxRequest} from '../utils/Net'

class QueryGuardAction {
    constructor() {
        this.generateActions(
            'queryResponse',
            'queryGuardResponse',
            'setEditObj'
        );
    }

    query() {
        ajaxRequest('/admin/queryQGame', {}, this.queryResponse, 'POST');
    }

    queryGuard(params) {
        ajaxRequest('/admin/queryGuard', params, this.queryGuardResponse, 'POST');
    }
}

export default alt.createActions(QueryGuardAction);
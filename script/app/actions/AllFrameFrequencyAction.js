/**
 * Created by qiumaosheng on 2017/08/29.
 */

import alt from '../alt';

import {ajaxRequest} from '../utils/Net'

class AllFrameFrequencyAction {
    constructor() {
        this.generateActions(
            'queryResponse',
            'queryAllFrameFrequencyResponse',
            'setEditFormObj'
        );
    }

    query() {
        ajaxRequest('/admin/queryQGame', {}, this.queryResponse, 'POST');
    }

    queryAllFrameFrequency(params) {
        ajaxRequest('/admin/queryAllPlayerFrameFrequency', params, this.queryAllFrameFrequencyResponse, 'POST');
    }
}

export default alt.createActions(AllFrameFrequencyAction);

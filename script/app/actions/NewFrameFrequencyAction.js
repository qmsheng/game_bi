/**
 * Created by qiumaosheng on 2017/08/29.
 */

import alt from '../alt';

import {ajaxRequest} from '../utils/Net'

class NewFrameFrequencyAction {
    constructor() {
        this.generateActions(
            'queryResponse',
            'queryNewFrameFrequencyResponse',
            'setEditFormObj'
        );
    }

    query() {
        ajaxRequest('/admin/queryQGame', {}, this.queryResponse, 'POST');
    }

    queryNewFrameFrequency(params) {
        ajaxRequest('/admin/queryNewPlayerFrameFrequency', params, this.queryNewFrameFrequencyResponse, 'POST');
    }
}

export default alt.createActions(NewFrameFrequencyAction);

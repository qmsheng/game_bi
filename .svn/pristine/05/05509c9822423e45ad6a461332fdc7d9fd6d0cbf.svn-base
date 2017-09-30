/**
 * Created by Administrator on 2016/9/14.
 */
import alt from '../alt';

import {ajaxRequest} from '../utils/Net'

class FrameFrequencyAction {
    constructor() {
        this.generateActions(
            'queryResponse',
            'FrameFrequencyResponse',
            'setEditObj'
        );
    }

    query() {
        ajaxRequest('/admin/queryQGame', {}, this.queryResponse, 'POST');
    }

    FrameFrequency(params) {
        ajaxRequest('/admin/queryPlayerFrameFrequency', params, this.FrameFrequencyResponse, 'POST');
    }
}

export default alt.createActions(FrameFrequencyAction);
/**
 * Created by Administrator on 2016/9/14.
 */
import alt from '../alt';

import {ajaxRequest} from '../utils/Net'

class PlatformAction {
    constructor() {
        this.generateActions(
            'queryResponse',
            'saveResponse',
            'deleteResponse',
            'showWin',
            'setEditObj'
        );
    }

    query(page) {
        ajaxRequest('/admin/platform', {page:page}, this.queryResponse, 'GET');
    }

    save(platform) {
        if (platform.id == '' || platform.id == 0) {
            ajaxRequest('/admin/platform', platform, this.saveResponse, 'POST');
        } else {
            ajaxRequest('/admin/platform/'+platform.id, platform, this.saveResponse, 'PUT');
        }
    }

    delete(id) {
        ajaxRequest('/admin/platform/'+id, {}, this.deleteResponse, 'DELETE');
    }
}

export default alt.createActions(PlatformAction);
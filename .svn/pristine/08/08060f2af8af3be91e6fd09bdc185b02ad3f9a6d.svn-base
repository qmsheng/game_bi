/**
 * Created by Administrator on 2016/9/14.
 */
import alt from '../alt';

import {ajaxRequest} from '../utils/Net'

class LostReportAction {
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
        ajaxRequest('/admin/lost', {page:page}, this.queryResponse, 'GET');
    }

    save(lost) {
        if (lost.id == '' || lost.id == 0) {
            ajaxRequest('/admin/lost', lost, this.saveResponse, 'POST');
        } else {
            ajaxRequest('/admin/lost/'+lost.id, lost, this.saveResponse, 'PUT');
        }
    }

    delete(id) {
        ajaxRequest('/admin/lost/'+id, {}, this.deleteResponse, 'DELETE');
    }
}

export default alt.createActions(LostReportAction);
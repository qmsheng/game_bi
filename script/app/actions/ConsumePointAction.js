/**
 * Created by LiuXiao on 2017/2/15.
 */

import alt from '../alt';

import {ajaxRequest} from '../utils/Net'

class ConsumePointAction {
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
        ajaxRequest('/admin/consume', {page:page}, this.queryResponse, 'GET');
    }

    save(consume) {
        if (consume.id == '' || consume.id == 0) {
            ajaxRequest('/admin/consume', consume, this.saveResponse, 'POST');
        } else {
            ajaxRequest('/admin/consume/'+consume.id, consume, this.saveResponse, 'PUT');
        }
    }

    delete(id) {
        ajaxRequest('/admin/consume/'+id, {}, this.deleteResponse, 'DELETE');
    }
}

export default alt.createActions(ConsumePointAction);

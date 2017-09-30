/**
 * Created by Administrator on 2016/9/14.
 */
import alt from '../alt';

import {ajaxRequest} from '../utils/Net'

class UserAction {
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
        ajaxRequest('/admin/user', {page:page}, this.queryResponse, 'GET');
    }

    save(user) {
        if (user.id == '' || user.id == 0) {
            ajaxRequest('/admin/user', user, this.saveResponse, 'POST');
        } else {
            ajaxRequest('/admin/user/'+user.id, user, this.saveResponse, 'PUT');
        }
    }

    delete(id) {
        ajaxRequest('/admin/user/'+id, {}, this.deleteResponse, 'DELETE');
    }
}

export default alt.createActions(UserAction);
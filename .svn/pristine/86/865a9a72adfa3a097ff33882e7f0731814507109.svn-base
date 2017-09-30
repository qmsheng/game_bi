/**
 * Created by Administrator on 2016/9/14.
 */
import alt from '../alt';

import {ajaxRequest} from '../utils/Net'

class MenuAction {
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
        ajaxRequest('/admin/menu', {page:page}, this.queryResponse, 'GET');
    }

    save(menu) {
        if (menu.id == '' || menu.id == 0) {
            ajaxRequest('/admin/menu', menu, this.saveResponse, 'POST');
        } else {
            ajaxRequest('/admin/menu/'+menu.id, menu, this.saveResponse, 'PUT');
        }
    }

    delete(id) {
        ajaxRequest('/admin/role/'+id, {}, this.deleteResponse, 'DELETE');
    }
}

export default alt.createActions(MenuAction);
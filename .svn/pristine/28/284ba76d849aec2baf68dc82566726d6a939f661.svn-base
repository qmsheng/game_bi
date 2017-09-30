/**
 * Created by Administrator on 2016/9/14.
 */
import alt from '../alt';
import MenuAction from "../actions/MenuAction";

class MenuStore {
    constructor() {
        this.bindActions(MenuAction);
        this.menus = [];
        this.parent_menus = [];
        this.menu = {menu_name:'',id:'',url:'',icon:'',parent_id:'0', description:''};
        this.showWin = false;
    }

    onSetEditObj(obj) {
        this.menu = obj;
    }

    onShowWin(show) {
        this.showWin = show;
    }

    onSaveResponse(data) {
        if (data.result == 0) {
            MenuAction.query(this.menus.current_page);
            this.showWin = false;
        }
    }

    onQueryResponse(data) {
        this.menus = data.data.menus;
        this.parent_menus =  data.data.parent_menus;
        this.menu={menu_name:'',id:'',url:'',icon:'',parent_id:'0', description:''};
    }

    onDeleteResponse(data) {
        if (data.result == 0) {
            MenuAction.query(this.menus.current_page);
        }
    }
}

export default alt.createStore(MenuStore);

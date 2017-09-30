/**
 * Created by Administrator on 2016/9/14.
 */
import alt from '../alt';
import UserAction from "../actions/UserAction";
import moment from 'moment';
class UserStore {
    constructor() {
        this.bindActions(UserAction);
        this.users=[];
        this.roles=[];
        this.user = {username:'',display_name:'',email:'',qq:'',id:'', roles:[],role_ids:[]}
        this.showWin = false;
    }

    onSetEditObj(obj) {
        this.user = obj;
    }

    onShowWin(show) {
        this.showWin = show;
    }

    onSaveResponse(data) {
        if (data.result == 0) {
            UserAction.query(this.users.current_page ? this.users.current_page : 1);
        }
        this.showWin = false;
    }

    onQueryResponse(data) {
        this.users = data.data.users;
        this.roles = data.data.roles;
        this.user={username:'',display_name:'',email:'', qq:'',id:'', roles:[],role_ids:[]}
    }

    onDeleteResponse(data) {
        if (data.result == 0) {
            UserAction.query(this.users.current_page ? this.users.current_page : 1);
        }
    }
}

export default alt.createStore(UserStore);

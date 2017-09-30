/**
 * Created by Administrator on 2016/9/13.
 */
import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Left extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    componentDidMount() {

    }


    render() {
        let menus = this.props.menus.map(function(menu, index){
            return (<Link to={menu.url} key={"left-icon-menu-"+index} className={index == this.props.selected ? "active item" : "item"}>
                <i className={menu.icon}></i>
                <span>{menu.menu_name}</span>
            </Link>);
        }.bind(this));
        return (
            <div className="z-left">
                <div className="ui mini inverted compact vertical labeled icon menu">
                    {menus}
                </div>
            </div>
        );
    }
}
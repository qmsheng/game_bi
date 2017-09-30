/**
 * Created by Administrator on 2016/9/13.
 */
import React, {Component} from 'react';
import {Link} from 'react-router';

export default class SubMenu extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    componentDidMount() {

    }


    render() {
        if (this.props.menu == null ||  this.props.menu.menus.length == 0) {
            return <div className="z-left-sub-hidden"></div>;
        }

        let menus = this.props.menu.menus.map(function(menu, index){
            return (<Link key={"sub-menu-"+index} to={menu.url} className={index == this.props.selected ? "active item" : "item"}>
                <i className={menu.icon}></i>
                <span>{menu.menu_name}</span>
            </Link>);
        }.bind(this));
        return (
            <div className="z-left-sub">
                <div className="ui secondary vertical menu">
                    <header className="header item">
                        {this.props.menu.menu_name}
                        <p>{this.props.menu.desc}</p>
                    </header>
                    {menus}
                </div>
            </div>
        );
    }
}
/**
 * Created by Administrator on 2016/9/13.
 */
import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';

export default class Page extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    render() {
        let current_page = this.props.page;
        let page_max = this.props.max;

        let pages = new Array(page_max);
        for(let i = 1; i <= page_max; i++) {
            if (i > current_page - 5 && i < current_page + 5)
                pages.push(i);
            else if (i == current_page)
                pages.push(i);

        }
        let pageinfo = pages.map(function(page, index){
            return (<a className={this.props.page == page ? "active item" : "item"} onClick={this.props.handleClickPage.bind(this, page)}><span>{page}</span></a>);
        }.bind(this));
        return (
            <div className="ui right floated pagination menu">
                <a className="icon item" onClick={this.props.handleClickPage.bind(this, current_page == 1 ? 1 : current_page - 1)}>
                    <i className="left chevron icon"></i>
                </a>
                {pageinfo}
                <a className="icon item" onClick={this.props.handleClickPage.bind(this, current_page == page_max ? page_max : current_page + 1)}>
                    <i className="right chevron icon"></i>
                </a>
            </div>
        );
    }
}
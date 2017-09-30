/**
 * Created by Administrator on 2016/9/13.
 */
import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';

import DataTable from "../components/DataTable";

import DatePicker from 'react-datepicker';
import moment from 'moment';

require('react-datepicker/dist/react-datepicker.css');

export default class BiForm extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    componentDidMount() {
        $('.ui.dropdown')
            .dropdown()
        ;
    }

    render() {
        let inputs = [];
        let form = this.props.config;
        let items = [];
        if (form && form.fields && form.fields.length > 0 && form.data) {
            let fields = form.fields;
            let data = form.data;

            let row = {};
            let rowStart = false;
            let rowEnd = false;

            for (var i = 0; i < fields.length; i++) {
                let item = {};

                if (fields[i].type == 'row') {
                    rowStart = true;
                    row = fields[i];
                    continue;
                }
                if (fields[i].type == 'erow') {
                    rowEnd = true;
                }
                if (rowStart && rowEnd) {
                    items.push(
                        <div className={row.styles ? row.styles : 'fields'}>
                            {inputs}
                        </div>
                        );
                    rowStart = false;
                    rowEnd = false;
                    row = {};
                    inputs = [];
                    continue;
                }
                if (fields[i].type == 'text') {
                    item = (
                        <input onChange={ form.input.bind(this, fields[i].fieldName, "") } value={data[fields[i].fieldName]} type="text" placeholder={fields[i].label} />
                    );
                } else if (fields[i].type == 'select') {
                    let ops = [];
                    let selectText = '';
                    if (fields[i].selectall) {
                        ops.push(<div className="item" onClick={form.input.bind(this, fields[i].fieldName, 0)} data-value="0">所有</div>);
                        selectText = '所有';
                    }
                    for (var j = 0; j < fields[i].options.data.length; j++) {
                        if (fields[i].options.ref && form.data[fields[i].options.ref] != fields[i].options.data[j][fields[i].options.ref])
                            continue;
                        if (fields[i].options.data[j][fields[i].options.key] == data[fields[i].fieldName]) {
                            selectText = fields[i].options.data[j][fields[i].options.val];
                            ops.push(
                                <div className="item active selected" onClick={form.input.bind(this, fields[i].fieldName, fields[i].options.data[j][fields[i].options.key])} data-value={ fields[i].options.data[j][fields[i].options.key] }> { fields[i].options.data[j][fields[i].options.val] }</div>
                            );
                        } else {
                            ops.push(
                                <div className="item" onClick={form.input.bind(this, fields[i].fieldName, fields[i].options.data[j][fields[i].options.key])} data-value={ fields[i].options.data[j][fields[i].options.key] }> { fields[i].options.data[j][fields[i].options.val] }</div>
                            );
                        }
                    }
                    item = (<div className="ui selection dropdown">
                        <input type="hidden" />
                        <i className="dropdown icon"></i>
                        <div className="text">{selectText}</div>
                        <div className="menu">
                            {ops}
                        </div>
                    </div>);
                }else if (fields[i].type == 'multiselect') {
                    let ops = [];
                    let selectText = [];
                    let selectVal = '';
                    for (var j = 0; j < fields[i].options.data.length; j++) {
                        if (fields[i].options.ref && form.data[fields[i].options.ref] != fields[i].options.data[j][fields[i].options.ref])
                            continue;
                        let found = false;
                        for(let n = 0; n < form.data[fields[i].fieldName].length; n++) {
                            if (form.data[fields[i].fieldName][n] == fields[i].options.data[j][fields[i].options.key]) {
                                selectText.push(<a className="ui label transition visible" data-value={fields[i].options.data[j][fields[i].options.key]}>{ fields[i].options.data[j][fields[i].options.val] }<i onClick={form.multiremove.bind(this,fields[i].fieldName, fields[i].options.data[j][fields[i].options.key])} className="delete icon"></i></a>);
                                found = true;
                                break;
                            }
                        }
                        if (found) {
                            ops.push(
                                <div className="item active filtered" data-value={ fields[i].options.data[j][fields[i].options.key] }> { fields[i].options.data[j][fields[i].options.val] }</div>
                            );
                        } else {
                            ops.push(
                                <div className="item" onClick={form.multiselect.bind(this,fields[i].fieldName, fields[i].options.data[j][fields[i].options.key])} data-value={ fields[i].options.data[j][fields[i].options.key] }> { fields[i].options.data[j][fields[i].options.val] }</div>
                            );
                        }
                    }
                    if (selectText.length == 0)
                        selectText.push(<div></div>);
                    if (ops.length == 0)
                        ops.push(<div></div>);
                    item = (
                        <div className="ui multiple selection dropdown">
                            <input type="hidden" name="multiple_selection" />
                            <i className="dropdown icon"></i>
                            {selectText}
                            <div className="menu">
                                {ops}
                            </div>
                        </div>
                    );

                }else if (fields[i].type == 'textarea') {
                    item = (<textarea rows={fields[i].options.row} onChange={form.input.bind(this, fields[i].fieldName, "")}></textarea>);
                } else if (fields[i].type == 'submit') {
                    item = (<button className={fields[i].btstyles ? fields[i].btstyles : 'ui button'} type="submit" onClick={fields[i].options.handleClick.bind(this)}>{fields[i].options.text}</button>);
                } else if (fields[i].type == 'datatable') {
                    item = (<DataTable title={fields[i].label} config={fields[i].table} />);
                } else if ('checkboxs' == fields[i].type) {
                    let ops = [];
                    for(let n = 0; n < fields[i].options.data.length; n++) {
                        if (fields[i].options.ref && fields[i].options.data[n][fields[i].options.ref] != form.data[fields[i].options.ref])
                            continue;
                        ops.push(
                            <div className="ui checkbox">
                                <input type="checkbox" onClick={ fields[i].options.check.bind(this, fields[i].options.data[n][fields[i].options.key])} />
                                <label>{fields[i].options.data[n][fields[i].options.title]}</label>
                            </div>
                        );
                    }
                    item = (<div>{ops}</div>);
                } else if (fields[i].type == 'datepicker') {
                    item = (
                        //<div className="ui calendar" id={fields[i].fieldName}>
                        //    <div className="ui input left icon">
                        //        <i className="calendar icon"></i>
                        //        <input type="text" placeholder="日期" />
                        //    </div>
                        //</div>
                        <DatePicker
                            dateFormat="YYYY-MM-DD"
                            selected={data[fields[i].fieldName]}
                            onChange={fields[i].options.change.bind(this)}
                        />
                    );
                    //$('#'+fields[i].fieldName).calendar({
                    //    type:'date',
                    //    onChange:fields[i].options.change,
                    //    formatter: {
                    //        date: function (date, settings) {
                    //            if (!date) return '';
                    //            let day = date.getDate();
                    //            let month = date.getMonth() + 1;
                    //            let year = date.getFullYear();
                    //            return year + '-' + (month < 10 ? '0'+month : month) + '-' + (day < 10 ? '0'+day : day);
                    //        }
                    //    }
                    //}).bind(this);
                } else if (fields[i].type=='datetimepicker') {
                    item = (
                        <div className="ui calendar" id={fields[i].fieldName}>
                            <div className="ui input left icon">
                                <i className="calendar icon"></i>
                                <input type="text" ref={fields[i].fieldName} placeholder={fields[i].label} />
                            </div>
                        </div>
                    );
                }
                if (fields[i].label == '') {
                    inputs.push(
                        <div className="field">
                            {item}
                        </div>
                    );
                } else {
                    inputs.push(
                        <div className={fields[i].styles ? fields[i].styles : "field"}>
                            <label>{fields[i].label}</label>
                            {item}
                        </div>
                    );
                }


                if (!rowStart && !rowEnd) {
                    items.push(
                        <div className='fields'>
                            {inputs}
                        </div>
                    );
                    inputs = [];
                }
            }
        }
        let msg = <div></div>;
        if (form.data.error && form.data.error !== '') {
            if (form.data.error != 0) {
                msg = (
                    <div className="ui error message">
                        <div className="header">出错了！！！</div>
                        <p><FormattedMessage id={'ERROR_'+form.data.error} defaultMessage='有错误' /></p>
                    </div>
                );
            } else {
                msg = (
                    <div className="ui success message">
                        <div className="header">操作成功。</div>
                    </div>
                );
            }
        }
        return (
            <div className={form.styles ? form.styles : "ui form"}>
                {msg}
                {items}
            </div>
        );
    }
}
'use strict';

import {Table, Column, Cell} from 'fixed-data-table';
import {Columns, SortOrder} from '../Constants';
import Sort from '../data/Sort';
import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import moment from 'moment';
import 'fixed-data-table/dist/fixed-data-table.min.css';

class MoviesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableWidth  : 400,
      tableHeight : 400
    };
    this.mounted = false;
  }
  
  componentDidMount() {
    this.mounted = true;
    var win = window;
    if (win.addEventListener) {
      win.addEventListener('resize', _.throttle(this._update.bind(this), 250), false);
    } else if (win.attachEvent) {
      win.attachEvent('onresize', _.throttle(this._update.bind(this), 250));
    } else {
      win.onresize = this._update.bind(this);
    }
    this._update();
  }

  componentWillReceiveProps(props) {
    this._update();
  }
  
  componentWillUnmount() {
    this.mounted = false;
    var win = window;
    if (win.removeEventListener) {
      win.removeEventListener('resize', _.throttle(this._update.bind(this), 250), false);
    } else if(win.removeEvent) {
      win.removeEvent('onresize', _.throttle(this._update.bind(this), 250), false);
    } else {
      win.onresize = null;
    }
  }

  _update() {
    if (this.mounted) {
      var node = ReactDOM.findDOMNode(this);
      this.setState({
        tableWidth  : node.clientWidth,
        tableHeight : node.clientHeight
      });
    }
  }

  render() {
    let columns = Object.values(Columns).sort((a, b) => {
      let result = 0;
      if (a.order < b.order) { result = -1; }
      else if (a.order > b.order) { result = 1; }
      return result;
    });
    let movies = this.props.movies.toList();
    let sortOrder = this.props.sort.get('order');
    return (
      <div className="data-table-container">
      <Table
        rowHeight={50}
        rowsCount={movies.size}
        headerHeight={50}
        width={this.state.tableWidth}
        height={this.state.tableHeight}>
        { 
          columns.map(column => {
            return (
              <Column
                key={column.id}
                columnKey={column.id}
                header={
                  <Cell>
                    <a onClick={() => {
                      this.props.onSort(new Sort({
                        columm: column,
                        order: (
                         (this.props.sort.get('column').id == column.id) 
                           ? (this.props.sort.get('order') == SortOrder.DESC ? SortOrder.ASC : SortOrder.DESC) 
                           : this.props.sort.get('order')
                        )
                      }))
                    }}>
                      {column.label} 
                      {(this.props.sort.get('column').id == column.id) 
                       ? (this.props.sort.get('order') == SortOrder.DESC ? '↓' : '↑') 
                       : ''
                      }
                    </a>
                  </Cell>
                }
                cell={ ({ rowIndex, ...props }) => {
                  let label = movies.get(rowIndex).get(column.id);
                  switch (column.id) {
                    case 'lockIn':
                      label = moment(label).format('YYYY-MM-DD');
                      break;
                  }
                  return (
                    <Cell>{label}</Cell>
                  );
                } }
                width={100}
              />
            );
          })
        }
      </Table>
      </div>
    );
  }
}

export default MoviesView;

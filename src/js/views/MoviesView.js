'use strict';

import {Table, Column, Cell} from 'fixed-data-table';
import {Columns, SortOrder} from '../Constants';
import React from 'react';

class MoviesView extends React.Component {
  constructor(props) {
    super(props);
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
      <Table
        rowHeight={50}
        rowsCount={movies.size}
        headerHeight={50}
        width={1000}
        height={500}>
        { 
          columns.map(column => {
            return (
              <Column
                key={column.id}
                columnKey={column.id}
                header={
                  <Cell>
                    <a onClick={() => {
                      this.props.onSort({
                        columm: column,
                        order: (
                         (this.props.sort.get('column').id == column.id) 
                           ? (this.props.sort.get('order') == SortOrder.DESC ? SortOrder.ASC : SortOrder.DESC) 
                           : this.props.sort.get('order')
                        )
                      })
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
                  return (
                    <Cell>
                      {movies.get(rowIndex).get(column.id)}
                    </Cell>
                  );
                } }
                width={100}
              />
            );
          })
        }
      </Table>
    );
  }
}

export default MoviesView;

'use strict';

import {Table, Column, Cell} from 'fixed-data-table';
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
                columnKey={column.id}
                header={
                  <Cell {...props}>
                    <a onClick={() => {
                      this.props.onSort({
                        columm: column,
                        order: (
                         this.props.sort.get('column').get('id') == column.id 
                           ? (this.props.sort.get('order') === SortTypes.DESC ? SortTypes.ASC : SortType.DESC) 
                           : this.props.sort.get('order')
                        )
                      })
                    }}>
                      {column.label} 
                      {this.props.sort.get('column').get('id') == column.id 
                       ? (sortDir === SortTypes.DESC ? '↓' : '↑') 
                       : ''
                      }
                    </a>
                  </Cell>
                }
                cell={ ({ rowIndex, ...props }) => {
                  return (
                    <Cell {...props}>
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

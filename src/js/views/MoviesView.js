'use strict';

import {Table, Column, Cell} from 'fixed-data-table';
import {ControlLabel, 
        Button,
        OverlayTrigger,
        Tooltip,
        Checkbox} from 'react-bootstrap';
import {Columns, SortOrder} from '../Constants';
import Sort from '../data/Sort';
import React from 'react';
import ReactDOM from 'react-dom';
import FontAwesome from 'react-fontawesome';
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

  onToggleWatch(movie) {
    if (movie.get('watched')) {
      this.props.onUnwatch(movie);
    } else {
      this.props.onWatch(movie);
    }
  }

  onRefresh(movieId) {
    this.props.onRefresh(movieId, this.props.sort);
  }

  onRefreshAll() {
    this.props.movies.map(movie => {
      this.props.onRefresh(movie._id, this.props.sort);
    });
  }

  render() {
    let onSort = this.props.onSort.bind(this);
    let onToggleWatch = this.onToggleWatch.bind(this);
    let onRefresh = this.onRefresh.bind(this);
    let onRefreshAll = this.onRefreshAll.bind(this);
    let columns = Object.values(Columns).sort((a, b) => {
      let result = 0;
      if (a.order < b.order) { result = -1; }
      else if (a.order > b.order) { result = 1; }
      return result;
    });
    let movies = this.props.movies.toList();
    let sortOrder = this.props.sort.get('order');

    let width = (column) => { 
      switch (column) {
        case Columns.TITLE:
          return 150;
        case Columns.REFRESH:
          return 150;
        default: 
          return 100;
      }
    };
    let align = (column) => {
      switch (column) {
        case Columns.TITLE:
          return 'left';
        case Columns.CURRENT_VALUE:
        case Columns.WEEK_HIGH:
        case Columns.WEEK_LOW:
        case Columns.MONTH_HIGH:
        case Columns.MONTH_LOW:
        case Columns.SEASON_HIGH:
        case Columns.SEASON_LOW:
        case Columns.YEAR_HIGH:
        case Columns.YEAR_LOW: 
        case Columns.TREND: 
        case Columns.TREND_PCT: 
        case Columns.VOLUME:
        case Columns.HELD_LONG:
        case Columns.HELD_SHORT:
          return 'right';
        default: 
          return 'center';
      }
    };
    let label = (movie, column) => {
      if ((column != Columns.WATCHED) 
           && (column != Columns.REFRESH) 
           && !movie.get(column.id)) {
        return '';
      }
      switch (column) {
        case Columns.LOCK_IN:
          return (
            <label>{moment(movie.get('lockIn')).format('YYYY-MM-DD')}</label>
          );
        case Columns.WIKI:
          return (
            <a href={movie.get('wiki')} target="_new">
              <label>Wiki&nbsp;</label>
              <FontAwesome name="external-link" />
            </a>
          );
        case Columns.HSX_SYMBOL:
          return (
            <a href={movie.get('hsxUrl')} target="_new">
              <label>{movie.get('hsxSymbol')}&nbsp;</label>
              <FontAwesome name="external-link" />
            </a>
          );
        case Columns.CURRENT_VALUE:
        case Columns.WEEK_HIGH:
        case Columns.WEEK_LOW:
        case Columns.MONTH_HIGH:
        case Columns.MONTH_LOW:
        case Columns.SEASON_HIGH:
        case Columns.SEASON_LOW:
        case Columns.YEAR_HIGH:
        case Columns.YEAR_LOW: {
          let price = movie.get(column.id).toFixed(2);
          let className = "price";
          let icon = 'arrow-up';
          if (price < 0.0) {
            price = Math.abs(price);
            className = "price-negative";
            icon = 'arrow-down';
          }
          return (
            <label className={className}>{price.toLocaleString('en', {useGrouping: true})}</label>
          );
        }
        case Columns.TREND: {
          let priceChange = movie.get(column.id).toFixed(2);
          let iconClassName = "change";
          let labelClassName = "change price-change";
          let icon = 'arrow-up';
          if (priceChange < 0.0) {
            priceChange = Math.abs(priceChange);
            iconClassName = "change-negative";
            labelClassName = "change-negative price-change-negative";
            icon = 'arrow-down';
          }
          return (
            <span>
              <FontAwesome name={icon} className={iconClassName} />
              <label className={labelClassName}>{priceChange.toLocaleString('en', {useGrouping: true})}</label>
            </span>
          );
        }
        case Columns.TREND_PCT: {
          let percentChange = movie.get(column.id);
          let iconClassName = "change";
          let labelClassName = "change percent-change";
          let icon = 'arrow-up';
          if (percentChange < 0.0) {
            percentChange = Math.abs(percentChange);
            iconClassName = "change-negative";
            labelClassName = "change-negative percent-change-negative";
            icon = 'arrow-down';
          }
          return (
            <span>
              <FontAwesome name={icon} className={iconClassName} />
              <label className={labelClassName}>{percentChange.toLocaleString('en', {useGrouping: true})}</label>
            </span>
          );
        }
        case Columns.VOLUME:
        case Columns.HELD_LONG:
        case Columns.HELD_SHORT:
          return (
            <label className="volume">{movie.get(column.id).toLocaleString('en', {useGrouping: true})}</label>
          );

        case Columns.WATCHED:
          return (
            <OverlayTrigger placement="top" overlay={
              <Tooltip id="watchTT-{movie.get('_id')}" placement="top">
                {movie.get('watched') ? 'Unwatch' : 'Watch'}
              </Tooltip>
            }>
              <Button className="btn-watch" onClick={() => { onToggleWatch(movie); }}>
                <Checkbox checked={movie.get('watched')}
                          onChange={() => { onToggleWatch(movie); }}>
                </Checkbox>
              </Button>
            </OverlayTrigger>
          );
        case Columns.REFRESH: {
          let duration = moment.duration(moment().diff(moment(movie.refresh)));
          let age = ""; 
          age += ( parseInt(duration.asDays()) ) + "d ";
          age += ( parseInt(duration.asHours()) % 24 ) + "h ";
          age += ( parseInt(duration.asMinutes()) % 60 ) + "m ";
          return (
            <span>
              <label>{age}</label>
              <OverlayTrigger placement="top" overlay={
                <Tooltip id="refreshTT-{movie.get('_id')}" placement="top">
                  Refresh from hsx.com
                </Tooltip>
              }>
                <Button className="btn-refresh" 
                        disabled={movie.get('refreshing')}
                        onClick={() => { onRefresh(movie.get('_id')); }}>
                  <FontAwesome name="refresh" spin={movie.get('refreshing')} />
                </Button>
              </OverlayTrigger>
            </span>
          );
        }
        default: 
          return (<label>{movie.get(column.id)}</label>);
      }
    };
    let header = (column) => {
      switch (column) {
        case Columns.REFRESH:
          return (
            <span>
              <label>Age</label>
              <OverlayTrigger placement="top" overlay={
                <Tooltip id="refreshAllTT" placement="top">
                  Refresh All
                </Tooltip>
              }>
                <Button className="btn-refresh" 
                        onClick={() => { onRefreshAll(); }}>
                  <FontAwesome name="refresh" />
                </Button>
              </OverlayTrigger>
            </span>
          );
        default: 
          return (<label>{column.label}</label>);
      }
    };
    let fixed = (column) => {
      switch (column) {
        case Columns.TITLE:
        case Columns.LOCK_IN:
          return true;
        default: 
          return false;
      }
    }

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
                      onSort(new Sort({
                        column: column,
                        order: (
                          (this.props.sort.get('column') == column) 
                          ? ((this.props.sort.get('order') == SortOrder.DESC)
                              ? SortOrder.ASC 
                              : SortOrder.DESC) 
                           : this.props.sort.get('order')
                        )
                      }));
                    }}>
                      {(this.props.sort.get('column').id == column.id) 
                       ? (this.props.sort.get('order') == SortOrder.DESC ? '↓' : '↑') 
                       : ''
                      }
                      {header(column)} 
                    </a>
                  </Cell>
                }
                cell={ ({ rowIndex, ...props }) => {
                  return (
                    <Cell {...props}>{label(movies.get(rowIndex), column)}</Cell>
                  );
                } }
                width={width(column)}
                align={align(column)}
                fixed={fixed(column)}
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

'use strict';

import React from 'react';
import {Categories, TimeFilters, Dates} from '../Constants';
import {Panel, 
        Form, 
        FormGroup, 
        ControlLabel, 
        FormControl, 
        Button,
        Checkbox,
        InputGroup,
        OverlayTrigger,
        Popover} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';
import 'react-bootstrap-daterangepicker/css/daterangepicker.css';

class FilterView extends React.Component {
  filter(filter) {
    this.props.onFilter(filter, this.props.sort);
  }

  onCategoryChange(value) {
    this.filter(this.props.filter.set('category', value.target.value))
  }

  onLockInEvent(event, picker) {
    if (event.type === "apply") {
      this.filter(this.props.filter.set('startDate', picker.startDate.toDate())
                                   .set('endDate', picker.endDate.toDate()));
    }
  }

  onWatchedChange(watched) {
    this.filter(this.props.filter.set('watched', watched));
  }

  onReload() {
    this.filter(this.props.filter);
  }

  render() {
    let start = moment(this.props.filter.get('startDate'));
    let end = moment(this.props.filter.get('endDate'));
    let label = start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD');
    let ranges = {
      'Today' : [ moment(), moment() ],
      'Next 7 Days' : [ moment(), moment().add(6, 'days') ],
      'This Month' : [ moment().startOf('month'), moment().endOf('month') ],
      'Next 3 Months' : [ moment(), moment().add(3, 'months') ],
      'All' : [ moment(Dates.StartDate), moment(Dates.EndDate) ]
    }
    let onCategoryChange = this.onCategoryChange.bind(this);
    let onLockInEvent = this.onLockInEvent.bind(this);
    let onWatchedChange = this.onWatchedChange.bind(this);
    let onReload = this.onReload.bind(this);
    return (
      <Panel bsStyle="primary">
        <Form id="filterForm" inline>
          <FormGroup controlId="category" id="categoryFilter">
            <InputGroup>
              <InputGroup.Addon><ControlLabel>Category</ControlLabel></InputGroup.Addon>
              <FormControl componentClass="select" 
                           placeholder={this.props.filter.get('category')} 
                           onChange={onCategoryChange}>
                <option value="">All</option>
                <option value={Categories.Blockbuster}>Blockbuster</option>
                <option value={Categories.Arthouse}>Arthouse</option>
              </FormControl>
            </InputGroup>
          </FormGroup>
          <FormGroup controlId="lockIn" id="lockInFilter">
            <InputGroup>
              <InputGroup.Addon><ControlLabel>Lock&#45;in</ControlLabel></InputGroup.Addon>          
              <DateRangePicker startDate={start} 
                               endDate={end} 
                               ranges={ranges} 
                               onEvent={onLockInEvent}>
                <Button>
                  <div className="pull-left"><FontAwesome name="calendar" /></div>
                  <div className="pull-right">
                    <span>{label}</span>
                    <span className="caret"></span>
                  </div>
                </Button>
              </DateRangePicker>
            </InputGroup>
          </FormGroup>
          <FormGroup controlId="watched" id="watchedFilter">
            <Button onClick={() => { onWatchedChange(!this.props.filter.get('watched')) }}>
              <Checkbox checked={this.props.filter.get('watched')}
                        onClick={value => { onWatchedChange(value.target.value == 'on') }}>
              </Checkbox>
              <ControlLabel>Watched</ControlLabel>
            </Button>
          </FormGroup>
          <FormGroup controlId="reload" id="filterReload">
            <Button bsStyle="primary" 
                    disabled={this.props.filtering}
                    onClick={onReload}>
              <ControlLabel>{this.props.filtering ? "Reloading" : "Reload"}</ControlLabel>
            </Button>
          </FormGroup>
        </Form>
        <ul className="pull-right site-links">
          <li>
            <OverlayTrigger trigger="click" rootClose placement="left" overlay={
              <Popover id="aboutHsx">
                <p>The Hollywood Stock Exchange (<a href="http://hsx.com" target="_new">hsx.com</a>) is a site where &quot;MovieStocks&quot; are traded in an open marketplace before the film is shown in theaters.</p>
                <p>The price of a MovieStock reflects how much money Traders think the film will make with each $1 million earned domestically equal to H$1 in HSX money. For example, if a MovieStock is priced at H$10, it means that traders expect the film to make $10 million in its first four weeks in wide release, or twelve weeks of limited release.</p>
              </Popover>
            }>
              <a href="#">What is HSX?</a>
            </OverlayTrigger></li>
          <li><a href="https://github.com/bobalu113/hsx-data/issues" target="_new">Report Issues</a></li>
          <li><a href="https://github.com/bobalu113/hsx-data" target="_new">View on GitHub</a></li>
        </ul>
      </Panel>
    );
  }
}

export default FilterView;

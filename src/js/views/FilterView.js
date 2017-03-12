'use strict';

import React from 'react';
import {Categories, TimeFilters, Dates} from '../Constants';
import {Panel, 
        Form, 
        FormGroup, 
        ControlLabel, 
        FormControl, 
        Button} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';
import 'react-bootstrap-daterangepicker/css/daterangepicker.css';

class FilterView extends React.Component {

  onCategoryChange(value) {
    this.props.onFilter(this.props.filter.set('category', value));
  }

  onLockInEvent(event, picker) {
    if (event.type === "apply") {
      this.props.onFilter(this.props.filter.set('startDate', picker.startDate.toDate())
                                           .set('endDate', picker.endDate.toDate()));
    }
  }

  render() {
    let start = moment(this.props.filter.get('startDate'));
    let end = moment(this.props.filter.get('endDate'));
    let label = start.format('YYYY-MM-DD'); + ' to ' + end.format('YYYY-MM-DD');;
    if (start === end) {
      label = start;
    }
    let ranges = {
      'Today' : [ moment(), moment() ],
      'Next 7 Days' : [ moment(), moment().add(6, 'days') ],
      'This Month' : [ moment().startOf('month'), moment().endOf('month') ],
      'Next 3 Months' : [ moment(), moment().add(3, 'months') ],
      'All' : [ moment(Dates.StartDate), moment(Dates.EndDate) ]
    }
    let onCategoryChange = this.onCategoryChange.bind(this);
    let onLockInEvent = this.onLockInEvent.bind(this);
    return (
      <Panel bsStyle="primary">
        <Form inline>
          <FormGroup controlId="category">
            <ControlLabel>Category</ControlLabel>
            <FormControl componentClass="select" 
                         placeholder={this.props.filter.category} 
                         onChange={onCategoryChange}>
              <option value="">All</option>
              <option value={Categories.Blockbuster}>Blockbuster</option>
              <option value={Categories.Arthouse}>Arthouse</option>
            </FormControl>
          </FormGroup>
          <FormGroup controlId="lockIn">
            <ControlLabel>Lock&#45;in</ControlLabel>
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
          </FormGroup>
          <FormGroup>
          </FormGroup>
        </Form>
      </Panel>
    );
  }
}

export default FilterView;

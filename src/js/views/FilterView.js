'use strict';

import React from 'react';
import {Panel, Form, FormGroup, ControlLabel, FormControl, Radio} from 'react-bootstrap';
import {Categories, TimeFilters} from '../Constants';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class FilterView extends React.Component {

  changeCategory(value) {
    let filter = this.props.filter;
    if ((value == null) || (value == "")) {
      filter = filter.delete('category');
    } else {
      filter = filter.set('category', value);
    }
    this.props.onFilter(filter);
  }

  changeTimeFilter(value) {
    this.props.onFilter(this.props.filter.set('timeFilter', value));
  }

  changeStartDate(value) {
    this.props.onFilter(this.props.filter.set('startDate', value));
  }

  changeEndDate(value) {
    this.props.onFilter(this.props.filter.set('endDate', value));
  }

  render() {
    let getMoment = (date) => {
      return moment(date);
    };
    return (
      <Panel bsStyle="primary">
        <Form inline>
          <FormGroup controlId="category">
            <ControlLabel>Category</ControlLabel>
            <FormControl componentClass="select" placeholder={this.props.filter.category} onChange={this.changeCategory}>
              <option value="">All</option>
              <option value={Categories.Blockbuster}>Blockbuster</option>
              <option value={Categories.Arthouse}>Arthouse</option>
            </FormControl>
          </FormGroup>
          <FormGroup controlId="timeFilter" placeholder={this.props.filter.timeFilter}>
            <ControlLabel>Lock&#45;in</ControlLabel>
            <Radio name="timeFilter" value={TimeFilters.ANY} inline >Any</Radio>
            <Radio name="timeFilter" value={TimeFilters.WEEK} inline >This Week</Radio>
            <Radio name="timeFilter" value={TimeFilters.CUSTOM} inline>
              <span>
              Between
              <DatePicker value={getMoment(this.props.filter.startDate)} />
              and
              <DatePicker selected={getMoment(this.props.filter.endDate)} />
              </span>
            </Radio>
          </FormGroup>
          <FormGroup>
          </FormGroup>
        </Form>
      </Panel>
    );
  }
}

export default FilterView;

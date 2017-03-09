'use strict';

import React from 'react';
import {Panel, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {DatePicker} from 'react-bootstrap-date-picker';

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
            <ControlLabel>Lock-in</ControlLabel>
            <Radio value={TimeFilters.ANY} inline >Any</Radio>
            <Radio value={TimeFilters.WEEK} inline >This Week</Radio>
            <Radio value={TimeFilters.CUSTOM} inline>
              Between
              <DatePicker value={this.props.filter.startDate} />
              and
              <DatePicker value={this.props.filter.endDate} />
            </Radio>
          </FormGroup>
        </Form>
      </Panel>
    );
  }
}

export default FilterView;

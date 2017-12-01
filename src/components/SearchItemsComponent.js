import React, { Component } from "react";
import PropTypes from "prop-types";
import { Input, Button, Grid, Dropdown } from "semantic-ui-react";
import SearchConditions from "./searchConditions";
import _ from "lodash";
import uuidv4 from "uuid/v4";

class SearchItemsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conditions: [],
      where: { 0: { col: "name", operator: "LIKE", value: "" } },
    };
    this.lastInputChangeRequest = null;
  }

  onInputChanged = () => {
    clearTimeout(this.lastInputChangeRequest);
    this.lastInputChangeRequest = setTimeout(() => {
      if (this.state.conditions.length !== 0 || this.state.where[0].value !== "")
        console.log("WHERE: ", this.state.where);
      this.props.onResult(_.toArray(this.state.where));
    }, 500);
  };

  addCondition = (e, data) => {
    const conditions = this.state.conditions;
    const key = uuidv4();
    conditions.push({ condition: SearchConditions[data.value], key });
    this.setState({ conditions });
  };

  removeCondition = key => {
    const conditions = this.state.conditions;
    const where = this.state.where;
    _.remove(conditions, cond => cond.key === key);
    delete where[key];
    this.setState({ conditions, where }, this.onInputChanged());
  };

  renderCondition = (Condition, i) => {
    return (
      <Grid.Row key={i}>
        <Grid.Column>
          <Button
            icon="remove circle"
            color="red"
            onClick={() => {
              this.removeCondition(i);
            }}
          />
        </Grid.Column>
        <Condition
          onSubmit={value => {
            const where = this.state.where;
            where[i] = value;
            this.setState({ where }, this.onInputChanged());
          }}
        />
      </Grid.Row>
    );
  };

  displaySearchConditions = () => {
    const names = [];
    _.forEach(SearchConditions, (condition, key) => {
      names.push({ text: condition.ConditionName, value: key });
    });
    return names;
  };

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Input
            placeholder="Search Here"
            onChange={(e, data) => {
              const where = this.state.where;
              where[0] = { col: "name", operator: "LIKE", value: data.value.toLowerCase() };
              this.setState({
                where,
              });
              this.onInputChanged();
            }}
            loading={this.props.loading}
          />
          <Button primary onClick={this.onInputChanged}>
            Search
          </Button>
        </Grid.Row>
        {this.state.conditions.map(condition =>
          this.renderCondition(condition.condition, condition.key),
        )}
        <Grid.Row>
          <Dropdown
            onChange={this.addCondition}
            placeholder="Add Condition"
            fluid
            selection
            selectOnBlur={false}
            options={this.displaySearchConditions()}
            value={""}
          />
        </Grid.Row>
      </Grid>
    );
  }
}

SearchItemsComponent.propTypes = {
  onResult: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SearchItemsComponent;

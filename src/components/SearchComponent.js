import React, { Component } from "react";
import PropTypes from "prop-types";
import { Input, Button, Grid, Dropdown } from "semantic-ui-react";
import SearchConditions from "./searchConditions";
import _ from "lodash";

class SearchComponent extends Component {
  state = {
    conditions: [],
    where: [{ col: "name", operator: "LIKE", value: "" }],
  };
  lastInputChangeRequest = null;

  onInputChanged = () => {
    clearTimeout(this.lastInputChangeRequest);
    this.lastInputChangeRequest = setTimeout(() => {
      console.log(this.state.where);
      if (this.state.where.length > 0) {
        this.props.onResult(this.state.where);
      }
    }, 500);
  };

  addCondition = (e, data) => {
    const conditions = this.state.conditions;
    conditions.push(SearchConditions[data.value]);
    const where = this.state.where;
    where[conditions.length] = { col: "", operator: "", value: "" };
    this.setState({ conditions });
  };

  removeCondition = key => {
    const conditions = this.state.conditions;
    conditions.splice(key, 1);
    const where = this.state.where;
    where.splice(key + 1, 1);
    this.setState({ conditions, where });
  };

  onConditionSet = (name, value, i) => {
    const where = this.state.where;
    where[i + 1] = value;
    this.setState({ where });
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
          values={this.state.where[i + 1]}
          onSubmit={(name, value) => {
            this.onConditionSet(name, value, i);
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
        {this.state.conditions.map((condition, key) => this.renderCondition(condition, key))}
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

SearchComponent.propTypes = {
  onResult: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SearchComponent;

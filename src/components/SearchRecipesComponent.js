import React, { Component } from "react";
import PropTypes from "prop-types";
import { Input, Button, Grid, Dropdown } from "semantic-ui-react";
import OptionalSearchConditions from "./searchConditions/RecipeOptionalConditionList";
import MandatorySearchConditions from "./searchConditions/RecipeMandatoryConditionList";
import _ from "lodash";
import uuidv4 from "uuid/v4";

class SearchRecipesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conditions: [],
      where: {},
    };
    this.lastInputChangeRequest = null;
  }

  onInputChanged = () => {
    clearTimeout(this.lastInputChangeRequest);
    this.lastInputChangeRequest = setTimeout(() => {
      if (Object.keys(this.state.where).length > 0) {
        console.log(_.toArray(this.state.where));
        this.props.onResult(_.toArray(this.state.where));
      }
    }, 500);
  };

  addCondition = (e, data) => {
    const conditions = this.state.conditions;
    const key = uuidv4();
    conditions.push({ condition: OptionalSearchConditions[data.value], key });
    this.setState({ conditions });
  };

  removeCondition = key => {
    const conditions = this.state.conditions;
    const where = this.state.where;
    _.remove(conditions, cond => cond.key === key);
    delete where[key];
    this.setState({ conditions, where }, this.onInputChanged);
  };

  renderCondition = (Condition, i, isOpt) => {
    return (
      <Grid.Row key={i}>
        {isOpt && (
          <Grid.Column>
            <Button
              icon="remove circle"
              color="red"
              onClick={() => {
                this.removeCondition(i);
              }}
            />
          </Grid.Column>
        )}
        <Condition
          onSubmit={value => {
            const where = this.state.where;
            where[i] = value;
            if (value.value === null) {
              delete where[i];
            }
            this.setState({ where }, this.onInputChanged);
          }}
        />
      </Grid.Row>
    );
  };

  displaySearchConditions = () => {
    const names = [];
    _.forEach(OptionalSearchConditions, (condition, key) => {
      names.push({ text: condition.ConditionName, value: key });
    });
    return names;
  };

  render() {
    return (
      <Grid>
        {_.toArray(MandatorySearchConditions).map((Condition, i) =>
          this.renderCondition(Condition, i, false),
        )}
        {this.state.conditions.map(condition =>
          this.renderCondition(condition.condition, condition.key, true),
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

SearchRecipesComponent.propTypes = {
  onResult: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SearchRecipesComponent;

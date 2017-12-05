import React, { Component } from "react";
import PropTypes from "prop-types";
import { Input, Button, Grid, Dropdown } from "semantic-ui-react";
import OptionalSearchConditions from "./searchConditions/ItemOptionalConditionList";
import MandatorySearchConditions from "./searchConditions/ItemMandatoryConditionList";
import history from "../history";
import _ from "lodash";
import uuidv4 from "uuid/v4";

class SearchItemsComponent extends Component {
  constructor(props) {
    super(props);
    const mand = {};
    _.each(MandatorySearchConditions, Condition => {
      mand[uuidv4()] = { Condition, val: { col: "", operator: "", value: null } };
    });
    this.state = {
      optionalConditions: {},
      mandatoryConditions: mand,
    };
    this.lastInputChangeRequest = null;
  }

  componentDidMount() {
    const search = decodeURIComponent(this.props.location.search);
    if (search !== "") {
      const mandatoryConditions = this.state.mandatoryConditions;
      const optionalConditions = this.state.optionalConditions;
      const conds = search.substr(1).split("|");
      _.each(conds, cond => {
        const vals = cond.split(";");
        if (vals.length !== 3) return;
        const mand = _.find(mandatoryConditions, mand => mand.Condition.ConditionName === vals[0]);
        if (mand) {
          mand.val.col = mand.Condition.ColName;
          mand.val.operator = vals[1];
          mand.val.value = vals[2];
        }
        const opt = _.find(OptionalSearchConditions, opt => opt.ConditionName === vals[0]);
        if (opt) {
          optionalConditions[uuidv4()] = {
            Condition: opt,
            val: { col: opt.ColName, operator: vals[1], value: vals[2] },
          };
        }
      });
      this.setState({ optionalConditions, mandatoryConditions }, this.onInputChanged);
    }
  }

  onInputChanged = () => {
    clearTimeout(this.lastInputChangeRequest);
    this.lastInputChangeRequest = setTimeout(() => {
      const { where, uri } = this.createWhere();
      history.push({ search: uri });
      if (where.length > 0) {
        this.props.onResult(where);
      }
    }, 500);
  };

  createWhere = () => {
    const where = [];
    let uri = "";
    _.each(this.state.mandatoryConditions, Cond => {
      if (Cond.val.value !== null) {
        if (uri !== "") uri += "|";
        uri += Cond.Condition.ConditionName + ";" + Cond.val.operator + ";" + Cond.val.value;
        where.push(Cond.val);
      }
    });
    _.each(this.state.optionalConditions, Cond => {
      if (Cond.val.value !== null) {
        if (uri !== "") uri += "|";
        uri += Cond.Condition.ConditionName + ";" + Cond.val.operator + ";" + Cond.val.value;
        where.push(Cond.val);
      }
    });
    return { where, uri };
  };

  addCondition = (e, data) => {
    const optionalConditions = this.state.optionalConditions;
    optionalConditions[uuidv4()] = {
      Condition: OptionalSearchConditions[data.value],
      val: { col: "", operator: "", value: "" },
    };
    this.setState({ optionalConditions });
  };

  removeCondition = key => {
    const optionalConditions = this.state.optionalConditions;
    delete optionalConditions[key];
    this.setState({ optionalConditions }, this.onInputChanged);
  };

  renderCondition = ({ Condition, val }, key, isOpt) => {
    return (
      <Grid.Row key={key}>
        {isOpt && (
          <Grid.Column>
            <Button
              icon="remove circle"
              color="red"
              onClick={() => {
                this.removeCondition(key);
              }}
            />
          </Grid.Column>
        )}
        <Condition
          onSubmit={value => {
            if (isOpt) {
              const optionalConditions = this.state.optionalConditions;
              const selectedOpt = optionalConditions[key];
              if (selectedOpt) {
                selectedOpt.val = value;
              }
              this.setState({ optionalConditions }, this.onInputChanged);
            } else {
              const mandatoryConditions = this.state.mandatoryConditions;
              const selectedMand = mandatoryConditions[key];
              if (selectedMand) {
                selectedMand.val = value;
              }
              this.setState({ mandatoryConditions }, this.onInputChanged);
            }
          }}
          value={val}
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
        {_.map(this.state.mandatoryConditions, (Condition, key) =>
          this.renderCondition(Condition, key, false),
        )}
        {_.map(this.state.optionalConditions, (Condition, key) =>
          this.renderCondition(Condition, key, true),
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
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

export default SearchItemsComponent;

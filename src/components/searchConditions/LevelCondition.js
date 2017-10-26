import React, { Component } from "react";
import PropTypes from "prop-types";
import { Input, Dropdown } from "semantic-ui-react";

const COL_NAME = "Level";

const operators = [
  { text: ">", value: ">" },
  { text: ">=", value: ">=" },
  { text: "<", value: "<" },
  { text: "<=", value: "<=" },
  { text: "=", value: "=" },
  { text: "!=", value: "!=" },
];

class LevelCondition extends Component {
  state = { level: 0, operator: ">" };

  submit = () => {
    this.props.onSubmit(COL_NAME, {
      col: "level",
      operator: this.state.operator,
      value: this.state.level,
    });
  };

  render() {
    return (
      <div>
        <font size={3}>Level: </font>
        <Input
          placeholder="Choose a level (1-200)"
          onChange={(e, data) => {
            const finalLevel = Math.min(Math.max(data.value, 0), 200);
            this.setState({ level: finalLevel }, this.submit);
          }}
          value={this.state.level}
        />
        <Dropdown
          onChange={(e, data) => {
            this.setState({ operator: data.value }, this.submit);
          }}
          placeholder="Operator"
          fluid
          selection
          options={operators}
          value={">"}
          text={this.state.operator}
        />
      </div>
    );
  }
}

LevelCondition.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

LevelCondition.ConditionName = COL_NAME;

export default LevelCondition;

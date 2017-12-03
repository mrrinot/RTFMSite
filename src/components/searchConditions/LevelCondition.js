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
  constructor(props) {
    super(props);
    this.state = { value: 0, operator: ">" };
  }

  submit = () => {
    this.props.onSubmit({
      col: "level",
      operator: this.state.operator,
      value: this.state.value,
    });
  };

  render() {
    return (
      <div>
        <font size={3}>Level: </font>
        <Dropdown
          onChange={(e, data) => {
            this.setState({ operator: data.value }, this.submit);
          }}
          selection
          options={operators}
          value={">"}
          text={this.state.operator}
          selectOnBlur={false}
        />
        <Input
          placeholder="Choose a level (1-200)"
          onChange={(e, data) => {
            const finalLevel = Math.min(Math.max(data.value, 0), 200);
            this.setState({ value: finalLevel }, this.submit);
          }}
          value={this.state.value}
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

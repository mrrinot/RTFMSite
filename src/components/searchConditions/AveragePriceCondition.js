import React, { Component } from "react";
import PropTypes from "prop-types";
import { Input, Dropdown } from "semantic-ui-react";

const COL_NAME = "Average price";

const operators = [
  { text: ">", value: ">" },
  { text: ">=", value: ">=" },
  { text: "<", value: "<" },
  { text: "<=", value: "<=" },
  { text: "=", value: "=" },
  { text: "!=", value: "!=" },
];

class AveragePriceCondition extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 0, operator: ">" };
  }

  submit = () => {
    this.props.onSubmit({
      col: "averagePrice",
      operator: this.state.operator,
      value: this.state.value,
    });
  };

  render() {
    return (
      <div>
        <font size={3}>Average price: </font>
        <Dropdown
          onChange={(e, data) => {
            this.setState({ operator: data.value }, this.submit);
          }}
          selection
          options={operators}
          value={">"}
          text={this.state.operator}
        />
        <Input
          placeholder="Enter a price"
          onChange={(e, data) => {
            this.setState({ value: data.value }, this.submit);
          }}
          value={this.state.value}
        />
      </div>
    );
  }
}

AveragePriceCondition.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

AveragePriceCondition.ConditionName = COL_NAME;

export default AveragePriceCondition;

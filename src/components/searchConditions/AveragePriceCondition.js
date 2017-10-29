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
  state = { price: 0, operator: ">" };

  submit = () => {
    this.props.onSubmit(COL_NAME, {
      col: "averagePrice",
      operator: this.state.operator,
      value: this.state.price,
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
          text={this.props.values.operator}
        />
        <Input
          placeholder="Enter a price"
          onChange={(e, data) => {
            this.setState({ price: data.value }, this.submit);
          }}
          value={this.props.values.value}
        />
      </div>
    );
  }
}

AveragePriceCondition.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  values: PropTypes.shape({
    col: PropTypes.string.isRequired,
    operator: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.string.isRequired])
      .isRequired,
  }).isRequired,
};

AveragePriceCondition.ConditionName = COL_NAME;

export default AveragePriceCondition;

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Input, Dropdown } from "semantic-ui-react";

const DISPLAY_NAME = "AveragePrice";
const COL_NAME = "averagePrice";

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
    this.state = { value: this.props.value.value || 0, operator: this.props.value.operator || ">" };
  }

  submit = () => {
    this.props.onSubmit({
      col: COL_NAME,
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
          selectOnBlur={false}
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
  value: PropTypes.shape({
    col: PropTypes.string.isRequired,
    operator: PropTypes.string.isRequired,
    value: PropTypes.object,
  }).isRequired,
};

AveragePriceCondition.ConditionName = DISPLAY_NAME;
AveragePriceCondition.ColName = COL_NAME;

export default AveragePriceCondition;

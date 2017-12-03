import React, { Component } from "react";
import PropTypes from "prop-types";
import { Input, Dropdown } from "semantic-ui-react";

const COL_NAME = "Order By";

const orders = [{ text: "ASC", value: "ASC" }, { text: "DESC", value: "DESC" }];
const columns = [
  { text: "Average price", value: 0, colname: "averagePrice" },
  { text: "Actual price", value: 1, colname: "lowestActualPrice" },
  { text: "Total ingredients average price", value: 2, colname: "totalIngredientsAveragePrice" },
  { text: "Total ingredients actual price", value: 3, colname: "totalIngredientsActualPrice" },
  { text: "Average cost difference", value: 4, colname: "averageCostDifference" },
  { text: "Actual cost difference", value: 5, colname: "actualCostDifference" },
  { text: "Average cost difference %", value: 6, colname: "averageCostDifferencePercentage" },
  { text: "Actual cost difference %", value: 7, colname: "actualCostDifferencePercentage" },
];

class OrderCondition extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", order: "ASC", col: "" };
  }

  submit = () => {
    this.props.onSubmit({
      col: "orderBy",
      operator: this.state.col,
      value: this.state.order,
    });
  };

  render() {
    return (
      <div>
        <font size={3}>Order By: </font>
        <Dropdown
          onChange={(e, data) => {
            this.setState(
              { col: columns[data.value].colname, value: columns[data.value].text },
              this.submit,
            );
          }}
          selection
          options={columns}
          value={this.state.col}
          text={this.state.value}
          selectOnBlur={false}
        />
        <Dropdown
          onChange={(e, data) => {
            this.setState({ order: data.value }, this.submit);
          }}
          selection
          options={orders}
          value={this.state.order}
          text={this.state.order}
          selectOnBlur={false}
        />
      </div>
    );
  }
}

OrderCondition.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

OrderCondition.ConditionName = COL_NAME;

export default OrderCondition;

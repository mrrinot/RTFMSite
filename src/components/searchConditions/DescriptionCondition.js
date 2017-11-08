import React, { Component } from "react";
import PropTypes from "prop-types";
import { Input } from "semantic-ui-react";

const COL_NAME = "Description";

class DescriptionCondition extends Component {
  render() {
    return (
      <div>
        <font size={3}>Description: </font>
        <Input
          placeholder="Search a description"
          onChange={(e, data) => {
            this.props.onSubmit(COL_NAME, {
              col: "description",
              operator: "LIKE",
              value: data.value.toLowerCase(),
            });
          }}
          value={this.props.values.value}
        />
      </div>
    );
  }
}

DescriptionCondition.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  values: PropTypes.shape({
    col: PropTypes.string.isRequired,
    operator: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
};

DescriptionCondition.ConditionName = COL_NAME;

export default DescriptionCondition;

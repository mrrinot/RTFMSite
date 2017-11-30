import React, { Component } from "react";
import PropTypes from "prop-types";
import { Input } from "semantic-ui-react";

const COL_NAME = "Description";

class DescriptionCondition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }
  render() {
    return (
      <div>
        <font size={3}>Description: </font>
        <Input
          placeholder="Search a description"
          onChange={(e, data) => {
            this.setState({ value: data.value });
            this.props.onSubmit({
              col: "description",
              operator: "LIKE",
              value: data.value.toLowerCase(),
            });
          }}
          value={this.state.value}
        />
      </div>
    );
  }
}

DescriptionCondition.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

DescriptionCondition.ConditionName = COL_NAME;

export default DescriptionCondition;

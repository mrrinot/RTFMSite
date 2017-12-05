import React, { Component } from "react";
import PropTypes from "prop-types";
import { Input } from "semantic-ui-react";

const DISPLAY_NAME = "Description";
const COL_NAME = "description";
class DescriptionCondition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value.value || "",
    };
  }
  render() {
    return (
      <div>
        <font size={3}>Description: </font>
        <Input
          placeholder="Search a description"
          onChange={(e, data) => {
            const str = data.value.replace(/[:;=|,]/g, "");
            this.setState({ value: str });
            this.props.onSubmit({
              col: COL_NAME,
              operator: "LIKE",
              value: str.toLowerCase(),
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
  value: PropTypes.shape({
    col: PropTypes.string.isRequired,
    operator: PropTypes.string.isRequired,
    value: PropTypes.string,
  }).isRequired,
};

DescriptionCondition.ConditionName = DISPLAY_NAME;
DescriptionCondition.ColName = COL_NAME;

export default DescriptionCondition;

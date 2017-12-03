import React, { Component } from "react";
import PropTypes from "prop-types";
import { Checkbox } from "semantic-ui-react";

class UnknownActualPriceCondition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }
  render() {
    return (
      <div>
        <font size={3}>No Unknown actual price: </font>
        <Checkbox
          indeterminate={this.state.value === null}
          checked={this.state.value === true}
          onChange={(e, data) => {
            let val = null;
            switch (this.state.value) {
              case null:
                val = true;
                break;
              case true:
                val = false;
                break;
              case false:
                val = null;
                break;
            }
            this.setState(
              { value: val },
              this.props.onSubmit({
                col: "containsActualUnknown",
                operator: "=",
                value: val === null ? val : !val,
              }),
            );
          }}
        />
      </div>
    );
  }
}

UnknownActualPriceCondition.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default UnknownActualPriceCondition;

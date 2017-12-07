import React, { Component } from "react";
import PropTypes from "prop-types";
import { Checkbox } from "semantic-ui-react";

const DISPLAY_NAME = "UnActPrc";
const COL_NAME = "containsActualUnknown";

class UnknownActualPriceCondition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  componentWillReceiveProps(props) {
    if (props.value) {
      const val = props.value.value === "null" ? null : props.value.value === "true";
      this.setState({
        value: val === null ? val : !val,
      });
    }
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
                col: COL_NAME,
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
  value: PropTypes.shape({
    col: PropTypes.string.isRequired,
    operator: PropTypes.string.isRequired,
    value: PropTypes.string,
  }).isRequired,
};

UnknownActualPriceCondition.ConditionName = DISPLAY_NAME;
UnknownActualPriceCondition.ColName = COL_NAME;

export default UnknownActualPriceCondition;

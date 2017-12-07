import React, { Component } from "react";
import PropTypes from "prop-types";
import { Input } from "semantic-ui-react";

const DISPLAY_NAME = "Name";
const COL_NAME = "name";
class NameCondition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  submit = () => {
    this.props.onSubmit({
      col: COL_NAME,
      operator: "LIKE",
      value: this.state.value.toLowerCase(),
    });
  };

  componentWillReceiveProps(props) {
    if (props.value && props.value.value) this.setState({ value: props.value.value });
  }

  render() {
    return (
      <div>
        <font size={3}>Name: </font>
        <Input
          placeholder="Search a name"
          onChange={(e, data) => {
            const str = data.value.replace(/[:;=|,]/g, "");
            this.setState({ value: str }, this.submit);
          }}
          value={this.state.value}
        />
      </div>
    );
  }
}

NameCondition.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.shape({
    col: PropTypes.string.isRequired,
    operator: PropTypes.string.isRequired,
    value: PropTypes.string,
  }).isRequired,
};

NameCondition.ConditionName = DISPLAY_NAME;
NameCondition.ColName = COL_NAME;

export default NameCondition;

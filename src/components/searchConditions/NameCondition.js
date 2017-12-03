import React, { Component } from "react";
import PropTypes from "prop-types";
import { Input } from "semantic-ui-react";

class NameCondition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }
  render() {
    return (
      <div>
        <font size={3}>Name: </font>
        <Input
          placeholder="Search a name"
          onChange={(e, data) => {
            this.setState({ value: data.value });
            this.props.onSubmit({
              col: "name",
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

NameCondition.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default NameCondition;

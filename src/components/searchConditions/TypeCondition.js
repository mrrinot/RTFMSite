import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import _ from "lodash";

const DISPLAY_NAME = "Type";
const COL_NAME = "typeId";

class TypeCondition extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  render() {
    return (
      <div>
        <font size={3}>Type: </font>
        <Dropdown
          placeholder="Select an item type"
          onChange={(e, data) => {
            this.setState(
              { value: data.value },
              this.props.onSubmit({
                col: COL_NAME,
                operator: "=",
                value: data.value,
              }),
            );
          }}
          selection
          search
          options={this.props.types.map(type => {
            return { text: type.name, value: type.id };
          })}
          text={
            this.state.value === "" ? "" : _.find(this.props.types, { id: this.state.value }).name
          }
          value={this.state.value === "" ? "" : this.state.value}
        />
      </div>
    );
  }
}

TypeCondition.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  types: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  value: PropTypes.shape({
    col: PropTypes.string.isRequired,
    operator: PropTypes.string.isRequired,
    value: PropTypes.object.isRequired,
  }).isRequired,
};

TypeCondition.ConditionName = DISPLAY_NAME;
TypeCondition.ColName = COL_NAME;

const mapStateToProps = (state, ownProps) => {
  return {
    types: state.metaData.itemsTypes || [],
  };
};

export default connect(mapStateToProps)(TypeCondition);

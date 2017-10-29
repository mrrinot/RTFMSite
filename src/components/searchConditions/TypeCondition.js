import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import _ from "lodash";

const COL_NAME = "Type";

class TypeCondition extends Component {
  render() {
    return (
      <div>
        <font size={3}>Type: </font>
        <Dropdown
          placeholder="Select an item type"
          onChange={(e, data) => {
            this.props.onSubmit(COL_NAME, {
              col: "typeId",
              operator: "=",
              value: data.value,
            });
          }}
          selection
          options={this.props.types.map(type => {
            return { text: type.name, value: type.id };
          })}
          text={
            this.props.values.value === ""
              ? ""
              : _.find(this.props.types, { id: this.props.values.value }).name
          }
          value={this.props.values.value === "" ? "" : this.props.values.value}
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
  values: PropTypes.shape({
    col: PropTypes.string.isRequired,
    operator: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.string.isRequired])
      .isRequired,
  }).isRequired,
};

TypeCondition.ConditionName = COL_NAME;

const mapStateToProps = (state, ownProps) => {
  return {
    types: state.metaData.itemsTypes || [],
  };
};

export default connect(mapStateToProps)(TypeCondition);

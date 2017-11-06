import React from "react";
import _ from "lodash";
import { Route } from "react-router";
import PropTypes from "prop-types";
import Layout from "../components/Layout";

const stuffForRoute = ["exact", "path", "strict", "computedMatch", "location", "render"];

/**
 * Special Route rendering component inside the Layout.
 *
 * @param {object} props
 * @returns {JSX.Node} Route node
 */
const LayoutRoute = props => {
  const routeProps = _.pick(props, stuffForRoute);
  const componentProps = _.omit(props, stuffForRoute);
  const ComponentToRender = props.component;
  const render = props.render;

  return (
    <Route
      {...routeProps}
      render={matchProps => (
        <Layout {...matchProps}>
          {ComponentToRender && <ComponentToRender {...matchProps} {...componentProps} />}
          {!ComponentToRender && render({ ...matchProps, ...componentProps })}
        </Layout>
      )}
    />
  );
};

LayoutRoute.propTypes = {
  component: PropTypes.node,
  render: PropTypes.func,
};

export default LayoutRoute;

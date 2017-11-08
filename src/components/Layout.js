import React from "react";
import PropTypes from "prop-types";
import { Segment } from "semantic-ui-react";
import Header from "./Header";
import Footer from "./Footer";

/**
 * Defines the basic Layout for a random page
 *
 * @param {object} props
 * @return {JSX.Node} The node representing the layout
 */
const Layout = props => (
  <div>
    <Segment vertical>
      <Header />
    </Segment>
    <Segment vertical>{props.children}</Segment>
    <Segment vertical>
      <Footer />
    </Segment>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

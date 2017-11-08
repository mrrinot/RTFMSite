import React, { Component } from "react";
import PropTypes from "prop-types";
import { Segment, Container, Label, List } from "semantic-ui-react";

class Footer extends Component {
  render() {
    return (
      <Container textAlign="center">
        <div style={{ display: "inline-block", textAlign: "left" }}>
          <Label content="Serveur" detail="%RTFMSERVER_VERSION%" />
          <Label content="Client" detail="%RTFMSITE_VERSION%" />
        </div>
      </Container>
    );
  }
}

Footer.propTypes = {};

export default Footer;

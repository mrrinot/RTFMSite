import React, { Component } from "react";
import { Container, Label } from "semantic-ui-react";

class Footer extends Component {
  render() {
    return (
      <Container textAlign="center">
        <div style={{ display: "inline-block", textAlign: "left" }}>
          <Label content="Serveur" detail="0.5.3" />
          <Label content="Client" detail="0.3.3" />
        </div>
      </Container>
    );
  }
}

export default Footer;

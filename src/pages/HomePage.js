import React, { Component } from "react";
import { Icon, Grid } from "semantic-ui-react";
import { Helmet } from "react-helmet";

class HomePage extends Component {
  render() {
    return (
      <Grid verticalAlign="middle" container centered columns={3}>
        <Helmet>
          <title>Home - RTFM</title>
        </Helmet>
        <Grid.Row stretched>
          <Grid.Column verticalAlign="middle" width={1} textAlign="center">
            <Icon size="huge" name="arrow up" />
          </Grid.Column>
          <Grid.Column verticalAlign="middle" width={14} textAlign="center">
            <span style={{ fontSize: 28 }}>Utilisez le menu ci-dessus pour naviguer !</span>
          </Grid.Column>
          <Grid.Column verticalAlign="middle" width={1} textAlign="center">
            <Icon size="huge" name="arrow up" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default HomePage;

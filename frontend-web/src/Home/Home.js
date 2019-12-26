import React, { Component } from "react";
import PlanningApps from '../PlanningApps'

class Home extends Component {
  login() {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated()) {
      return <PlanningApps />;
    }
    return (
      <div className="container">
        <h4>
          You are not logged in! Please{" "}
          <a style={{ cursor: "pointer" }} onClick={this.login.bind(this)}>
            Log In
          </a>{" "}
          to continue.
        </h4>
      </div>
    );
  }
}

export default Home;

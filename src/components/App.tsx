import React from "react";

import { Header } from "./Layouts/Header";
import { Cards } from "./Cards/Cards";

export class App extends React.Component {
  render() {
    return (
      <div style={{ marginTop: "20px", backgroundColor: "rgb(250, 250, 250)" }}>
        <div className="ui container">
          <Header />
          <br />
          <Cards />
          <br />
        </div>
      </div>
    );
  }
}

import React from "react";

import covid19 from "./images/covid19.jpg";

export const Header = () => {
  return (
    <div>
      <div className="ui three item menu">
        <a className="item" href="/"><h3>COVID-19 Stats</h3></a>
      </div>
      <div className="ui segment">
        <img className="ui centered large image" src={covid19} alt="COVID-19" />
      </div>
    </div>
  );
};

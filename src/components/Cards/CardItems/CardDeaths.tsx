import React from "react";
import CountUp from "react-countup";

interface AppProps {
  deaths: Object;
  lastUpdate: Date;
  countryName: String;
}

export class CardDeaths extends React.Component<AppProps> {
  renderDeaths = (): JSX.Element => {
    const { deaths } = this.props;
    if (deaths !== undefined) {
      const deathsValue: number = Object.values(deaths)[0];
      if (deathsValue >= 0) {
        return (
          <div className="content">
            Deaths:{" "}
            <CountUp
              start={0}
              end={deathsValue}
              duration={2.75}
              separator=","
            />
          </div>
        );
      } else {
        return <div>Loading...</div>;
      }
    } else {
      return <div>Loading...</div>;
    }
  };

  renderLastUpdate = (): JSX.Element => {
    const { lastUpdate } = this.props;
    if (lastUpdate) {
      const lastUpdateValue: string = new Date(lastUpdate).toDateString();
      if (lastUpdateValue) {
        return (
          <div className="description">Last Update: {lastUpdateValue}</div>
        );
      } else {
        return <div>Loading...</div>;
      }
    } else {
      return <div>Loading...</div>;
    }
  };

  renderHeader = (header: string): JSX.Element => {
    return <div className="header">{header}</div>;
  };

  render() {
    const { countryName } = this.props;
    return (
      <div
        className="ui card"
        style={{ borderBottom: "10px solid rgba(255, 0, 0, 0.5)" }}
      >
        <div className="content">
          {this.renderHeader(
            `Number of deaths caused by COVID-19 ${countryName}`
          )}
        </div>
        <div className="content">
          {this.renderDeaths()}
          {this.renderLastUpdate()}
        </div>
      </div>
    );
  }
}

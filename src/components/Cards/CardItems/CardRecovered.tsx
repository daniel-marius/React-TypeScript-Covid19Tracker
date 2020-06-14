import React from "react";
import CountUp from "react-countup";

interface AppProps {
  recovered: Object;
  lastUpdate: Date;
  countryName: String;
}

export class CardRecovered extends React.Component<AppProps> {
  renderRecovered = (): JSX.Element => {
    const { recovered } = this.props;
    if (recovered !== undefined) {
      const recoveredValue: number = Object.values(recovered)[0];
      if (recoveredValue >= 0) {
        return (
          <div className="content">
            Recovered:{" "}
            <CountUp
              start={0}
              end={recoveredValue}
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
        style={{ borderBottom: "10px solid rgba(0, 255, 0, 0.5)" }}
      >
        <div className="content">
          {this.renderHeader(
            `Number of recoveries from COVID-19 ${countryName}`
          )}
        </div>
        <div className="content">
          {this.renderRecovered()}
          {this.renderLastUpdate()}
        </div>
      </div>
    );
  }
}

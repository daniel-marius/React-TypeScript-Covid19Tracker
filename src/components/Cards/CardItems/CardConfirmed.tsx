import React from "react";
import CountUp from "react-countup";

interface AppProps {
  confirmed: Object;
  lastUpdate: Date;
  countryName: String;
}

export class CardConfirmed extends React.Component<AppProps> {
  renderConfirmed = (): JSX.Element => {
    const { confirmed } = this.props;

    if (confirmed !== undefined) {
      const confirmedValue: number = Object.values(confirmed)[0];
      if (confirmedValue >= 0) {
        return (
          <div className="content">
            Confirmed Cases:{" "}
            <CountUp
              start={0}
              end={confirmedValue}
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
        style={{ borderBottom: "10px solid rgba(0, 0, 255, 0.5)" }}
      >
        <div className="content">
          {this.renderHeader(
            `Number of confirmed cases of COVID-19 ${countryName}`
          )}
        </div>
        <div className="content">
          {this.renderConfirmed()}
          {this.renderLastUpdate()}
        </div>
      </div>
    );
  }
}

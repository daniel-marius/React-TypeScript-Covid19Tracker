import React from "react";
import CountUp from "react-countup";

interface AppProps {
  confirmed: Object;
  recovered: Object;
  deaths: Object;
  lastUpdate: Date;
  countryName: String;
}

export class CardActive extends React.Component<AppProps> {
  renderActive = (): JSX.Element => {
    const { confirmed, recovered, deaths } = this.props;

    if (
      confirmed !== undefined &&
      recovered !== undefined &&
      deaths !== undefined
    ) {
      const confirmedValue = Object.values(confirmed)[0];
      const recoveredValue = Object.values(recovered)[0];
      const deathsValue = Object.values(deaths)[0];
      const activeValue = confirmedValue - recoveredValue - deathsValue;

      if (activeValue >= 0) {
        return (
          <div className="content">
            Active Cases:{" "}
            <CountUp
              start={0}
              end={activeValue}
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
            `Number of active cases of COVID-19 ${countryName}`
          )}
        </div>
        <div className="content">
          {this.renderActive()}
          {this.renderLastUpdate()}
        </div>
      </div>
    );
  }
}

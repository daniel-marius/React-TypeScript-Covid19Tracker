import React from "react";
import { connect } from "react-redux";

import {
  CovidData,
  CountryFields,
  fetchData,
  fetchCountries
} from "../../actions";

import { StoreState } from "../../reducers";

import {
  CardConfirmed,
  CardRecovered,
  CardDeaths,
  CardActive
} from "./CardItems";

import { Countries } from "../Countries/Countries";
import { Charts } from "../Charts/Charts";

interface AppProps {
  covidData: CovidData;
  countries: CountryFields[];
  fetchData: Function;
  fetchCountries: Function;
}

interface AppState {
  countrySymbol: string;
  countryName: string;
}

export class _Cards extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = { countrySymbol: "", countryName: "World Wide" };
  }

  componentDidMount() {
    this.props.fetchData();
  }

  handleCountry = (countrySymbol: string): void => {
    if (countrySymbol === "global") {
      this.setState({ countrySymbol: "" });
      this.props.fetchData();
    }

    this.setState({ countrySymbol });
    this.props.fetchData(countrySymbol);
    this.props.fetchCountries();

    const { countries } = this.props;
    const filterCountries: CountryFields[] = countries.filter(
      (country: CountryFields) => country.key === countrySymbol
    );

    this.setState({ countryName: filterCountries[0].text });

    console.log(this.state.countryName);
  };

  // Event for button
  onChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    console.log(event);
    this.setState({ countrySymbol: "" });
    this.props.fetchData();
  };

  render() {
    const { confirmed, recovered, deaths, lastUpdate } = this.props.covidData;
    const { countryName } = this.state;
    return (
      <div>
        <div className="ui grid">
          <div className="four wide column">
            <CardConfirmed
              confirmed={confirmed}
              lastUpdate={lastUpdate}
              countryName={countryName}
            />
          </div>

          <div className="four wide column">
            <CardRecovered
              recovered={recovered}
              lastUpdate={lastUpdate}
              countryName={countryName}
            />
          </div>

          <div className="four wide column">
            <CardDeaths
              deaths={deaths}
              lastUpdate={lastUpdate}
              countryName={countryName}
            />
          </div>

          <div className="four wide column">
            <CardActive
              confirmed={confirmed}
              recovered={recovered}
              deaths={deaths}
              lastUpdate={lastUpdate}
              countryName={countryName}
            />
          </div>
        </div>
        <br />
        <Countries handleCountry={this.handleCountry} />

        {/*<br />
        <button className="ui primary button" onClick={this.onChange}>World Wide</button>*/}

        <br />
        <br />
        <Charts
          confirmed={confirmed}
          recovered={recovered}
          deaths={deaths}
          lastUpdate={lastUpdate}
          countryName={countryName}
        />
      </div>
    );
  }
}

const mapStateToProps = ({
  covidData,
  countries
}: StoreState): { covidData: CovidData; countries: CountryFields[] } => {
  return { covidData, countries };
};

export const Cards = connect(
  mapStateToProps,
  { fetchData, fetchCountries }
)(_Cards);

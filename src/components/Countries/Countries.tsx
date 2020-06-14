import React from "react";
import { connect } from "react-redux";
import { Dropdown } from "semantic-ui-react";

import { CountryFields, fetchCountries } from "../../actions";
import { StoreState } from "../../reducers";

import Spinner from "../Spinner/Spinner";

interface AppProps {
  countries: CountryFields[];
  fetchCountries: Function;
  handleCountry: Function;
}

export class _Countries extends React.Component<AppProps> {
  componentDidMount() {
    this.props.fetchCountries();
  }

  // Event for selection
  onChange = (event: React.SyntheticEvent<HTMLElement, Event>, data: any) => {
    console.log(event);
    this.props.handleCountry(data.value);
  };

  renderCountry = (): JSX.Element => {
    const { countries } = this.props;
    if (countries.length > 0) {
      return (
        <Dropdown
          placeholder="Select Country"
          fluid
          search
          selection
          options={this.props.countries}
          onChange={this.onChange}
        />
      );
    } else {
      return (
        <div>
          <Spinner />
        </div>
      );
    }
  };

  render() {
    return (
      <div style={{ width: "30%", marginLeft: "385px" }}>
        {this.renderCountry()}
      </div>
    );
  }
}

const mapStateToProps = ({
  countries
}: StoreState): { countries: CountryFields[] } => {
  return { countries };
};

export const Countries = connect(
  mapStateToProps,
  { fetchCountries }
)(_Countries);

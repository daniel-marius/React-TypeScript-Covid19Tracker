import {
  CovidData,
  CountryFields,
  DailyData,
  ActionTypes,
  Action
} from "../actions";

export const covidReducer = (
  state: CovidData = {
    confirmed: {},
    recovered: {},
    deaths: {},
    lastUpdate: new Date(0)
  },
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.fetchData:
      return action.payload;
    default:
      return state;
  }
};

export const countriesReducer = (
  state: CountryFields[] = [],
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.fetchCountries:
      return action.payload;
    default:
      return state;
  }
};

export const dailyReducer = (state: DailyData[] = [], action: Action) => {
  switch (action.type) {
    case ActionTypes.fetchDailyData:
      return action.payload;
    default:
      return state;
  }
};

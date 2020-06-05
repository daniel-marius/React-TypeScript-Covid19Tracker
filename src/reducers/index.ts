import { combineReducers } from "redux";

import { covidReducer, countriesReducer, dailyReducer } from "./covid";

import { CovidData, CountryFields, DailyData } from "../actions";

// Describes the entire state inside the redux store
export interface StoreState {
  covidData: CovidData;
  countries: CountryFields[];
  dailyData: DailyData[];
}

export const reducers = combineReducers({
  covidData: covidReducer,
  countries: countriesReducer,
  dailyData: dailyReducer
});

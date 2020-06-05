import { FetchCovidData, FetchCountries, FetchDailyData } from "./covid";

export enum ActionTypes {
  fetchData = 0,
  fetchCountries = 1,
  fetchDailyData = 2
}

export type Action = FetchCovidData | FetchCountries | FetchDailyData;

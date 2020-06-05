import { Dispatch } from "redux";

import endpoint from "../api/endpoint";
import { ActionTypes } from "./types";

export interface CovidData {
  confirmed: object;
  recovered: object;
  deaths: object;
  lastUpdate: Date;
}

interface CountryItems {
  name: string;
  iso2: string;
  iso3: string;
}

export interface CountryFields {
  key: string;
  value: string;
  flag: string;
  text: string;
}

interface Country {
  countries: [];
}

export interface DailyData {
  confirmed: object;
  recovered: object;
  deaths: object;
  reportDate: Date;
}

export interface FetchCovidData {
  type: ActionTypes.fetchData;
  payload: CovidData;
}

export interface FetchCountries {
  type: ActionTypes.fetchCountries;
  payload: CountryFields[];
}

export interface FetchDailyData {
  type: ActionTypes.fetchDailyData;
  payload: DailyData[];
}

export const fetchData = (country: string): Function => {
  return async (dispatch: Dispatch) => {
    try {
      let response = null;
      if (country) {
        response = await endpoint.get<CovidData>(`/countries/${country}`);
      } else {
        response = await endpoint.get<CovidData>(`/`);
      }

      const { confirmed, recovered, deaths, lastUpdate } = response.data;
      const data: CovidData = {
        confirmed,
        recovered,
        deaths,
        lastUpdate
      };

      // passing object with the right data type
      dispatch<FetchCovidData>({
        type: ActionTypes.fetchData,
        payload: data
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const fetchCountries = (): Function => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await endpoint.get<Country>("/countries");

      const { countries } = response.data;

      let select: CountryFields[] = countries.map((country: CountryItems) => {
        let newCountry: CountryFields = {
          key: "",
          value: "",
          flag: "",
          text: ""
        };
        if (country.iso2 !== undefined) {
          newCountry = {
            key: country.iso2.toLowerCase(),
            value: country.iso2.toLowerCase(),
            flag: country.iso2.toLowerCase(),
            text: country.name
          };
        }
        return newCountry;
      });

      select = select.filter((country: CountryFields) => country.key !== "");

      const newObject: CountryFields = {
        key: "global",
        value: "global",
        flag: "global",
        text: "World Wide"
      };

      // Add the object at the beginning
      select.unshift(newObject);

      dispatch<FetchCountries>({
        type: ActionTypes.fetchCountries,
        payload: select
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const fetchDailyData = (): Function => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await endpoint.get<DailyData[]>(`/daily`);
      const { data } = response;

      const newData: DailyData[] = data.map((elm: DailyData) => {
        const { confirmed, recovered, deaths, reportDate } = elm;
        return { confirmed, recovered, deaths, reportDate };
      });

      dispatch<FetchDailyData>({
        type: ActionTypes.fetchDailyData,
        payload: newData
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

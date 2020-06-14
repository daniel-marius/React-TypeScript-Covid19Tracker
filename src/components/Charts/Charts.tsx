import React from "react";
import { connect } from "react-redux";
import Chart from "react-apexcharts";

import { DailyData, fetchDailyData } from "../../actions";
import { StoreState } from "../../reducers";

import Spinner from "../Spinner/Spinner";

interface AppProps {
  dailyData: DailyData[];
  fetchDailyData: Function;
  confirmed: Object;
  recovered: Object;
  deaths: Object;
  lastUpdate: Date;
  countryName: String;
}

export class _Charts extends React.Component<AppProps> {
  componentDidMount() {
    this.props.fetchDailyData();
  }

  renderBarChart = (): JSX.Element => {
    const {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
      countryName
    } = this.props;

    let confirmedValue: number = 0;
    let recoveredValue: number = 0;
    let deathsValue: number = 0;
    let activeValue: number = 0;

    if (
      confirmed !== undefined &&
      recovered !== undefined &&
      deaths !== undefined
    ) {
      const confirmedArray = Object.values(confirmed);
      const recoveredArray = Object.values(recovered);
      const deathsArray = Object.values(deaths);

      if (
        confirmedArray.length > 0 &&
        recoveredArray.length > 0 &&
        deathsArray.length > 0
      ) {
        confirmedValue = confirmedArray[0];
        recoveredValue = recoveredArray[0];
        deathsValue = deathsArray[0];
        activeValue = confirmedValue - recoveredValue - deathsValue;
      }
    }

    const series = [
      {
        data: [confirmedValue, recoveredValue, deathsValue, activeValue]
      }
    ];

    const options = {
      chart: {
        type: "bar",
        height: 380
      },
      plotOptions: {
        bar: {
          barHeight: "100%",
          distributed: true,
          horizontal: true,
          dataLabels: {
            position: "bottom"
          }
        }
      },
      colors: ["#33b2df", "#f48024", "#d4526e", "#13d8aa"],
      dataLabels: {
        enabled: true,
        textAnchor: "start",
        style: {
          colors: ["#fff"]
        },
        formatter: function(val: any, opt: any) {
          return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
        },
        offsetX: 0,
        dropShadow: {
          enabled: true
        }
      },
      stroke: {
        width: 1,
        colors: ["#fff"]
      },
      xaxis: {
        categories: ["Confirmed", "Recovered", "Deaths", "Active"]
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      title: {
        text: `Current Situation: ${countryName}`,
        align: "center",
        floating: true
      },
      subtitle: {
        text: `Last Update: ${new Date(lastUpdate).toDateString()}`,
        align: "center"
      },
      tooltip: {
        theme: "dark",
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function() {
              return "";
            }
          }
        }
      }
    };

    if (countryName) {
      return (
        <div className="mixed-chart">
          <Chart options={options} series={series} type="bar" height={380} />
        </div>
      );
    } else {
      return (
        <div>
          <Spinner />
        </div>
      );
    }
  };

  renderLineChart = (): JSX.Element => {
    const { dailyData } = this.props;

    let confirmedArray: number[] = [];
    let deathsArray: number[] = [];
    let reportDateArray: string[] = [];

    if (dailyData.length > 0) {
      confirmedArray = dailyData.map((elem: DailyData) => {
        const { confirmed } = elem;
        const confirmedValue: number = Object.values(confirmed)[0];
        return confirmedValue;
      });

      deathsArray = dailyData.map((elem: DailyData) => {
        const { deaths } = elem;
        const deathsdValue: number = Object.values(deaths)[0];
        return deathsdValue;
      });

      reportDateArray = dailyData.map((elem: DailyData) => {
        const { reportDate } = elem;
        return reportDate.toString();
      });
    }

    const series = [
      {
        name: "COVID-19 Global Confirmed Cases",
        data: confirmedArray
      },
      {
        name: "COVID-19 Global Deaths",
        data: deathsArray
      }
    ];

    const options = {
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ["#77B6EA", "#545454"],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: "COVID-19 Global Confirmed Cases & Deaths",
        align: "left"
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: reportDateArray,
        title: {
          text: "Year-Month-Day"
        }
      },
      yaxis: {
        title: {
          text: "COVID-19 Global Confirmed Cases"
        },
        min: 1,
        max: confirmedArray[confirmedArray.length - 1]
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    };

    if (dailyData.length > 0) {
      return (
        <div className="mixed-chart">
          <Chart options={options} series={series} type="line" height={380} />
        </div>
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
      <div>
        {this.renderBarChart()}
        <br />
        <br />
        {this.renderLineChart()}
      </div>
    );
  }
}

const mapStateToProps = ({
  dailyData
}: StoreState): { dailyData: DailyData[] } => {
  return { dailyData };
};

export const Charts = connect(
  mapStateToProps,
  { fetchDailyData }
)(_Charts);

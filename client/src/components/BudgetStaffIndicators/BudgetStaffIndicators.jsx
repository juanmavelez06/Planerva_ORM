import React, { useState, useEffect } from "react";
import { BiLineChart } from "react-icons/bi";
import BudgetLineChart from "../BudgetLineChart/BudgetLineChart";
import BudgetTripleCard from "../BudgetTripleCard/BudgetTripleCard";
import BudgetTable from "../BudgetTable/BudgetTable";
import BudgetStaffFilters from "../BudgetStaffFilters/BudgetStaffFilters";
import "./index.css";

function BudgetStaffIndicators({ data }) {
  //Get Staff Needed Data
  const getStaffChartData = (dataParsed) => {
    try {
      let result = {};
      let base = {
        January: 0,
        February: 0,
        March: 0,
        April: 0,
        May: 0,
        June: 0,
        July: 0,
        August: 0,
        September: 0,
        October: 0,
        November: 0,
        December: 0,
      };

      dataParsed.forEach((element) => {
        base.January += element.workersneeded.January;
        base.February += element.workersneeded.February;
        base.March += element.workersneeded.March;
        base.April += element.workersneeded.April;
        base.May += element.workersneeded.May;
        base.June += element.workersneeded.June;
        base.July += element.workersneeded.July;
        base.August += element.workersneeded.August;
        base.September += element.workersneeded.September;
        base.October += element.workersneeded.October;
        base.November += element.workersneeded.November;
        base.December += element.workersneeded.December;
      });

      result.label = "Personal";
      result.labels = Object.keys(base);
      result.data = Object.values(base);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  //Get Staff Cost
  const getCostData = (dataParsed) => {
    try {
      let result = {};
      let base = {
        January: 0,
        February: 0,
        March: 0,
        April: 0,
        May: 0,
        June: 0,
        July: 0,
        August: 0,
        September: 0,
        October: 0,
        November: 0,
        December: 0,
      };

      // * Get Staff Cost Monthly
      dataParsed.forEach((element) => {
        base.January += element.workersneeded.January * element.refsalary;
        base.February += element.workersneeded.February * element.refsalary;
        base.March += element.workersneeded.March * element.refsalary;
        base.April += element.workersneeded.April * element.refsalary;
        base.May += element.workersneeded.May * element.refsalary;
        base.June += element.workersneeded.June * element.refsalary;
        base.July += element.workersneeded.July * element.refsalary;
        base.August += element.workersneeded.August * element.refsalary;
        base.September += element.workersneeded.September * element.refsalary;
        base.October += element.workersneeded.October * element.refsalary;
        base.November += element.workersneeded.November * element.refsalary;
        base.December += element.workersneeded.December * element.refsalary;
      });

      //* Base Values
      let parsedBaseValues = Object.values(base);

      // * Total Salary Cost Monthly
      let totalSalaryCost = parsedBaseValues.reduce((a, b) => {
        return a + b;
      }, 0);

      // * Average Salary Cost Monthly
      let avgSalaryCostMonthly = Math.round(
        totalSalaryCost / parsedBaseValues.length
      );

      result.label = "Costo Salario Mensual";
      result.labels = Object.keys(base);
      result.data = parsedBaseValues;

      result.totalSalaryCost = totalSalaryCost.toLocaleString();
      result.avgSalaryCostMonthly = avgSalaryCostMonthly.toLocaleString();
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  //Salary + "Factor Prestacional"
  const getIncSalaryData = (dataParsed) => {
    try {
      let result = {};
      let base = {
        January: 0,
        February: 0,
        March: 0,
        April: 0,
        May: 0,
        June: 0,
        July: 0,
        August: 0,
        September: 0,
        October: 0,
        November: 0,
        December: 0,
      };

      dataParsed.forEach((element) => {
        base.January += Math.round(
          element.workersneeded.January *
            (element.refsalary +
              element.refsalary * (element.facperformance / 100))
        );
        base.February += Math.round(
          element.workersneeded.February *
            (element.refsalary +
              element.refsalary * (element.facperformance / 100))
        );
        base.March += Math.round(
          element.workersneeded.March *
            (element.refsalary +
              element.refsalary * (element.facperformance / 100))
        );
        base.April += Math.round(
          element.workersneeded.April *
            (element.refsalary +
              element.refsalary * (element.facperformance / 100))
        );
        base.May += Math.round(
          element.workersneeded.May *
            (element.refsalary +
              element.refsalary * (element.facperformance / 100))
        );
        base.June += Math.round(
          element.workersneeded.June *
            (element.refsalary +
              element.refsalary * (element.facperformance / 100))
        );
        base.July += Math.round(
          element.workersneeded.July *
            (element.refsalary +
              element.refsalary * (element.facperformance / 100))
        );
        base.August += Math.round(
          element.workersneeded.August *
            (element.refsalary +
              element.refsalary * (element.facperformance / 100))
        );
        base.September += Math.round(
          element.workersneeded.September *
            (element.refsalary +
              element.refsalary * (element.facperformance / 100))
        );
        base.October += Math.round(
          element.workersneeded.October *
            (element.refsalary +
              element.refsalary * (element.facperformance / 100))
        );
        base.November += Math.round(
          element.workersneeded.November *
            (element.refsalary +
              element.refsalary * (element.facperformance / 100))
        );
        base.December += Math.round(
          element.workersneeded.December *
            (element.refsalary +
              element.refsalary * (element.facperformance / 100))
        );
      });

      result.label = " Salario + Factor Prestacional";
      result.labels = Object.keys(base);
      result.data = Object.values(base);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  //Get Transport Aux Cost per Month
  const getCostTransportData = (dataParsed) => {
    try {
      const minSalary = 1300606; //$1.300.606 COP
      const auxTransport = 118000; //$118.000 COP
      let result = 0;

      dataParsed.forEach((element) => {
        if (element.refsalary < minSalary * 2) {
          result +=
            Object.values(element.workersneeded).reduce((a, b) => a + b, 0) *
            auxTransport;
        }
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  //Get Staff Needed Table Info.
  let getStaffTableInfo = (dataParsed) => {
    try {
      const columns = [
        { field: "id", headerName: "ID", width: 60 },
        { field: "area", headerName: "Área", width: 140 },
        { field: "position", headerName: "Cargo", width: 140 },
        { field: "staffNumber", headerName: "Personal Requerido", width: 125 },
        { field: "refsalary", headerName: "Referencia Salarial", width: 125 },
        { field: "facperformance", headerName: "Factor Prestacional", width: 125},
        {field: "salaryPlusPerformance", headerName: "Salario + Factor Prestacional", width: 150}
      ];
      let dataset = {};
      let rows = [];

      dataParsed.map((e) => {
        let row = {};
        row.id = e.id;
        row.area = e.area;
        row.position = e.position;
        row.refsalary = `${(e.refsalary).toLocaleString()} COP`;
        row.facperformance = `${e.facperformance}%`;
        row.staffNumber = Object.values(e.workersneeded).reduce(
          (a, b) => a + b,
          0
        );
        row.salaryPlusPerformance = `${(e.refsalary + Math.round(e.refsalary * (e.facperformance / 100))).toLocaleString()} COP`;
        rows.push(row);
      });

      dataset.columns = columns;
      dataset.rows = rows;
      return dataset;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="staff-indicators-ctn">
      <div className="indicators-header-ctn">
        <div className="indicators-header">
          <h2>Indicadores</h2>
          <h3>Personal</h3>
        </div>

        <BudgetStaffFilters data={data} filteredData={""} />
      </div>

      <div className="charts-ctn">
        <BudgetLineChart
          title={"Requerimiento de Personal"}
          data={getStaffChartData(data)}
        />
        <BudgetLineChart
          title={"Gasto Salario"}
          data={getCostData(data)}
          data2={getIncSalaryData(data)}
          duaLine={true}
        />
        <BudgetTable dataset={getStaffTableInfo(data)} />
      </div>

      <BudgetTripleCard>
        <div className="indicator">
          <div className="indicator-title">
            <p>Costo Salario Mensual</p> <BiLineChart />
          </div>
          <span>(Promedio)</span>

          <div className="data">
            <p>
              {getCostData(data).avgSalaryCostMonthly} <span>COP</span>
            </p>
          </div>
        </div>
        <div className="indicator">
          <div className="indicator-title">
            <p>Total Gasto Salario</p> <BiLineChart />
          </div>
          <span>(Total)</span>

          <div className="data">
            <p>
              {getCostData(data).totalSalaryCost} <span>COP</span>
            </p>
          </div>
        </div>
        <div className="indicator">
          <div className="indicator-title">
            <p>Auxilio de Transporte</p> <BiLineChart />
          </div>
          <span>(Total)</span>

          <div className="data">
            <p>
              {getCostTransportData(data).toLocaleString()} <span>COP</span>
            </p>
          </div>
        </div>
      </BudgetTripleCard>
    </div>
  );
}

export default BudgetStaffIndicators;

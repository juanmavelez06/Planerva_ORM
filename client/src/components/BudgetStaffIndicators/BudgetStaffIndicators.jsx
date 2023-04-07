import React, { useState, useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BiLineChart } from "react-icons/bi";
import BudgetLineChart from "../BudgetLineChart/BudgetLineChart";
import BudgetTripleCard from "../BudgetTripleCard/BudgetTripleCard";
import BudgetTable from "../BudgetTable/BudgetTable";

import "./index.css";

function BudgetStaffIndicators({ data }) {
  //State Control
  useEffect(() => {}, []);

  //Get Staff Needed Data
  const getStaffChartData = (dataParsed) => {
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
  };

  //Get Staff Cost
  const getCostData = (dataParsed) => {
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
    let avgSalaryCostMonthly = totalSalaryCost / parsedBaseValues.length;

    result.label = "Costo Salario Mensual";
    result.labels = Object.keys(base);
    result.data = parsedBaseValues;

    result.totalSalaryCost = totalSalaryCost.toLocaleString();
    result.avgSalaryCostMonthly = avgSalaryCostMonthly.toLocaleString();
    return result;
  };

  //Salary + "Factor Prestacional"
  const getIncSalaryData = (dataParsed) => {
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
      base.January +=
        element.workersneeded.January *
        (element.refsalary + element.refsalary * 0.4);
      base.February +=
        element.workersneeded.February *
        (element.refsalary + element.refsalary * 0.4);
      base.March +=
        element.workersneeded.March *
        (element.refsalary + element.refsalary * 0.4);
      base.April +=
        element.workersneeded.April *
        (element.refsalary + element.refsalary * 0.4);
      base.May +=
        element.workersneeded.May *
        (element.refsalary + element.refsalary * 0.4);
      base.June +=
        element.workersneeded.June *
        (element.refsalary + element.refsalary * 0.4);
      base.July +=
        element.workersneeded.July *
        (element.refsalary + element.refsalary * 0.4);
      base.August +=
        element.workersneeded.August *
        (element.refsalary + element.refsalary * 0.4);
      base.September +=
        element.workersneeded.September *
        (element.refsalary + element.refsalary * 0.4);
      base.October +=
        element.workersneeded.October *
        (element.refsalary + element.refsalary * 0.4);
      base.November +=
        element.workersneeded.November *
        (element.refsalary + element.refsalary * 0.4);
      base.December +=
        element.workersneeded.December *
        (element.refsalary + element.refsalary * 0.4);
    });

    result.label = " Salario + Factor Prestacional";
    result.labels = Object.keys(base);
    result.data = Object.values(base);
    return result;
  };

  //Get Transport Aux Cost per Month
  const getCostTransportData = (dataParsed) => {
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
  };

  //Get Staff Needed Table Info.
  let getStaffTableInfo = (dataParsed) => {
    const columns = [
      { field: "id", headerName: "ID", width: 60},
      { field: "area", headerName: "Área", width: 140},
      { field: "position", headerName: "Cargo", width: 140},
      { field: "staffNumber", headerName:"Personal Anual", width: 125},
      { field: "refsalary", headerName:"Referencia Salarial", width: 125},
      { field: "incsalary", headerName:"Factor Prestacional", width: 125}
    ];
    let dataset = {};
    let rows = [];

    dataParsed.map((e) => {
      let row = {};
      row.id = e.id;
      row.area = e.area;
      row.position = e.position;
      row.refsalary = e.refsalary;
      row.incsalary = `${e.incsalary}%`;
      row.staffNumber = Object.values(e.workersneeded).reduce((a, b) => a + b, 0);
      rows.push(row);
    });

    dataset.columns = columns;
    dataset.rows = rows;
    return (dataset);
  };

  //Get Salary Costs Table Info
  let getSalaryCostTableInfo = (dataParsed) => {
    const columns = [
      { field: "id", headerName: "ID", width: 60},
      { field: "area", headerName: "Área", width: 140},
      { field: "position", headerName: "Cargo", width: 140},
      { field: "staffNumber", headerName:"Personal Anual", width: 125}
    ];
    let dataset = {};
    let rows = [];



    dataParsed.map((e) => {
      let row = {};
     
      row.id = e.id;
      row.area = e.area;
      row.position = e.position;
      row.staffNumber = Object.values(e.workersneeded).reduce((a, b) => a + b, 0);
      
      rows.push(row);
    });

    dataset.columns = columns;
    dataset.rows = rows;
    return (dataset);
  }

  return (
    <div className="staff-indicators-ctn">
      <div className="indicators-header-ctn">
        <div className="indicators-header">
          <h2>Indicadores</h2>
          <h3>Personal</h3>
        </div>
        <div className="staff-filters">
          <button className="areaSelector filter">
            Área <RiArrowDropDownLine />
          </button>
          <button className="monthSelector filter">
            Mes <RiArrowDropDownLine />
          </button>
        </div>
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
        <BudgetTable dataset={getStaffTableInfo(data)}/>
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

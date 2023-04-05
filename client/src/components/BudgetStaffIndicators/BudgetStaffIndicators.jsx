import React, { useState, useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BiLineChart } from "react-icons/bi";
import BudgetLineChart from "../BudgetLineChart/BudgetLineChart";
import BudgetTripleCard from "../BudgetTripleCard/BudgetTripleCard";
import "./index.css";

function BudgetStaffIndicators({ data }) {
  //State Control

  useEffect(() => {
    
  }, []);

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
    return(result);
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
    return(result);
  };

  //Salary Increment Including Salary
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
      base.January += element.workersneeded.January * (element.refsalary + ((element.refsalary * 0.12)));
      base.February += element.workersneeded.February * (element.refsalary + ((element.refsalary * 0.12)));
      base.March += element.workersneeded.March * (element.refsalary + ((element.refsalary * 0.12)));
      base.April += element.workersneeded.April * (element.refsalary + ((element.refsalary * 0.12)));
      base.May += element.workersneeded.May * (element.refsalary + ((element.refsalary * 0.12)));
      base.June += element.workersneeded.June * (element.refsalary + ((element.refsalary * 0.12)));
      base.July += element.workersneeded.July * (element.refsalary + ((element.refsalary * 0.12)));
      base.August += element.workersneeded.August * (element.refsalary + ((element.refsalary * 0.12)));
      base.September += element.workersneeded.September * (element.refsalary + ((element.refsalary * 0.12)));
      base.October += element.workersneeded.October * (element.refsalary + ((element.refsalary * 0.12)));
      base.November += element.workersneeded.November * (element.refsalary + ((element.refsalary * 0.12)));
      base.December += element.workersneeded.December * (element.refsalary + ((element.refsalary * 0.12)));
    });

    result.label = "Incremento Salario";
    result.labels = Object.keys(base);
    result.data = Object.values(base);
    return(result);
  };

  //Get Transport Aux Cost per Month
  const getCostTransportData = (dataParsed) => {
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
      base.January += element.workersneeded.January * element.auxtransport;
      base.February += element.workersneeded.February * element.auxtransport;
      base.March += element.workersneeded.March * element.auxtransport;
      base.April += element.workersneeded.April * element.auxtransport;
      base.May += element.workersneeded.May * element.auxtransport;
      base.June += element.workersneeded.June * element.auxtransport;
      base.July += element.workersneeded.July * element.auxtransport;
      base.August += element.workersneeded.August * element.auxtransport;
      base.September += element.workersneeded.September * element.auxtransport;
      base.October += element.workersneeded.October * element.auxtransport;
      base.November += element.workersneeded.November * element.auxtransport;
      base.December += element.workersneeded.December * element.auxtransport;
    });

    //* Base Values
    let parsedBaseValues = Object.values(base);

    // * Total Cost Aux Transport (Yearly)
    let totalTransAuxCost = parsedBaseValues.reduce((a, b) => {
      return a + b;
    }, 0);

    result.label = "Costo Auxilio de Transporte Mensual";
    result.labels = Object.keys(base);
    result.data = parsedBaseValues;
    result.totalTransAuxCost = totalTransAuxCost.toLocaleString(); 
    return(result);
  };

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
        />
        <BudgetLineChart
          title={"Incremento Salario"}
          data={getIncSalaryData(data)}
        />
        <BudgetLineChart
          title={"Gasto Auxilio de Transporte"}
          data={getCostTransportData(data)}
        />
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
              {getCostTransportData(data).totalTransAuxCost} <span>COP</span>
            </p>
          </div>
        </div>
      </BudgetTripleCard>
    </div>
  );
}

export default BudgetStaffIndicators;

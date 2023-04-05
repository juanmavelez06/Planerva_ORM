import React, { useState, useEffect } from "react";
import BudgetStaffTable from "../BudgetStaffTable/BudgetStaffTable";
import BudgetCard from "../BudgetCard/BudgetCard";
import BudgetStaffIndicators from "../BudgetStaffIndicators/BudgetStaffIndicators";
import BudgetAddStaff from "../BudgetAddStaff/BudgetAddStaff";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { FaMoneyBillWave } from "react-icons/fa";
import AppReportBtn from "../AppReportBtn/AppReportBtn";
import dataSource from "../../data.example";
import "./index.css";

function BudgetStaff() {
  const [data, setData] = useState(dataSource);
  const [staffMonthly, setStaffMonthly] = useState(0);
  const [mainAccount, setMainAccount] = useState(0);
  const [budgetIncSalary, setBudgetIncSalary] = useState(0);
  const [addingData, setAddingData] = useState(false);

  useEffect(() => {
    updateBudgetIndicators(data);
  }, []);

  let updateBudgetIndicators = (dataInput) => {
    let staffNeededMonthly = 0;
    let mainAcc;
    let avgIncSalary;

    dataInput.forEach((value) => {
      //Calculate Average Workers Needed per Month
      const positionNeededMonthly = Object.values(value.workersneeded).reduce(
        (a, b) => a + b,
        0
      );
      staffNeededMonthly += positionNeededMonthly;

      //Calculate Account Most Repeated
      const resultAcc = {};
      resultAcc[value.account] = resultAcc[value.account] + 1 || 1;
      mainAcc = Object.entries(resultAcc).sort((a, b) => {
        if (a[1] > b[1]) {
          return -1;
        }
        if (a[1] < b[1]) {
          return 1;
        }
      })[0][0];

      //Calculate Average Salary Increment
      const resultIncSalary = {};
      resultIncSalary[value.incsalary] =
        resultIncSalary[value.incsalary] + 1 || 1;
      avgIncSalary = Object.entries(resultIncSalary).sort((a, b) => {
        if (a[1] > b[1]) {
          return -1;
        }
        if (a[1] < b[1]) {
          return 1;
        }
      })[0][0];
    });

    updateStaffNeeded(staffNeededMonthly);
    setMainAccount(mainAcc);
    setBudgetIncSalary(avgIncSalary);
  };

  let updateStaffNeeded = (value) => {
    setStaffMonthly(value);
  };

  return (
    <React.Fragment>
      {addingData ? (
        <BudgetAddStaff setAddingData={setAddingData} />
      ) : (
        <div className="budgetStaff section">
          <BudgetStaffTable
            budgetData={data}
            setAddingData={setAddingData}
          ></BudgetStaffTable>
          <div className="staff-cards-ctn">
            <BudgetCard
              Icon={AiOutlineUserSwitch}
              title={"Personal Necesitado"}
              legend={"Promedio"}
              data={staffMonthly}
            />
            <BudgetCard
              Icon={FaMoneyBillWave}
              title={"Cuenta Contable"}
              legend={"Promedio"}
              data={mainAccount}
            />
            <BudgetCard
              Icon={AiOutlineUserSwitch}
              title={"Incremento Salarial"}
              data={`${budgetIncSalary} %`}
            />
          </div>

          <div className="staff-indicators section">
            <BudgetStaffIndicators data={data} setData={setData} />
          </div>
          <AppReportBtn />
        </div>
      )}
    </React.Fragment>
  );
}

export default BudgetStaff;

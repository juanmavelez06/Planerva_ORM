import React, { useState, useEffect } from "react";
import BudgetStaffTable from "../BudgetStaffTable/BudgetStaffTable";
import BudgetCard from "../BudgetCard/BudgetCard";
import BudgetStaffIndicators from "../BudgetStaffIndicators/BudgetStaffIndicators";
import BudgetAddStaff from "../BudgetAddStaff/BudgetAddStaff";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { FaMoneyBillWave } from "react-icons/fa";
import AppReportBtn from "../AppReportBtn/AppReportBtn";
import AppUploadFile from "../AppUploadFile/AppUploadFile";
import { getStaffRequest } from "../../api/api.js";
import dataStructure from "../../data.structure";
import "./index.css";

function BudgetStaff() {
  const [data, setData] = useState(dataStructure);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [addingData, setAddingData] = useState(false);
  const [edittingData, setEdittingData] = useState(false);
  const [uploadFile, setUploadFile] = useState(false);

  useEffect(() => {
    getData();
    updateBudgetIndicators(data);
  }, []);

  // * Get Data from Server
  let getData = async () => {
    try {
      let downloadData = await getStaffRequest();
      let downloadedData = await downloadData.data;
      downloadedData.forEach((e) => {
        if (typeof e.workersneeded === "string") {
          e.workersneeded = JSON.parse(e.workersneeded);
        } else {
          e.workersneeded = e.workersneeded;
        }
      });
      setData(downloadedData);
      setDataFiltered(downloadedData);
    } catch (error) {
      console.log(error);
    }
  };

  let updateBudgetIndicators = (dataInput) => {
    try {
      let result = {};
      let staffNeededMonthly = 0; //Staff Needed Monthly
      let minSalaryIncrement = 12; // Minimun Salary Anual Increment
      let avgPerformanceFactor = 0; // Average Performance factor

      dataInput.forEach((value) => {
        //Calculate Total Staff Needed per Month
        const positionNeededMonthly = Object.values(value.workersneeded).reduce(
          (a, b) => a + b,
          0
        );
        staffNeededMonthly += positionNeededMonthly;

        //Calculate Average Performance Factor
        avgPerformanceFactor += value.facperformance;
      });

      avgPerformanceFactor =
        Math.round(avgPerformanceFactor / (dataInput.length > 0 ? dataInput.length : 1));

      result.staffNeededMonthly = staffNeededMonthly;
      result.avgPerformanceFactor = avgPerformanceFactor;
      result.incSalary = minSalaryIncrement;
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  let submitData = () => {
    getData();
    setAddingData(false);
    setEdittingData(false);
  };

  let editData = (e) => {
    setAddingData(true);
    setEdittingData(e);
  };

  let updateFileData = (e) => {
    setUploadFile(false);
    getData();
  };

  return (
    <React.Fragment>
      {addingData ? (
        <BudgetAddStaff
          submitData={submitData}
          setAddingData={setAddingData}
          editData={edittingData}
          setEdittingData={setEdittingData}
        />
      ) : uploadFile ? (
        <AppUploadFile updateFileData={updateFileData} />
      ) : (
        <div className="budgetStaff section">
          <BudgetStaffTable
            budgetData={data}
            getData={getData}
            setAddingData={setAddingData}
            editData={editData}
            setUploadFile={setUploadFile}
          ></BudgetStaffTable>
          <div className="staff-cards-ctn">
            <BudgetCard
              Icon={AiOutlineUserSwitch}
              title={"Personal Necesitado"}
              legend={"Total"}
              data={updateBudgetIndicators(dataFiltered).staffNeededMonthly}
            />
            <BudgetCard
              Icon={FaMoneyBillWave}
              title={"Factor Prestacional"}
              legend={"Promedio"}
              data={updateBudgetIndicators(dataFiltered).avgPerformanceFactor}
            />
            <BudgetCard
              Icon={AiOutlineUserSwitch}
              title={"Incremento Salario Mínimo"}
              data={`${updateBudgetIndicators(dataFiltered).incSalary} %`}
            />
          </div>

          <div className="staff-indicators section">
            <BudgetStaffIndicators
              data={data}
              setData={setData}
              dataFiltered={dataFiltered}
              setDataFiltered={setDataFiltered}
            />
          </div>
          <AppReportBtn />
        </div>
      )}
    </React.Fragment>
  );
}

export default BudgetStaff;

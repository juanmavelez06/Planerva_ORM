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
    } catch (error) {
      console.log(error);
    }
  };

  let updateBudgetIndicators = (dataInput) => {
    try {
      let result = {};
      let staffNeededMonthly = 0;
      let mainAcc;
      let avgIncSalary = 12
  
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
  
        // //Calculate Average Salary Increment
        // const resultIncSalary = {};
        // resultIncSalary[value.incsalary] =
        //   resultIncSalary[value.incsalary] + 1 || 1;
        // avgIncSalary = Object.entries(resultIncSalary).sort((a, b) => {
        //   if (a[1] > b[1]) {
        //     return -1;
        //   }
        //   if (a[1] < b[1]) {
        //     return 1;
        //   }
        // })[0][0];
      });
  
      result.staffNeededMonthly = staffNeededMonthly;
      result.mainAcc = mainAcc;
      result.incSalary = avgIncSalary;
      return(result)
    } catch (error) {
      console.log(error)
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
    getData()
  }

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
        <AppUploadFile updateFileData={updateFileData}/>
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
              legend={"Promedio"}
              data={updateBudgetIndicators(data).staffNeededMonthly}
            />
            <BudgetCard
              Icon={FaMoneyBillWave}
              title={"Cuenta Contable"}
              legend={"Promedio"}
              data={updateBudgetIndicators(data).mainAcc}
            />
            <BudgetCard
              Icon={AiOutlineUserSwitch}
              title={"Incremento Salarial"}
              data={`${updateBudgetIndicators(data).incSalary} %`}
            />
          </div>

          <div className="staff-indicators section">
            <BudgetStaffIndicators data={data} setData={setData} dataFiltered={dataFiltered} setDataFiltered={setDataFiltered} />
          </div>
          <AppReportBtn />
        </div>
      )}
    </React.Fragment>
  );
}

export default BudgetStaff;

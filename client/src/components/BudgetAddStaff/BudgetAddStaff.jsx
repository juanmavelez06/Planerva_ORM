import React, { useState, useEffect } from "react";
import { addPositionRequest } from "../../api/api.js";
import "./styles.css";

//Data Model
let model = {
  area: "",
  position: "",
  classing: "",
  account: 1111,
  refsalary: 0,
  facperformance: 0,
  auxtransport: 0,
  workersneeded: {
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
  },
};

function BudgetAddStaff({ setAddingData, submitData }) {
  const [dataModel, setDataModel] = useState(model);
  const [areaStaffForm, setAreaStaffForm] = useState("");
  const [positionStaffForm, setPositionStaffForm] = useState("");
  const [accountStaffForm, setAccountStaffForm] = useState(0);
  const [classingStaffForm, setClassingStaffForm] = useState("");
  const [refsalaryStaffForm, setRefSalaryStaffForm] = useState(0);
  const [facPerformanceStaffForm, setFacPerformanceStaffForm] = useState(0);
  const [staffNeededForm, setStaffNeededForm] = useState("");

  useEffect(() => {
    updateData();
  }, []);

  let updateData = (v) => {
    let dataValues = dataModel;

    if (v) {
      let entry = v;
      Object.defineProperty(dataValues, entry.name, {
        value: entry.value,
        enumerable: true,
        writable: true,
      });
    }

    switch (dataValues.classing.toUpperCase()) {
      case "MOD":
        dataValues.account = 7205;
        break;
      case "MOI":
        dataValues.account = 7305;
        break;
      case "MOA":
        dataValues.account = 5105;
        break;
      case "MOV":
        dataValues.account = 5205;
        break;
      case "HONA":
        dataValues.account = 5110;
        break;
      case "HONV":
        dataValues.account = 5210;
        break;
      case "HONP":
        dataValues.account = 7310;
        break;
      default:
        dataValues.account = 1111;
    }

    setDataModel(dataValues);
    setPositionStaffForm(dataValues.position);
    setAreaStaffForm(dataValues.area);
    setRefSalaryStaffForm(dataValues.refsalary);
    setFacPerformanceStaffForm(dataValues.facperformance);
    setAccountStaffForm(dataValues.account)
    setClassingStaffForm(dataValues.classing);
    setStaffNeededForm(dataValues.workersneeded);
  };

  let updateStaffNeededData = (val) => {
    let result = {};
    let staffNeeded = dataModel.workersneeded;
    let entry = val;

    try {
      Object.defineProperty(staffNeeded, entry.name, {
        value: Number(entry.value),
        enumerable: true,
        writable: true,
      });

      result.name = "workersneeded";
      result.value = staffNeeded;
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <div className="budget-add-ctn">
        <div className="add-staff-form-ctn">
          <form className="add-staff-form" action="">
            <div className="staff-info-section">
              <input
                onInput={(e) => {
                  updateData(e.target);
                }}
                type="text"
                name="position"
                placeholder="Cargo"
                value={positionStaffForm}
              />
              <div>
                <label htmlFor="refsalary">Referencia Salarial</label>
                <input
                  onInput={(e) => {
                    updateData(e.target);
                  }}
                  type="number"
                  name="refsalary"
                  placeholder="Referencia Salarial"
                />
              </div>
              <input
                onInput={(e) => {
                  updateData(e.target);
                }}
                type="text"
                name="area"
                placeholder="Área"
                value={areaStaffForm}
              />
              <div>
                <label htmlFor="facperformance">Factor Prestacional</label>
                <input
                  onInput={(e) => {
                    updateData(e.target);
                  }}
                  type="number"
                  name="facperformance"
                  placeholder="Factor Prestacional"
                  min={0}
                />
              </div>
              <input
                onInput={(e) => {
                  updateData(e.target);
                }}
                type="text"
                name="classing"
                placeholder="Clásificacion Contable"
                value={classingStaffForm}
              />
            </div>

            <div className="staff-needed-section">
              <h3>Requerimiento de Posición</h3>

              <div className="staff-needed-inputs">
                <div className="month-input">
                  <label htmlFor="January">Ene</label>
                  <input
                    onChange={(e) => {
                      updateData(updateStaffNeededData(e.target));
                    }}
                    type="number"
                    min={0}
                    name="January"
                  />
                </div>

                <div className="month-input">
                  <label htmlFor="February">Feb</label>
                  <input
                    onChange={(e) => {
                      updateData(updateStaffNeededData(e.target));
                    }}
                    type="number"
                    min={0}
                    name="February"
                  />
                </div>

                <div className="month-input">
                  <label htmlFor="March">Mar</label>
                  <input
                    onChange={(e) => {
                      updateData(updateStaffNeededData(e.target));
                    }}
                    type="number"
                    min={0}
                    name="March"
                  />
                </div>

                <div className="month-input">
                  <label htmlFor="April">Abr</label>
                  <input
                    onChange={(e) => {
                      updateData(updateStaffNeededData(e.target));
                    }}
                    type="number"
                    min={0}
                    name="April"
                  />
                </div>

                <div className="month-input">
                  <label htmlFor="May">May</label>
                  <input
                    onChange={(e) => {
                      updateData(updateStaffNeededData(e.target));
                    }}
                    type="number"
                    min={0}
                    name="May"
                  />
                </div>

                <div className="month-input">
                  <label htmlFor="June">Jun</label>
                  <input
                    onChange={(e) => {
                      updateData(updateStaffNeededData(e.target));
                    }}
                    type="number"
                    min={0}
                    name="June"
                  />
                </div>

                <div className="month-input">
                  <label htmlFor="July">Jul</label>
                  <input
                    onChange={(e) => {
                      updateData(updateStaffNeededData(e.target));
                    }}
                    type="number"
                    min={0}
                    name="July"
                  />
                </div>

                <div className="month-input">
                  <label htmlFor="August">Ago</label>
                  <input
                    onChange={(e) => {
                      updateData(updateStaffNeededData(e.target));
                    }}
                    type="number"
                    min={0}
                    name="August"
                  />
                </div>

                <div className="month-input">
                  <label htmlFor="September">Sep</label>
                  <input
                    onChange={(e) => {
                      updateData(updateStaffNeededData(e.target));
                    }}
                    type="number"
                    min={0}
                    name="September"
                  />
                </div>

                <div className="month-input">
                  <label htmlFor="October">Oct</label>
                  <input
                    onChange={(e) => {
                      updateData(updateStaffNeededData(e.target));
                    }}
                    type="number"
                    min={0}
                    name="October"
                  />
                </div>

                <div className="month-input">
                  <label htmlFor="November">Nov</label>
                  <input
                    onChange={(e) => {
                      updateData(updateStaffNeededData(e.target));
                    }}
                    type="number"
                    min={0}
                    name="November"
                  />
                </div>

                <div className="month-input">
                  <label htmlFor="December">Dec</label>
                  <input
                    onChange={(e) => {
                      updateData(updateStaffNeededData(e.target));
                    }}
                    type="number"
                    min={0}
                    name="December"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="budget-summary-ctn">
          <h3>Nuevo Personal</h3>

          <div className="staff-area-content">
            <p>
              Cargo: <span>{positionStaffForm}</span>{" "}
            </p>
            <p>
              Producción: <span> {areaStaffForm} </span>{" "}
            </p>
            <p>
              Clasificación: <span> {classingStaffForm} </span>{" "}
            </p>
          </div>

          <div className="staff-salary-content">
            <p>
              Referencia Salarial{": "}
              <span>{refsalaryStaffForm.toLocaleString()}</span>{" "}
            </p>
            <p>
              Factor Prestacional{": "}
              <span>{`${facPerformanceStaffForm.toLocaleString()}%`}</span>{" "}
            </p>
            <p>Account: <span>{accountStaffForm}</span></p>
          </div>
          

          <div className="monthly-dropdown-ctn">
            <p></p>
          </div>

          <div className="submit-btns">
            <button
              onClick={(e) => {
                setAddingData(false);
              }}
              className="cancel-btn"
            >
              Cancelar
            </button>
            <button
              onClick={async (e) => {
                try {
                  const postStaff = {
                    area: dataModel.area,
                    position: dataModel.position,
                    classing: dataModel.classing,
                    account: 1232,
                    refsalary: Number(dataModel.refsalary),
                    facperfomance: Number(dataModel.facperfomance),
                    workersneeded: JSON.stringify(dataModel.workersneeded),
                  };

                  await addPositionRequest(postStaff);
                  submitData();
                } catch (error) {
                  console.log(error);
                }
              }}
              className="save-btn"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default BudgetAddStaff;

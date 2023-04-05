import React, { useState, useEffect } from "react";
import "./styles.css";

//Data Model
let model = {
  area: "",
  position: "",
  classing: "",
  account: "",
  refsalary: 0,
  incsalary: 0,
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

function BudgetAddStaff({ setAddingData }) {
  const [dataModel, setDataModel] = useState(model);
  const [areaStaffForm, setAreaStaffForm] = useState("");
  const [positionStaffForm, setPositionStaffForm] = useState("");
  const [classingStaffForm, setClassingStaffForm] = useState("");
  const [refsalaryStaffForm, setRefSalaryStaffForm] = useState(0);
  const [incsalaryStaffForm, setIncSalaryStaffForm] = useState(0);
  const [auxTransStaffForm, setAuxTransStaffForm] = useState(0);
  const [staffNeededForm, setStaffNeededForm] = useState({});

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

    setDataModel(dataValues);
    setPositionStaffForm(dataValues.position);
    setAreaStaffForm(dataValues.area);
    setRefSalaryStaffForm(dataValues.refsalary);
    setIncSalaryStaffForm(dataValues.incsalary);
    setClassingStaffForm(dataValues.classing);
    setAuxTransStaffForm(dataValues.auxtransport);
    setStaffNeededForm(dataValues.workersneeded);
  };

  let updateStaffNeededData = (val) => {
    let result = {};
    let staffNeeded = dataModel.workersneeded;
    let entry = val;

    Object.defineProperty(staffNeeded, entry.name, {
      value: entry.value,
      enumerable: true,
      writable: true,
    });

    result.name = "workersneeded";
    result.value = staffNeeded;
    return result;
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
              <input
                onInput={(e) => {
                  updateData(e.target);
                }}
                type="number"
                name="refsalary"
                placeholder="Referencia Salarial"
                value={refsalaryStaffForm}
              />
              <input
                onInput={(e) => {
                  updateData(e.target);
                }}
                type="text"
                name="area"
                placeholder="Área"
                value={areaStaffForm}
              />
              <input
                onInput={(e) => {
                  updateData(e.target);
                }}
                type="number"
                name="incsalary"
                placeholder="Incremento Salarial"
                value={incsalaryStaffForm}
              />
              <input
                onInput={(e) => {
                  updateData(e.target);
                }}
                type="text"
                name="classing"
                placeholder="Clásificacion Contable"
                value={classingStaffForm}
              />
              <input
                onInput={(e) => {
                  updateData(e.target);
                }}
                type="number"
                name="auxtransport"
                placeholder="Auxilio de Transporte"
                value={auxTransStaffForm}
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
              Producción <span> {areaStaffForm} </span>{" "}
            </p>
            <p>
              Cuenta: <span> {classingStaffForm} </span>{" "}
            </p>
          </div>

          <div className="staff-salary-content">
            <p>
              Referencia Salarial{" "}
              <span>{refsalaryStaffForm.toLocaleString()} </span>{" "}
            </p>
            <p>
              Incremento Salarial{" "}
              <span>{incsalaryStaffForm.toLocaleString()}</span>{" "}
            </p>
            <p>
              Auxilio de Transporte{" "}
              <span> {auxTransStaffForm.toLocaleString()} </span>
            </p>
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
            <button onClick={(e) => {console.log(dataModel)}} className="save-btn">
              Guardar
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default BudgetAddStaff;

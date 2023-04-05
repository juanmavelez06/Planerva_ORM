import React, { useState } from "react";
import "./styles.css";
import { RiContactsBookLine } from "react-icons/ri";

//Data Model
let model = {
  area: "",
  position: "",
  classing: "",
  account: 0,
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

function BudgetAddStaff() {
  const [dataModel, setDataModel] = useState(model);

  let updateData = (v) => {
    let dataValues = dataModel;
    let entry = v;

    Object.defineProperty(dataValues, entry.name, {
      value: entry.value,
      enumerable: true,
      writable: true
    })

    setDataModel(dataValues);
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
                name="cargo"
                placeholder="Cargo"
                value={dataModel.cargo}
              />
              <input
                onInput={(e) => {}}
                type="number"
                name="refsalary"
                placeholder="Referencia Salarial"
              />
              <input type="text" name="area" placeholder="Área" />
              <input
                type="number"
                name="incsalary"
                placeholder="Incremento Salarial"
              />
              <input
                type="text"
                name="classing"
                placeholder="Clásificacion Contable"
              />
              <input
                type="number"
                name="auxtransport"
                placeholder="Auxilio de Transporte"
              />
            </div>

            <div className="staff-needed-section">
              <h3>Requerimiento de Posición</h3>

              <div className="staff-needed-inputs">
                <div className="month-input">
                  <label htmlFor="January">Ene</label>
                  <input type="number" name="January" />
                </div>

                <div className="month-input">
                  <label htmlFor="February">Feb</label>
                  <input type="number" name="February" />
                </div>

                <div className="month-input">
                  <label htmlFor="March">Mar</label>
                  <input type="number" name="March" />
                </div>

                <div className="month-input">
                  <label htmlFor="April">Abr</label>
                  <input type="number" name="April" />
                </div>

                <div className="month-input">
                  <label htmlFor="May">May</label>
                  <input type="number" name="May" />
                </div>

                <div className="month-input">
                  <label htmlFor="June">Jun</label>
                  <input type="number" name="June" />
                </div>

                <div className="month-input">
                  <label htmlFor="July">Jul</label>
                  <input type="number" name="July" />
                </div>

                <div className="month-input">
                  <label htmlFor="August">Ago</label>
                  <input type="number" name="August" />
                </div>

                <div className="month-input">
                  <label htmlFor="September">Sep</label>
                  <input type="number" name="September" />
                </div>

                <div className="month-input">
                  <label htmlFor="October">Oct</label>
                  <input type="number" name="October" />
                </div>

                <div className="month-input">
                  <label htmlFor="November">Nov</label>
                  <input type="number" name="November" />
                </div>

                <div className="month-input">
                  <label htmlFor="December">Dec</label>
                  <input type="number" name="December" />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="budget-summary-ctn">
          <h3>Nuevo Personal</h3>

          <div className="staff-area-content">
            <p>
              Cargo: <span>{dataModel.cargo}</span>{" "}
            </p>
            <p>
              Producción <span>Producción</span>{" "}
            </p>
            <p>
              Cuenta: <span>MOA</span>{" "}
            </p>
          </div>

          <div className="staff-salary-content">
            <p>
              Referencia Salarial <span>1,000,000</span>{" "}
            </p>
            <p>
              Incremento Salarial <span>12%</span>{" "}
            </p>
            <p>
              Auxilio de Transporte <span>100,000</span>
            </p>
          </div>

          <div className="monthly-dropdown-ctn">
            <p>DropDown</p>
          </div>

          <div className="submit-btns">
            <button className="cancel-btn">Cancelar</button>
            <button className="save-btn">Guardar</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default BudgetAddStaff;

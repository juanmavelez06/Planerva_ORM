import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import "./index.css";

function BudgetStaffFilters({ data }) {
  const [filters, setFilters] = useState({
    areaFilters: [],
    positionFilters: [],
    classingFilters: []
  });

  //Handle Filters
  let filterControl = (f) => {
    let filterList;
    let dataset = data;
    let areaFilters = filters.areaFilters;
    let positionFilters = filters.positionFilters;
    let classingFilters = filters.classingFilters;
    let target = f.target;
    let result;

    // console.log(target.dataset.filter, target.checked);

    //Area Control
    if (target.dataset.filter === "areaControl") {
      if (target.checked) {
        areaFilters.push(target.dataset.area);
      } else {
        areaFilters = areaFilters.filter(
          (value) => value != target.dataset.area
        );
      }
    }

    //Position Control
    if (target.dataset.filter === "positionControl") {
      if (target.checked) {
        positionFilters.push(target.dataset.position);
      } else {
        positionFilters = positionFilters.filter(
          (value) => value != target.dataset.position
        );
      }
    }

    //Classing Control
    if (target.dataset.filter === "classingControl"){
        if (target.checked){
            classingFilters.push(target.dataset.classing);
        } else{
            classingFilters = classingFilters.filter(
                (value) => value != target.dataset.classing
            )
        }
    }

    //Monthly Control

    //Set Filter List
    filterList = {
      areaFilters: areaFilters,
      positionFilters: positionFilters,
    };
    setFilters(filterList);

    // if (areaFilters && areaFilters.length > 0) {
    //     result = dataset.filter((value) => areaFilters.indexOf(value.area) != -1);
    // }

    // let filterList = {
    //     areaFilters: areaFilters
    // };

    // console.log(result);
    // setFilters(areaFilters);
    // console.log(areaFilters);

    //   console.log(e.target.parentElement)
  };

  //Find Match

  //Remove Duplicates
  let removeDuplicates = (arr) => {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  };

  //Get Areas
  let getAreas = (data) => {
    let areas = [];

    data.map((element) => {
      areas.push(element.area);
      areas = removeDuplicates(areas);
    });

    return areas;
  };
  //Get Classing
  let getClassing = (data) => {
    let classings = [];

    data.map((element) => {
      classings.push(element.classing);
      classings = removeDuplicates(classings);
    });

    return classings;
  };

  return (
    <div className="staff-filters">
      {/* {console.log(filters)} */}
      {/* Area Selector */}
      <div className="areaSelector">
        <button className="filter">
          Área <RiArrowDropDownLine />
        </button>
        <ul className="filter-checkbox area-filter">
          {getAreas(data).map((e) => {
            return (
              <li key={e}>
                <p>{e}</p>
                <input
                  data-area={e}
                  data-filter={"areaControl"}
                  type="checkbox"
                  onChange={(e) => filterControl(e)}
                />
              </li>
            );
          })}
        </ul>
      </div>

      {/* Position Selector */}
      <div className="cargoSelector">
        <button className="filter green-theme">
          Cargo <RiArrowDropDownLine />
        </button>

        <ul className="filter-checkbox cargo-filter">
          {data.map((e) => {
            return (
              <li key={e.id}>
                <p>{e.position}</p>
                <input
                  data-position={e.position}
                  data-filter={"positionControl"}
                  type="checkbox"
                  onChange={(e) => filterControl(e)}
                />
              </li>
            );
          })}
        </ul>
      </div>

      {/* Classing Selector */}
      <div className="classSelector">
        <button className="filter">
          Clasificación <RiArrowDropDownLine />
        </button>

        <ul className="filter-checkbox class-filter">
          {getClassing(data).map((e) => {
            return (
              <li key={e}>
                <p>{e}</p>
                <input
                  data-position={e}
                  data-filter={"classingControl"}
                  type="checkbox"
                  onChange={(e) => filterControl(e)}
                />
              </li>
            );
          })}
        </ul>
      </div>

      {/* Month Selector */}
      <div className="monthSelector">
        <button className="green-theme filter">
          Mes <RiArrowDropDownLine />
        </button>

        <ul className="filter-checkbox month-filter">
          <li>
            <p>MOA</p>
            <input
              data-area={"Asistente Contable"}
              data-filter={"areaControl"}
              type="checkbox"
              onChange={(e) => filterControl(e)}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default BudgetStaffFilters;

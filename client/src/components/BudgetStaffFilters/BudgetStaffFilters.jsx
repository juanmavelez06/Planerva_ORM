import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import "./index.css";

function BudgetStaffFilters({ data, dataFiltered, setDataFiltered }) {
  const [filters, setFilters] = useState({
    areaFilters: [],
    positionFilters: [],
    classingFilters: [],
    monthsFilter: [],
  });

  //Handle Filters
  let filterControl = (f) => {
    try {
      let filterList;
      let dataset = data;
      let areaFilters = filters.areaFilters;
      let positionFilters = filters.positionFilters;
      let classingFilters = filters.classingFilters;
      let monthsFilter = filters.monthsFilter;
      let target = f.target;
      let filterResult = [];

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
      if (target.dataset.filter === "classingControl") {
        if (target.checked) {
          classingFilters.push(target.dataset.classing);
        } else {
          classingFilters = classingFilters.filter(
            (value) => value != target.dataset.classing
          );
        }
      }

      //Month Control
      if (target.dataset.filter === "monthsFilter") {
        if (target.checked) {
          monthsFilter.push(target.dataset.month);
        } else {
          monthsFilter = monthsFilter.filter(
            (value) => value != target.dataset.month
          );
        }
      }

      //Set Filter List
      filterList = {
        areaFilters: areaFilters,
        positionFilters: positionFilters,
        classingFilters: classingFilters,
        monthsFilter: monthsFilter,
      };
      setFilters(filterList);

      //Filter Logic
      let isAreaFilter = areaFilters && areaFilters.length > 0 ? true : false; // * - Is Area being filtered?
      let isPositionFilter =
        positionFilters && positionFilters.length > 0 ? true : false; // * - Is position being filtered
      let isClassingFilter =
        classingFilters && classingFilters.length > 0 ? true : false; // * - Is classing being filtered
      let isMonthsFilter =
        monthsFilter && monthsFilter.length > 0 ? true : false; // * - Is months being filtered

      // console.log(
      //   isAreaFilter,
      //   isPositionFilter,
      //   isClassingFilter,
      //   isMonthsFilter
      // );

      //Intentar arrastrar condicionales
      if (isAreaFilter) {
        dataset = dataset.filter(
          (value) => areaFilters.indexOf(value.area) != -1
        );
      }
      if (isPositionFilter) {
        dataset = dataset.filter(
          (value) => positionFilters.indexOf(value.position) != -1
        );
      }
      if (isClassingFilter) {
        dataset = dataset.filter(
          (value) => classingFilters.indexOf(value.classing) != -1
        );
      }

      if (isMonthsFilter) {
        dataset.map((element) => {
          let workersFiltered = {};

          Object.entries(element.workersneeded).forEach((e) => {
            let monthName = e[0];
            if (monthsFilter.indexOf(e[0]) != -1) {
              workersFiltered[monthName] = e[1];
            } else {
              workersFiltered[monthName] = 0;
            }
          });

          let newElement = {
            id: element.id,
            area: element.area,
            position: element.position,
            classing: element.classing,
            account: element.account,
            refsalary: element.refsalary,
            facperformance: element.facperformance,
            workersneeded: workersFiltered,
            createdAt: element.createdAt,
            updatedAt: element.updatedAt,
          };

          filterResult.push(newElement);
        });

        dataset = [];
        dataset = filterResult;
      }

      setDataFiltered(dataset);
      console.log(dataset);
    } catch (error) {
      console.log(error);
    }
  };

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

  // Get Months
  let getMonths = (data) => {
    try {
      let months;
      if (!data || data.length < 1) {
        months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
      } else {
        months = Object.keys(data[0].workersneeded);
      }
      return months;
    } catch (error) {}
  };

  return (
    <div className="staff-filters">
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
                  data-classing={e}
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
          {getMonths(data).map((e) => {
            return (
              <li key={e}>
                <p>{e}</p>
                <input
                  data-month={e}
                  data-filter={"monthsFilter"}
                  type="checkbox"
                  onChange={(e) => filterControl(e)}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default BudgetStaffFilters;

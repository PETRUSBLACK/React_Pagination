import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
// import * as ReactBootStrap from "react-bootstrap";

const App = () => {
  const [devs, setDevs] = useState([]);
//   const [loading, setLoading] = useState(false);
  const getPlayerData = async () => {
    try {
      const info = await axios.get(
        "https://swapi.dev/api/planets"
      );
      console.log(info.data.results);
      setDevs(info.data.results);
    } catch (e) {
      console.log(e);
    }
  };
  const sizePerPage = 5;
  const pageOptions = {
    sizePerPage: sizePerPage,
    totalSize: devs.length,
  };
  const columns = [
    { dataField: "name", text: "Name" },
    { dataField: "rotation_period", text: "Rotation period" },
    { dataField: "orbital_period", text: "Orbital period" },
    { dataField: "diameter", text: "Diameter" },
    { dataField: "climate", text: "Climate" },
  ];

  useEffect(() => {
    getPlayerData();
  }, []);

  return (
    <div className="App">
      <BootstrapTable
        keyField="name"
        data={devs}
        columns={columns}
        pagination={paginationFactory(pageOptions)}
      />
      <PaginationListStandalone/>
    </div>
  );
};

export default App;

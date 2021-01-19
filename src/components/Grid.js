import React, { useState, useContext, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { store } from "../store.js";
import DeleteButton from '../components/DeleteButton';

function Grid() {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  // Row Data From Reducer
  const globalState = useContext(store);
  console.log("GLOBAL STATE", globalState);

  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }

  const frameworkComponents =  {
    deleteButton: DeleteButton
  }

  const columnDefs = [
    {
      headerName: "Item",
      field: "item",
      sortable: true
    },
    {
      headerName: "Category",
      field: "category",
      sortable: true
    },
    {
      headerName: "price",
      field: "price",
      sortable: true
    },
    {
      headerName: "Delete",
      field: "delete",
      cellRenderer: "deleteButton",
      cellRendererParams: {
        clicked: (field) => {
          alert(`${field} was clicked`);
        }
      },
      minWidth: 150
    },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 900 }}>
      <AgGridReact
        onGridReady={onGridReady}
        rowData={globalState?.state.data}
        columnDefs={columnDefs}
        frameworkComponents={frameworkComponents}
      />
    </div>
  );
}

export default Grid;

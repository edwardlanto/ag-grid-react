import React, { useState, useContext, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { store } from "../store.js";
import DeleteButton from '../components/DeleteButton';

function Grid() {
  const [gridApi, setGridApi] = useState();
  const [columnApi, setColumnApi] = useState();

  // Row Data From Reducer
  const globalState = useContext(store);

  const frameworkComponents =  {
    deleteButton: DeleteButton
  }

  const columnDefs = [
    {
      headerName: "Item",
      field: "item",
      sortable: true,
      headerCheckboxSelection: true
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
    }
  ];

  function getSelectedRows(){
    console.log(gridApi.getSelectedNodes())
  }

  return (
    <>
    <div className="ag-theme-alpine" style={{ height: 400, width: 900 }}>
      <AgGridReact
        rowData={globalState?.state.data}
        columnDefs={columnDefs}
        rowSelection="multiple"
        frameworkComponents={frameworkComponents}
        onGridReady={params => {
          setGridApi(params.api);
          setColumnApi(params.columnApi);
        }}
      />
    </div>
    <button onClick={getSelectedRows}>GET SELECTED ROWS</button>
    </>
  );
}

export default Grid;

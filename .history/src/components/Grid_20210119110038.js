import React, { useState, useContext, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { store } from "../store.js";

function Grid() {

  // Grid constants
  const [gridApi, setGridApi] = useState();
  const [columnApi, setColumnApi] = useState();
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

  // Store of truth
  const globalState = useContext(store);
  const { dispatch } = globalState;

  function deleteSelectedRows(){
    const selectedNodes = gridApi.getSelectedNodes();
    let selectedData = selectedNodes.map(node => node.Data);

    console.log(selectedNodes);
    try{

      dispatch({
        type: "DELETE",
        rows: selectedNodes 
      });

    }catch(err){

    }
  }

  return (
    <>
    <div className="ag-theme-alpine" style={{ height: 400, width: 900 }}>
      <AgGridReact
        rowData={globalState?.state.data}
        columnDefs={columnDefs}
        rowSelection="single"
        onGridReady={params => {
          setGridApi(params.api);
          setColumnApi(params.columnApi);
        }}
        suppressRowDeselection={true}
      />
    </div>
    <button onClick={deleteSelectedRows}>GET SELECTED ROWS</button>
    </>
  );
}

export default Grid;

import React, { useState, useContext, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { store } from "../store.js";

function Grid() {
  // Grid constants
  const [gridApi, setGridApi] = useState();
  const [columnApi, setColumnApi] = useState();
  const [selected, setSelected] = useState(false);
  const columnDefs = [
    {
      headerName: "Item",
      field: "item",
      sortable: true,
      headerCheckboxSelection: true,
    },
    {
      headerName: "Category",
      field: "category",
      sortable: true,
    },
    {
      headerName: "price",
      field: "price",
      sortable: true,
    },
  ];

  // Store of truth
  const globalState = useContext(store);
  const { dispatch } = globalState;

  function deleteSelectedRows() {
    const selectedNodes = gridApi.getSelectedNodes();
    let selectedIndex = selectedNodes.map((node) => node.rowIndex);
    try {
      dispatch({
        type: "DELETE",
        row: selectedIndex,
      });
    } catch (err) {
      console.log(err);
    }
  }

  function rowSelectionCallback() {
    const rows = gridApi.getSelectedRows();
    console.log('rows', rows)
    if(rows.length < 1){
      setSelected(false);
    }else{
      setSelected(true);
    }

  }

  return (
    <>
      {selected && (
        <button onClick={deleteSelectedRows} id="deleteButton">
          Delete Row
        </button>
      )}
      <div className="ag-theme-alpine" style={{ height: 400, width: 900 }}>
        <AgGridReact
          rowData={globalState?.state.data}
          columnDefs={columnDefs}
          rowSelection="single"
          onGridReady={(params) => {
            setGridApi(params.api);
            setColumnApi(params.columnApi);
          }}
          onRowSelected={rowSelectionCallback}
        />
      </div>
    </>
  );
}

export default Grid;

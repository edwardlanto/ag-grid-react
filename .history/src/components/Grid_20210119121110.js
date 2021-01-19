import React, { useState, useContext, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { store } from "../store.js";
import Button from '@material-ui/core/Button';

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
      setSelected(false);
    } catch (err) {
      console.log(err);
    }
  }

  function rowSelectionCallback() {
    const rows = gridApi.getSelectedRows();
    if(rows.length < 1){
      setSelected(false);
    }else{
      setSelected(true);
    }

  }

  return (
    <>
      {selected && (
        <Button onClick={deleteSelectedRows} id="deleteButton">
          Delete Row
        </Button>
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
          suppressHorizontalScroll={false}
          enableSorting={false}
        />
      </div>
    </>
  );
}

export default Grid;
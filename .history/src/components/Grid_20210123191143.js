/* eslint-disable no-unused-vars */
import React, { useState, useContext} from "react";
import { AgGridReact } from "ag-grid-react";
import { store } from "../store.js";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles'

function Grid() {
  // Error
  const [error, setError] = useState(null);
  // Grid constants
  const [gridApi, setGridApi] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [columnApi, setColumnApi] = useState();
  const [selected, setSelected] = useState(false);
  const columnDefs = [
    {
      headerName: "Item",
      field: "item",
      headerCheckboxSelection: true,
    },
    {
      headerName: "Category",
      field: "category"
    },
    {
      headerName: "price",
      field: "price"
    },
  ];

  // Store of truth
  const globalState = useContext(store);
  const { dispatch } = globalState;

  function deleteSelectedRows() {
    let selectedNodes = gridApi.getSelectedNodes();
    selectedNodes = selectedNodes.map((node) => node.data);
    try {
      for (let j = 0; j < selectedNodes.length; j++) {
        dispatch({
          type: "DELETE",
          data: selectedNodes[j]
        });
      }

      setSelected(false);
    } catch (err) {
      setError(err);
    }
  }

  function rowSelectionCallback() {
    const rows = gridApi.getSelectedRows();
    if (rows.length < 1) {
      setSelected(false);
    } else {
      setSelected(true);
    }
  }

  function onGridReady(params) {
    setGridApi(params.api);
    setColumnApi(params.columnApi);
  }

  const defaultColDef = {
    flex: 1,
    minWidth: 150,
    sortable: true
  };

  return (
    <>
      <Button onClick={deleteSelectedRows} color="secondary" disabled={!selected}>
        Delete Row
      </Button>
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          rowData={globalState.state.data}
          columnDefs={columnDefs}
          rowSelection="multiple"
          onGridReady={onGridReady}
          onRowSelected={rowSelectionCallback}
          suppressHorizontalScroll={false}
          enableSorting={false}
          defaultColDef={defaultColDef}
        />
      </div>
      <span className="error">{error && error}</span>
    </>
  );
}

export default Grid;

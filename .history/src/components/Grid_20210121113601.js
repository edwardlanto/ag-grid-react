import React, { useState, useContext } from "react";
import { AgGridReact } from "ag-grid-react";
import { store } from "../store.js";
import Button from '@material-ui/core/Button';

function Grid() {

  // Error
  const [error, setError] = useState(null);
  // Grid constants
  const [gridApi, setGridApi] = useState();
  // eslint-disable-next-line no-unused-vars
  const [columnApi, setColumnApi] = useState();
  const [selected, setSelected] = useState(false);
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
    let selectedNodes = gridApi.getSelectedNodes();
    selectedNodes = selectedNodes.map((node) => node);
    try {
      dispatch({
        type: "DELETE",
        rows: selectedNodes
      });
      setSelected(false);

    } catch (err) {
      setError(err)
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
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          rowData={globalState?.state.data}
          columnDefs={columnDefs}
          rowSelection="multiple"
          onGridReady={(params) => {
            setGridApi(params.api);
            setColumnApi(params.columnApi);
          }}
          onRowSelected={rowSelectionCallback}
          suppressHorizontalScroll={false}
          enableSorting={false}
        />
      </div>
      <span className="error">{error && error}</span>
    </>
  );
}

export default Grid;

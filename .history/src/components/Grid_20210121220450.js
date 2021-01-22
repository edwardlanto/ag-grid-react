import React, { useState, useContext, useEffect, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { store } from "../store.js";
import Button from '@material-ui/core/Button';
function Grid() {
  // Error
  const [error, setError] = useState(null);
  // Grid constants
  const [gridApi, setGridApi] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [columnApi, setColumnApi] = useState();
  const [rows, setRows] = useState(null);
  const [selected, setSelected] = useState(false);
  const columnDefs = [
    {
      headerName: "Item",
      field: "item",
      sortable: true,
      headerCheckboxSelection: true,
      filter: true
    },
    {
      headerName: "Category",
      field: "category",
      sortable: true,
      filter: true
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
    let arr = globalState.state.data;
    selectedNodes = selectedNodes.map((node) => parseInt(node.id));
    let selectedNodesTest = selectedNodes.map((node) => parseInt(node));
    console.log('selected nodes', selectedNodes);
    console.log('selectedNodes test', selectedNodesTest)
    try {
      for(let i = 0; i < arr.length; i ++){
        arr[i].id = i;
        for(let j = 0; j < selectedNodes.length; j++){
          console.log(arr[i].id, selectedNodes[j])
          if(arr[i].id === selectedNodes[j]){
            arr.splice(i + 1, 1)
            dispatch({
              type: "DELETE",
              data: arr
            });
          }
        }
      }

      console.log('arr', arr)

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

  function onGridReady(params){
    setGridApi(params.api);
    setColumnApi(params.columnApi);
  }

  const defaultColDef = {
    flex: 1,
    minWidth: 150,
    filter: true
  }

  return (
    <>
        <Button onClick={deleteSelectedRows} id="deleteButton">
          Delete Row
        </Button>
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
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

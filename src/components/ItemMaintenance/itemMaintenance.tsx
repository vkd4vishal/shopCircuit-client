import { WithStyles, withStyles, StyleRules } from "@mui/styles";
import * as React from "react";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import axios from "axios";
import { Button, Collapse, Alert, Snackbar,Dialog,DialogTitle,DialogContent,DialogActions,DialogContentText } from "@mui/material";

const styles: StyleRules = {
  root: {},
  itemList: {
    // display: "flex",
    // flexDirection: "row-reverse"
    paddingRight: "5%",
  },
  deleteButton: {
    float: "right",
  },
};
const columns: GridColumns = [
  {
    field: "itemName",
    headerName: "Item Name",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  
  {
    field: "brand",
    headerName: "Brand",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "categoryName",
    headerName: "Category",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  //   {
  //     field: "price",
  //     headerName: "Price",
  //     type: "number",
  //     flex: 0.5,
  //     headerAlign: "center",
  //     align: "center",
  //   },
  //   {
  //     field: "weight",
  //     headerName: "Weight",
  //     type: "number",
  //     flex: 0.5,
  //     headerAlign: "center",
  //     align: "center",
  //   },
];

interface ItemMaintenanceProp extends WithStyles<typeof styles> {}
const ItemMaintenanceFormView: React.FC<ItemMaintenanceProp> = ({
  classes,
}) => {
  const [items, setItems] = React.useState([]);
  const [selectedRecords, setSelectedRecords] = React.useState([]);
  const [dataReloaded, setDataReloaded] = React.useState(true);
  const [deleteConfirmation, setDeleteConfirmation] = React.useState(false);
  const [serverData, setServerData] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [failure, setFailure] = React.useState(false);
  const getData =  () => {
      axios
      .get("/getItems?sellerId=61b064ae6822a02a735fe011")
      .then((res) => {
        const result = res.data.data.data;
        const itemsList = result.map((item: any) => {
          return { id: item._id, ...item };
        });
        setItems(itemsList);
        setDataReloaded(false);
        setDataReloaded(true);
        setSelectedRecords([])
      });
  };
  const deleteItems =  () => {
    setDeleteConfirmation(false)
    axios
    .post("/deleteItems",{
      items: selectedRecords
    },{
      headers:{
        userid:'61b064ae6822a02a735fe011',
        token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiMDY0YWU2ODIyYTAyYTczNWZlMDExIn0sImlhdCI6MTYzOTE2MTg4MywiZXhwIjoxNjM5MTk3ODgzfQ.9j3HEsxEIz-YgY3v3wExRTMNdxwO3UwJLT3BnW6JW8Q'
      }
    })
    .then((response) => {
      if(response.status === 200){

        setSuccess(true);
        setServerData(response.data.message);
        getData()
      } else {
          alert(response);
        }
    }).catch((error) => {
      setFailure(true);
      setServerData(JSON.stringify(error.response.data.message));
    });;
};
const showDeleteConfirmation = ()=>{
  setDeleteConfirmation(true)
}
const hideDeleteConfirmation = ()=>{
  setDeleteConfirmation(false)
}
const handleClose = () => {
  setSuccess(false);
  setFailure(false);
};
  return (
    <div style={{ height: "90%", width: "100%" }}>
      <Snackbar
      open={success || failure}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{horizontal:'right',vertical:'top'}}
    >
      <Alert
        onClose={handleClose}
        severity={success ? "success" : "error"}
        sx={{ width: "100%" }}
        variant="filled"
      >
        {serverData}
      </Alert>
    </Snackbar>
      <Button onClick={getData}>Reload Items</Button>
      <Collapse in={selectedRecords.length === 0 ? false : true}>
        <Button className={classes.deleteButton} onClick={showDeleteConfirmation}>DELETE</Button>
      </Collapse>
      <Dialog
        open={deleteConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete selected items?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Deleted items can not be recovered.
          </DialogContentText>
        </DialogContent> 
        <DialogActions>
          <Button onClick={hideDeleteConfirmation}>CANCEL</Button>
          <Button onClick={deleteItems}  autoFocus>
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
      {dataReloaded ? (
        <DataGrid
        
          sx={{
            m: 2,
            "& .MuiDataGrid-selectedRowCount": {
              // backgroundColor: 'rgba(255, 7, 0, 0.55)',
              marginBottom: "35px",
            },
          }} 
          rows={items}
          columns={columns}
          sortingMode="server"
          // pageSize={5}
          // rowsPerPageOptions={[5]}
          checkboxSelection
          className={classes.itemList}
          hideFooterPagination={false}
          paginationMode={"server"}
          onSelectionModelChange={(ids: any) => {
            setSelectedRecords(ids);
          }}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

const ItemMaintenanceForm = withStyles(styles)(ItemMaintenanceFormView);
export default ItemMaintenanceForm;

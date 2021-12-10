import { WithStyles, withStyles, StyleRules } from "@mui/styles";
import * as React from "react";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import axios from "axios";
import { Button, Collapse } from "@mui/material";
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
    field: "category",
    headerName: "Category",
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
  const [deleteButton, setDeleteButton] = React.useState(0);
  const [dataReloaded, setDataReloaded] = React.useState(true);
  const getData =  () => {
      axios
      .get("/getItems?sellerId=61b064ae6822a02a735fe011")
      .then((res) => {
        const result = res.data.data.data.docs;
        const itemsList = result.map((item: any) => {
          return { id: item._id, ...item };
        });
        setItems(itemsList);
        setDataReloaded(false);
        setDataReloaded(true);
        setDeleteButton(0)
      });
  };
   
  return (
    <div style={{ height: "90%", width: "100%" }}>
      <Button onClick={getData}>Reload Items</Button>
      <Collapse in={deleteButton === 0 ? false : true}>
        <Button className={classes.deleteButton}>DELETE</Button>
      </Collapse>
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
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          className={classes.itemList}
          hideFooterPagination={true}
          paginationMode={"server"}
          onSelectionModelChange={(ids: any) => {
            setDeleteButton(ids.length);
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

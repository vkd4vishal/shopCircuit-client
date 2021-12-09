import { WithStyles, withStyles, StyleRules } from "@mui/styles";
import * as React from "react";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import axios from "axios";
import { Button } from "@mui/material";
const styles: StyleRules = {
  root: {},
  itemList: {
    // display: "flex",
    // flexDirection: "row-reverse"
    paddingRight: "5%",
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
  const getData = async () => {
    await axios
      .get("/getItems?sellerId=619f2c776c46367d61e27e0e")
      .then((res) => {
        const result = res.data.data.data.docs;
        const itemsList = result.map((item: any) => {
          return { id: item._id, ...item };
        });
        setItems(itemsList);
      });
  };

  return (
    <div style={{ height: "90%", width: "100%" }}>
      <Button onClick={getData}>Reload Items</Button>
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
      />
    </div>
  );
};

const ItemMaintenanceForm = withStyles(styles)(ItemMaintenanceFormView);
export default ItemMaintenanceForm;

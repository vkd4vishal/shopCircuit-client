import {
  Alert,
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TablePagination,
} from "@mui/material";
import { StyleRules, WithStyles, withStyles } from "@mui/styles";
import { DataGrid, GridColumns, GridSortModel } from "@mui/x-data-grid";
import axios from "axios";
import * as React from "react";
import SearchBarForm from "../searchBar/searchBar";
import { useNavigate  } from "react-router-dom";
import Cookies from "universal-cookie";

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
  table: {
    display: "flex",
    flexDirection: "column",
  },
};
const renderDetailsButton = () => {
  return (
      <strong>
          <Button
              variant="contained"
              color="info"
              size="small"
              onClick={(res)=>console.log(res)}
          >
              EDIT
          </Button>
      </strong>
  )
}
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
    sortable: false,
  },
  {
    field: 'editButton',
    headerName: '',
    flex: 0.2,
    renderCell: renderDetailsButton,  
},
  //   {
  //     field: "weight",
  //     headerName: "Weight",
  //     type: "number",
  //     flex: 0.5,
  //     headerAlign: "center",
  //     align: "center",
  //   },
];

interface ItemListProp extends WithStyles<typeof styles> {}
const ItemListFormView: React.FC<ItemListProp> = ({
  classes,
}) => {
  const cookies = new Cookies();
  const token = cookies.get("token")
  const navigate = useNavigate();
  const [items, setItems] = React.useState([]);
  const [selectedRecords, setSelectedRecords] = React.useState([]);
  const [dataReloaded, setDataReloaded] = React.useState(true);
  const [deleteConfirmation, setDeleteConfirmation] = React.useState(false);
  const [serverData, setServerData] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [failure, setFailure] = React.useState(false);
  const [rowCount, setRowCount] = React.useState(0);
  const [pageLimit, setPageLimit] = React.useState(25);
  const [count, setCount] = React.useState(0);
  const [search,setSearch]=React.useState("")
  const [category, setCategory] = React.useState('0');
  const [categoryList, setCategoryList] = React.useState([
    {
      _id:'0',
      categoryName: "ALL",
    },
  ]);
  // var pageLimit =5
  const [page, setPage] = React.useState(0);
  const [sortObject, setSortObject] = React.useState<GridSortModel>([
    {
      field: "itemName",
      sort: "asc",
    },
  ]);
  const getCategories = () => {
    axios.get("/getCategories").then((res) => {
      const result = res.data.data.data.docs.map((category: any) => {
        return { _id: category._id, categoryName: category.categoryName };
      });
      setCategoryList([{
        _id:'0',
        categoryName: "ALL",
      }, ...result]);
    });
  };
  React.useEffect(() => {
    getCategories();
  }, []);
  const getData = () => {
    let getUrl = `/getItems?sellerId=61b064ae6822a02a735fe011&limit=${pageLimit}&page=${
      page + 1
    }&sort=${sortObject[0].field}&order=${
      sortObject[0].sort ?? "asc"
    }&search=${search}`;
    if (category !== '0') {
      getUrl = getUrl + `&category=${category}`;
    }
    axios.get(getUrl).then((res) => {
      const result = res.data.data.data;
      const itemsList = result.map((item: any) => {
        return { id: item._id, ...item };
      });
      setItems(itemsList);
      setCount(res.data.data.totalDocs);
      setDataReloaded(false);
      setDataReloaded(true);
      setSelectedRecords([]);
      setRowCount(res.data.data.totalDocs);
    });
  };
  React.useEffect(() => {
    getData();
  }, [pageLimit, page, sortObject,category,search]);
  const deleteItems = () => {
    setDeleteConfirmation(false);
    axios
      .post(
        "/deleteItems",
        {
          items: selectedRecords,
        },
        {
          headers: {
            token
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setSuccess(true);
          setServerData(response.data.message);
          getData();
        } else {
          alert(response);
        }
      })
      .catch((error) => {
        setFailure(true);
        setServerData(JSON.stringify(error.response.data.message));
      });
  };
  const showDeleteConfirmation = () => {
    setDeleteConfirmation(true);
  };
  const hideDeleteConfirmation = () => {
    setDeleteConfirmation(false);
  };

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
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
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
        <Button
          className={classes.deleteButton}
          onClick={showDeleteConfirmation}
        >
          DELETE
        </Button>
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
          <Button onClick={deleteItems} autoFocus>
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
      
      <SearchBarForm setIsSearch={setSearch} label={'Search by item name or brand...'}/>
      {dataReloaded ? (
        
        <div className={classes.table}>
          <div
            style={{
              // border: "1px solid red",
              height: `${(items.length + 3) * 52}px`,
            }}
          >
            
            <Box  >
              <FormControl >
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Category"
                  onChange={(change) => setCategory(change.target.value)}
                >
                  {categoryList.map((category) => {
                    return (
                      <MenuItem value={category._id}>
                        {category.categoryName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
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
              sortModel={sortObject}
              rowCount={rowCount}
              disableColumnFilter={false}
              disableColumnSelector={true}
              disableColumnMenu={true}
              checkboxSelection
              className={classes.itemList}
              onSelectionModelChange={(ids: any) => {
                setSelectedRecords(ids);
              }}
              hideFooterPagination={true}
              onSortModelChange={(model, details) => {
                setSortObject(model);
              }}
              disableSelectionOnClick={true}
              onCellClick={(params,event,details)=>{
                if(params.field === 'editButton'){
                  navigate(`/seller/item-maintenance`,{state:{id: params.id}});  
                }
              }}
            />
          </div>
          <TablePagination
            // style={{ border: "1px solid blue" }}
            component="div"
            count={count}
            page={page}
            onPageChange={(event, page) => {
              setPage(page);
            }}
            rowsPerPage={pageLimit}
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            onRowsPerPageChange={(pageSize) => {
              setPageLimit(Number(pageSize.target.value));
              setPage(0);
            }}
            showFirstButton={true}
            showLastButton={true}
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

const ItemListForm = withStyles(styles)(ItemListFormView);
export default ItemListForm;

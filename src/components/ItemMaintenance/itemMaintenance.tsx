import { WithStyles, withStyles } from "@mui/styles";
import { useLocation } from "react-router-dom";
import axios from "axios";
import * as React from "react";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const styles = {
  root: {
    height: "400px",
    width: "600px",
  },
  image: {
    height: "400px",
  },
};
interface ItemMaintenanceProp extends WithStyles<typeof styles> {}
const ItemMaintenanceFormView: React.FC<ItemMaintenanceProp> = ({
  classes,
}) => {
  const { state }: { state: any } = useLocation();
  const [category, setCategory] = React.useState("0");
  const [categoryList, setCategoryList] = React.useState([
    {
      _id: "0",
      categoryName: "ALL",
    },
  ]);
  const [itemDetails, setItemDetails] = React.useState({
    itemName: "",
    brand: "",
    price: 0,
    weight: 0,
  });
  const [fetched, setFetched] = React.useState(false);
  const [showImage, setShowImage] = React.useState([{ source: "" }]);
  const getCategories = () => {
    axios.get("/getCategories").then((res) => {
      const result = res.data.data.data.docs.map((category: any) => {
        return { _id: category._id, categoryName: category.categoryName };
      });
      setCategoryList([
        {
          _id: "0",
          categoryName: "ALL",
        },
        ...result,
      ]);
    });
  };
  React.useEffect(() => {
    getCategories();
  }, []);
  // const cookies = new Cookies();
  const id = state.id;

  const getItemImage = (itemimageid: string) => {
    axios
      .get("/getItemImage", {
        headers: {
          itemimageid,
        },
        responseType: "arraybuffer",
      })
      .then((res) => {
        const base64 = btoa(
          new Uint8Array(res.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          ) 
        );
        setShowImage([...showImage, { source: "data:;base64," + base64 }]);
        setFetched(true);

      });
  };
  const getItemDetails = () => {
    axios
      .get("/getItemDetails", {
        headers: {
          itemid: id,
        },
      }) 
      .then((res) => {
        setItemDetails(res.data.data.itemDetails);
        setCategory(res.data.data.itemDetails.category);
        setShowImage([])
        res.data.data.itemImages.forEach((image: any) => {
          getItemImage(image._id);
        });
      });
  };
  React.useEffect(() => {
    getItemDetails(); 
  }, []);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      itemName: data.get("itemName"),
      brand: data.get("brand"),
      price: data.get("price"),
      weight: data.get("weight"),
      category,
    });
  };
  return (
    <div className={classes.root}>
      {fetched &&
        showImage.map((image:any) => {

          return (
            <img
              className={classes.image}
              src={image.source}
              alt="item image"
            /> 
          );
        })}
      <form onSubmit={handleSubmit}>
        <TextField
          required
          fullWidth
          id="itemName"
          label="Item Name"
          autoFocus 
          size="small"
          style={{ marginTop: "10px" }}
          value={itemDetails.itemName}
          InputLabelProps={{ shrink: true }}
          name="itemName"
          onChange={(event) => {
            setItemDetails({ ...itemDetails, itemName: event.target.value });
          }}
        />
        <TextField
          name="brand"
          required
          fullWidth
          id="brand"
          label="Brand"
          autoFocus
          size="small"
          style={{ marginTop: "10px" }}
          InputLabelProps={{ shrink: true }}
          value={itemDetails.brand}
          onChange={(event) => {
            setItemDetails({ ...itemDetails, brand: event.target.value });
          }}
        />
        <TextField
          required
          fullWidth
          id="price"
          label="Price"
          name="price"
          size="small"
          style={{ marginTop: "10px" }}
          type="number"
          InputLabelProps={{ shrink: true }}
          value={itemDetails.price}
          onChange={(event) => {
            setItemDetails({
              ...itemDetails,
              price: Number(event.target.value),
            });
          }}
        />
        <TextField
          required
          fullWidth
          id="weight"
          label="Weight"
          name="weight"
          size="small"
          style={{ marginTop: "10px" }}
          type="number"
          InputLabelProps={{ shrink: true }}
          value={itemDetails.weight}
          onChange={(event) => {
            setItemDetails({
              ...itemDetails,
              weight: Number(event.target.value),
            });
          }}
        />
        <Box>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="category"
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
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          style={{ marginTop: "10px" }}
        >
          SAVE
        </Button>
      </form>
    </div>
  );
};

const ItemMaintenanceForm = withStyles(styles)(ItemMaintenanceFormView);
export default ItemMaintenanceForm;

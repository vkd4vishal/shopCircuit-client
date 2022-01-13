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
import Cookies from "universal-cookie";
import AlertForm from "../common/Alert/Alert";
import PopUpForm from "../common/popup/popup";
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

// interface ImageInterface {
//   source: string;
// }
type ImageInterfaceType = { code: string; id: string }[];
type UploadImageInterfaceType = any[];
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
  const [imageIndex, setImageIndex] = React.useState(0);

  const [success, setSuccess] = React.useState(false);

  const [failure, setFailure] = React.useState(false);
  const [serverData, setServerData] = React.useState("");
  // let uploadImages: any[] = [];
  const [uploadImages, setUploadImages] =
    React.useState<UploadImageInterfaceType>([]);
  const [showImage, setShowImage] = React.useState<ImageInterfaceType>([]);
  const [currentImageId, setCurrentImageId] = React.useState("");
  const [deleteButtonClicked, setdeleteButtonClicked] = React.useState(false);
  const cookies = new Cookies();
  const token = cookies.get("token");
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
  let sources: any[] = [];
  const getItemImage = async (itemimageid: string) => {
    await axios
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
        // setShowImage([...showImage,  "data:;base64," + base64]);
        showImage.push({ code: `data:;base64,${base64}`, id: itemimageid });
        setFetched(true);
      });
  };
  const getItemDetails = async (
    isImageUpload?: boolean,
    isDetailsSaved?: boolean
  ) => {
    await axios
      .get("/getItemDetails", {
        headers: {
          itemid: id,
        },
      })
      .then(async (res) => {
        showImage.length = 0;
        // showImage=[]

        if (isDetailsSaved === undefined || isDetailsSaved) {
          await Promise.all(
            res.data.data.itemImages.map(async (image: any) => {
              if (currentImageId.length === 0) {
                setCurrentImageId(image._id);
              }
              await getItemImage(image._id);
            })
          );
        }
        if (!isImageUpload) {
          setItemDetails(res.data.data.itemDetails);
          setCategory(res.data.data.itemDetails.category);
        }
      });
  };
  const uploadItemImages = async (images: any) => {
    const formData = new FormData();
    images.forEach((image: any) => {
      formData.append("itemImage", image);
    });
    await axios
      .post("/uploadItemImages", formData, {
        headers: {
          itemid: id,
          token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async (response) => {
        if (response.status === 200) {
          setSuccess(true);
          setServerData(response.data.message);

          await getItemDetails(true);
        } else {
          alert(response);
        }
      })
      .catch((error) => {
        setFailure(true);
        setServerData(JSON.stringify(error.response.data.message));
      });
    return;
  };
  React.useEffect(() => {
    getItemDetails();
  }, []);

  const deleteImage = async () => {
    axios
      .post(
        "/deleteItemImages",
        {
          itemImages: [showImage[imageIndex].id],
        },
        {
          headers: {
            token,
            itemid:id
          },
        }
      )
      .then(async (response) => {
        if (response.status === 200) {
          setSuccess(true);
          setServerData(response.data.message);
          await getItemDetails(true);
        } else {
          alert(response);
        }
      })
      .catch((error) => {
        setFailure(true);
        setServerData(JSON.stringify(error.response.data.message));
      });
  };
  const updateItemDetails = (data: {
    categoryid?: string;
    itemName?: string;
    price?: number;
    weight?: number;
    brand?: string;
  }) => {
    let body = {};
    if (data.itemName) {
      body = { ...body, itemName: data.itemName };
    }
    if (data.price) {
      body = { ...body, price: data.price };
    }
    if (data.weight) {
      body = { ...body, weight: data.weight };
    }
    if (data.brand) {
      body = { ...body, brand: data.brand };
    }
    let headers;
    headers = {
      token,
      itemid: id,
    };
    if (data.categoryid) {
      headers = { ...headers, categoryid: data.categoryid };
    }
    axios
      .put("/updateItemDetails", body, {
        headers,
      })
      .then(async (response) => {
        if (response.status === 200) {
          setSuccess(true);
          setServerData(response.data.message);

          await getItemDetails(undefined, true);
        } else {
          alert(response);
        }
      })
      .catch((error) => {
        setFailure(true);
        setServerData(JSON.stringify(error.response.data.message));
      });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    updateItemDetails({
      itemName: data.get("itemName")?.toString(),
      brand: data.get("brand")?.toString(),
      price: Number(data.get("price")),
      weight: Number(data.get("weight")),
      categoryid: category,
    });
  };
  const hidePopUp = () => {
    setdeleteButtonClicked(false);
  };

  return (
    <div className={classes.root}>
      <AlertForm
        setSuccess={setSuccess}
        setFailure={setFailure}
        isSuccess={success}
        message={serverData}
        show={success || failure}
      />
      {fetched && (
        <div>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{ marginTop: "10px" }}
            onClick={() => {
              if (imageIndex - 1 >= 0) {
                setImageIndex(imageIndex - 1);
              }
            }}
          >
            PREV
          </Button>
          <img
            className={classes.image}
            src={showImage[imageIndex]?.code}
            alt="item image"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{ marginTop: "10px" }}
            onClick={() => {
              if (imageIndex + 1 < showImage.length) {
                setImageIndex(imageIndex + 1);
              }
            }}
          >
            NEXT
          </Button>

          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{ marginTop: "10px" }}
            onClick={() => {
              setdeleteButtonClicked(true);
            }}
          >
            DELETE IMAGE
          </Button>
          {deleteButtonClicked && (
            <PopUpForm
              popUpType={3}
              entity={"image"}
              onClickFunction={deleteImage}
              hidePopUp={hidePopUp}
            />
          )}
        </div>
      )}
      <input
        type="file"
        name="myImage"
        onChange={(event: any) => {
          setUploadImages([...event.target.files]);
        }}
        multiple
      />
      <Button
        disabled={uploadImages.length ? false : true}
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        style={{ marginTop: "10px" }}
        onClick={async () => {
          await uploadItemImages(uploadImages);
          setImageIndex(showImage.length - 1);
        }}
      >
        UPLOAD IMAGE
      </Button>
      <form onSubmit={handleSubmit}>
        <TextField
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

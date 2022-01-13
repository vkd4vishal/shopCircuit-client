import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { StyleRules, WithStyles, withStyles } from "@mui/styles";
import React, { useContext } from "react";
const styles: StyleRules = {
  root: { zIndex: 2000, backgroundColor: "white", opacity: "0.4" },
};

interface PopUpProp extends WithStyles<typeof styles> {
  popUpType: 1 | 2 | 3;
  entity: string;
  onClickFunction: () => void;
  hidePopUp: () => void;
}

/*
popUpType values
1 - ADD
2 - UPDATE
3 - DELETE
*/
const PopUpView: React.FC<PopUpProp> = ({
  classes,
  popUpType,
  entity,
  onClickFunction,
  hidePopUp,
}) => {
  const [showDialog, setShowDialog] = React.useState(true);
  let action, descAction, desc, agree;
  switch (popUpType) {
    case 1:
      action = "add";
      descAction = "Added";
      desc = "";
      agree = "ADD";
      break;
    case 2:
      action = "change";
      descAction = "Changed";
      desc = "unchanged";
      agree = "SAVE";
      break;
    case 3:
      action = "delete";
      descAction = "Deleted";
      desc = "recovered";
      agree = "DELETE";
      break;
    default:
      action = "process";
      descAction = "Processed";
      desc = "unprocessed";
      agree = "AGREE";
  }

  const title = `Are you sure you want to ${action} selected ${entity}?`;
  const description = `${descAction} ${entity} can not be ${desc}.`;
  return (
    <div className={classes.root}>
      <Dialog
        open={showDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              hidePopUp();
            }}
          >
            CANCEL
          </Button>
          <Button
            onClick={ () => {
               onClickFunction();
              hidePopUp()
            }}
            autoFocus
          >
            {agree}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const PopUpForm = withStyles(styles)(PopUpView);
export default PopUpForm;

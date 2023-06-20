import * as React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useNotification } from "../../store/layout/hooks";
import { Alert } from "@material-ui/lab";

export interface NotificationProps {}

const Notification: React.FC<NotificationProps> = (props) => {
  const [notification,refresh]=useNotification();
  const handleClose = () => {
    refresh(undefined)
  };
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={!!notification}
        autoHideDuration={7000}
        onClose={handleClose}
        // message={notification}
        
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      >
        <Alert onClose={handleClose} severity="success">
          {notification}
        </Alert>
        </Snackbar>
    </>
  );
};
export default Notification;

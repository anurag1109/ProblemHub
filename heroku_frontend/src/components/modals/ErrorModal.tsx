import * as React from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import { useError } from '../../store/layout/hooks';
import { useLogin } from '../../store/user/hooks';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6" color='error'>{children}</Typography>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export interface ErrorModalProps{
    
}

const ErrorModal:React.FC<ErrorModalProps>=(props)=> {
  const [error,,hideModal]=useError();
  const [,logout]=useLogin()
  const err=error && error.error && error.error.error;
  const errorMessage=(err && err.data)||(typeof err==='object' && err);
  // const code=err && err.status;
  const handleClose = () => {
    hideModal()
    if(err && err.message==="Unauthorized access"){
     logout()
    }
  };

 
  return (
    <div>
      <Dialog  
      aria-labelledby="customized-dialog-title"
      open={error.isOpen}
      maxWidth='sm'
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {(error && error.error && error.error.title)||""}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom >
            {(errorMessage && errorMessage.message )}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color='secondary' variant='outlined'>
            ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default ErrorModal;
import * as React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      minWidth: 300,
    },
    boderLine: {
      border: `1px solid ${theme.palette.secondary.main}`,
    },
    row:{
      display:'grid',
      gridTemplateColumns:'95% 4%',
      alignItems:"center",
      width:"100%"
    },
    text:(props:BaseModalProps)=>{
      return{
          color:`${theme.palette.type==='dark'?'inherit':theme.palette.secondary.main}`
      }
    }
  })
);

export interface BaseModalProps {
  readonly isOpen: boolean;
  readonly onClose?: () => void;
  readonly title?: string;
  readonly style?: React.CSSProperties;
  readonly align?: "center" | "left" | "right";
  readonly textStyle?: React.CSSProperties;
  readonly color?: "error" | "primary" | "secondary"|'textSecondary'|'textPrimary'| 'inherit'|'initial';
  readonly maxWidth?: "lg" | "md" | "sm" | "xl" | "xs";
  readonly fullScreen?: boolean;
  readonly fullWidth?:boolean;
  // readonly variant?: 'default' | 'primaryLight' | 'secondary' | 'warning' | 'error' | 'primary' | 'white';

}

const BaseModal: React.FC<BaseModalProps> = (props) => {
  const {
    isOpen,
    onClose,
    title,
    children,
    style,
    align,
    textStyle,
    // color,
    maxWidth,
    fullScreen,
    fullWidth,
  } = props;
  const classes = useStyles(props);
  return (
    <>
      <Dialog
        onClose={onClose}
        fullScreen={fullScreen}
        maxWidth={maxWidth}
        aria-labelledby="alert-dialog-slide-title"
        open={isOpen}
        fullWidth={fullWidth}
      >
        <MuiDialogTitle
          disableTypography
          className={classes.root}
          style={style}
        >
          {onClose ? (
            <div className={classes.row}>
              <Typography
                variant="h6"
                // color={color}
                className={classes.text}
                align={align}
                style={textStyle}
              >
                {title}
              </Typography>
              <div>
              <IconButton onClick={onClose} color='inherit'>
                <CloseIcon />
              </IconButton>
              </div>
            </div>
          ) : (
            <Typography
              variant="h6"
              // color={color}
              className={classes.text}
              align={align}
              style={textStyle}
            >
              {title}
            </Typography>
          )}
        </MuiDialogTitle>
        <div className={classes.boderLine}></div>
        {children}
      </Dialog>
    </>
  );
};
export { MuiDialogContent as BaseModalContent };
export { MuiDialogActions as BaseModalAction };
export default BaseModal;

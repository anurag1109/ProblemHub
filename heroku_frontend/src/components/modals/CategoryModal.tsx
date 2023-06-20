import { Button,  Grid,  TextField } from "@material-ui/core";
import * as React from "react";
import { useLoading } from "../../store/layout/hooks";
import PreLoader from "../Loaders/Preloader";
import BaseModal, { BaseModalAction, BaseModalContent } from "./BaseModal";

export interface CategoryModalProps {
  readonly isOpen: boolean;
  readonly onClose?: () => void;
  readonly category?:ProblemType
}

const CategoryModal: React.FC<CategoryModalProps> = (props) => {
  const { isOpen, onClose, category } = props;
  const [state,setState]=React.useState<CreateCategoryPyload>();
  const [isLoading]=useLoading();
  const handleChange=(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement|any>)=>{
    if(e.target.name!=='file'){
        setState({...state,[e.target.name]:e.target.value})
    }else{
        setState({...state,[e.target.name]:e.target.files[0]})
    }
  }
  
  return (
    <>
      <BaseModal
        isOpen={isOpen}
        title={!!category?category.title:"Add Category"}
        color="secondary"
        align="center"
        maxWidth="sm"
        fullWidth
      >
        <BaseModalContent dividers>
          <Grid container xs={12} spacing={3}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Title"
                name="title"
                onChange={handleChange}
                value={state?.title}
                fullWidth
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Value"
                name="value"
                onChange={handleChange}
                value={state?.value}
                fullWidth
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                type='file'
                name="file"
                onChange={handleChange}
                fullWidth
                autoFocus
              />
            </Grid>
          </Grid>
        </BaseModalContent>
        <BaseModalAction>
          <Button variant="contained" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
           {isLoading? <PreLoader /> : "Submit"}
          </Button>
        </BaseModalAction>
      </BaseModal>
    </>
  );
};
export default CategoryModal;

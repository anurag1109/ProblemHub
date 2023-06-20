import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import * as React from "react";
import { useLoading } from "../../store/layout/hooks";
import { useProblem, useProblemTypes } from "../../store/problem/hooks";
import PreLoader from "../Loaders/Preloader";
import BaseModal, { BaseModalAction, BaseModalContent } from "./BaseModal";
import ErrorModal from "./ErrorModal";

export interface TitleModalProps {
  readonly isOpen: boolean;
  readonly onClose?: () => void;
  readonly problem?: Problem;
}

const TitleModal: React.FC<TitleModalProps> = (props) => {
  const [, , , updateProblem] = useProblem();
  const [state, setState] = React.useState<string>("");
  const [types]=useProblemTypes();
  const [type,setType]=React.useState<string>("");
  const { isOpen, onClose, problem } = props;
  const [isLoading]=useLoading();
  const handleSubmit = () => {
    let res: Problem = { ...problem, title: state,type_id:type };
    updateProblem(res, onClose);
  };
  const handleChange=(e:any)=>{
    setType(e.target.value)
  }
  React.useEffect(() => {
    if (problem) {
      setState(problem?.title);
      setType(problem?.type_id||"")
    }
  }, [problem]);
  return (
    <>
      <BaseModal
        isOpen={isOpen}
        title={"Title"}
        color="secondary"
        align="center"
        maxWidth="md"
        fullWidth
      >
        <BaseModalContent dividers>
          <Grid container xs={12} spacing={3}>
          <Grid item xs={12}>
            <FormControl variant='outlined' fullWidth>
            <InputLabel id="demo-simple-select-outlined-label">Problem Types</InputLabel>
                <Select
                  onChange={handleChange}
                  value={type}
                  fullWidth
                  labelId="demo-simple-select-outlined-label"
                   id="demo-simple-select-outlined"
                  label="Problem Types"
                >
                  {types.map((ele)=><MenuItem value={ele._id} key={ele._id}>{ele.title}</MenuItem>)}
                </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Title"
                onChange={(e) => setState(e.target.value)}
                fullWidth
                value={state}
                minRows={4}
                multiline
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
            disabled={!state||isLoading}
            onClick={handleSubmit}
          >
           {isLoading? <PreLoader /> : "Submit"}
          </Button>
        </BaseModalAction>
      </BaseModal>
      <ErrorModal />
    </>
  );
};
export default TitleModal;

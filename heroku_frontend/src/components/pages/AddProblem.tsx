import * as React from "react";
import MainTemplate from "../template/MainTemplate";
import TextField from "@material-ui/core/TextField";
import SimpleTabs, { TabPanel } from "../tabs/Tab";
import { useTab } from "../../hooks";
import { Box, Button, MenuItem, Select, Typography } from "@material-ui/core";
import { useProblem, useProblemTypes } from "../../store/problem/hooks";
import PreLoader from "../Loaders/Preloader";
import { useLoading } from "../../store/layout/hooks";
import QuillEditor from "../editor/QuillEditor";

export interface AddProblemProps {}

const AddProblem: React.FC<AddProblemProps> = (props) => {
  const [, , createProblem] = useProblem();
  const [problemTypes] = useProblemTypes();

  const [isLoading] = useLoading();
  const [state, setState] = React.useState<Problem>({
    title: "",
    question: "",
    answer: "",
    type_id:"",
  });
  const handleSubmit = () => {
    createProblem(state);
  };
  const handleChange=(e:any)=>{
      setState({...state,type_id:e.target.value})
  }
  const [tab, setTab] = useTab();
  return (
    <>
      <MainTemplate>
        <SimpleTabs tab={tab} setTab={setTab}>
          <TabPanel value={tab} index={0}>
            <Box sx={{ marginTop: 20 }}>
              <TextField
                variant="outlined"
                label="Title"
                onChange={(e) => setState({ ...state, title: e.target.value })}
                fullWidth
                value={state?.title}
                minRows={10}
                multiline
                autoFocus
              />
            </Box>
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <Typography variant="h6" gutterBottom>
              Problem:
            </Typography>
            <QuillEditor
              onEditorChange={(data) => setState({ ...state, question: data })}
              data={state.question}
            />
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <Typography variant="h6" gutterBottom>
              Solution:
            </Typography>
            <QuillEditor
              data={state.answer}
              onEditorChange={(data) => setState({ ...state, answer: data })}
            />
          </TabPanel>
          <TabPanel value={tab} index={3}>
            <Select fullWidth 
            value={state.type_id}
            name="type_id"
            onChange={handleChange}
            variant="outlined" displayEmpty>
              <MenuItem value="">Select Problem Types...</MenuItem>
              {problemTypes.map((ele) => (
                <MenuItem value={ele._id} key={ele._id}>
                  {ele.title}
                </MenuItem>
              ))}
            </Select>
          </TabPanel>
        </SimpleTabs>
        <Box sx={{ marginTop: 10 }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={!state.title||!state.type_id || isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? <PreLoader /> : "Submit"}
          </Button>
        </Box>
      </MainTemplate>
    </>
  );
};

export default AddProblem;

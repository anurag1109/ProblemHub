import { Button, Grid } from "@material-ui/core";
import * as React from "react";
import { useLoading } from "../../store/layout/hooks";
import { useProblem } from "../../store/problem/hooks";
import QuillEditor from "../editor/QuillEditor";
import PreLoader from "../Loaders/Preloader";
import BaseModal, { BaseModalAction, BaseModalContent } from "./BaseModal";
import ErrorModal from "./ErrorModal";

export interface AnswerModalProps {
  readonly isOpen: boolean;
  readonly onClose?: () => void;
  readonly problem?: Problem;
}

const AnswerModal: React.FC<AnswerModalProps> = (props) => {
  const [, , , updateProblem] = useProblem();
  const [isLoading] = useLoading();
  const [state, setState] = React.useState<string>("");
  const { isOpen, onClose, problem } = props;
  const handleSubmit = () => {
    if (problem) {
      let res: Problem = { ...problem, answer: state };
      updateProblem(res, onClose);
    }
  };
  return (
    <>
      <BaseModal
        isOpen={isOpen}
        title={"Solution"}
        color="secondary"
        align="center"
        fullScreen={true}
        // onClose={onClose}
      >
        <BaseModalContent dividers>
          <Grid container xs={12}>
            <Grid item xs={12}>
              <QuillEditor
                onEditorChange={(data: string) => {
                  setState(data);
                }}
                data={state || problem?.answer}
              />
            </Grid>
          </Grid>
        </BaseModalContent>
        <BaseModalAction>
          <Button variant="contained" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={!state || isLoading}
          >
            {isLoading ? <PreLoader /> : "Submit"}
          </Button>
        </BaseModalAction>
      </BaseModal>
      <ErrorModal />
    </>
  );
};
export default AnswerModal;

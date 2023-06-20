import { Grid } from "@material-ui/core";
import * as React from "react";
import BaseModal, { BaseModalContent } from "./BaseModal";

export interface FullScreenModalProps {
  readonly isOpen: boolean;
  readonly onClose?: () => void;
  readonly data: string;
  readonly title:string
}

const FullScreenModal: React.FC<FullScreenModalProps> = (props) => {
  const { isOpen, onClose, data,title } = props;
  const createMarkup = (data: string) => {
    return { __html: data };
  };

  return (
    <>
      <BaseModal
        isOpen={isOpen}
        title={title}
        color="secondary"
        align="center"
        fullScreen={true}
        onClose={onClose}
      >
        <BaseModalContent dividers>
          <Grid container xs={12}>
            <div
              dangerouslySetInnerHTML={createMarkup(data || "")}
              className="ql-editor"
              style={{width:"100%"}}
            ></div>
          </Grid>
        </BaseModalContent>
      </BaseModal>
    </>
  );
};
export default React.memo(FullScreenModal);

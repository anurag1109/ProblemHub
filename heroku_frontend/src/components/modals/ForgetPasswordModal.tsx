import * as React from "react";
import { useForgetPassword } from "../../store/user/hooks";
import ForgetPasswordForm from "../forms/ForgetPasswordForm";
import BaseModal, {  BaseModalContent } from "./BaseModal";
import ErrorModal from "./ErrorModal";

export interface ForgetPasswordModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

const ForgetPasswordModal: React.FC<ForgetPasswordModalProps> = (props) => {
  const { isOpen, onClose } = props;

  const [forgetPasswordRun]=useForgetPassword()
  const handleSubmit = (data: ForgetPasswordFormValue) => {
    forgetPasswordRun(data,onClose)
  };
  return (
    <>
      <BaseModal
        isOpen={isOpen}
        title="Forget Password"
        color='secondary'
        align="center"
        maxWidth="md"
        style={{ minWidth: 500 }}
      >
        <BaseModalContent dividers>
          <ForgetPasswordForm onClose={onClose} onSumit={handleSubmit}/>
        </BaseModalContent>
      </BaseModal>
      <ErrorModal />
    </>
  );
};
export default ForgetPasswordModal;

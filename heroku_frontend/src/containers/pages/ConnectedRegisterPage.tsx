import * as React from "react";
import RegisterPage from "../../components/pages/RegisterPage";
import { useRegister } from "../../store/user/hooks";

export interface ConnectedRegisterPageProps {}
const ConnectedRegisterPage: React.FC<ConnectedRegisterPageProps> = (props) => {
  const [register]=useRegister();
  return (
    <>
      <RegisterPage register={register}/>
    </>
  );
};
export default ConnectedRegisterPage;

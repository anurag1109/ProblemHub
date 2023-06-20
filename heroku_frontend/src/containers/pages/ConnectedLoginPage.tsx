import * as React from "react";
import LoginPage from "../../components/pages/LoginPage";
import { useLogin } from "../../store/user/hooks";

export interface ConnectedLoginPageProps {}
const ConnectedLoginPage: React.FC<ConnectedLoginPageProps> = (props) => {
  const [login] =useLogin();
  const onSubmit=(data:LoginFormValues)=>{
      login(data)
  }
  return (
    <>
      <LoginPage onSubmit={onSubmit}/>
    </>
  );
};
export default ConnectedLoginPage;

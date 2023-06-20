import * as React from "react";
import { useParams } from "react-router-dom";
import Dashboard from "../../components/pages/Dashboard";
import {
  useCategoryItem,
  useSelectProblemType,
} from "../../store/problem/hooks";

const ConnectedCategoryItemPage = () => {
  const [problems, getProblems] = useCategoryItem();
  const [selected] = useSelectProblemType();
  const { id } = useParams();
  React.useEffect(() => {
    getProblems(id || "");
  }, [id]);
  const handleSearch=(data:Search)=>{
    getProblems(id || "");
  }
  const handleProblem=()=>{
    getProblems(id || "");
  }
  return (
    <>
      <Dashboard problems={problems} 
       title={`${selected?.title} Problems`} 
        onSearch={handleSearch}
        getProblems={handleProblem}
        autoIsDisable={true}
      />
    </>
  );
};
export default ConnectedCategoryItemPage;

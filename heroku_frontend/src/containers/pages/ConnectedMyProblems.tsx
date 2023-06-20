import * as React from "react";
import Dashboard from "../../components/pages/Dashboard";
import { useSearchInput } from "../../store/layout/hooks";
import { useMyProblem, useSearch } from "../../store/problem/hooks";
import { useUserContext } from "../../store/user/hooks";

const ConnectedMyProblems = () => {
  const [problems, getProblems] = useMyProblem();
  const [user]=useUserContext();
  const [onSearch]=useSearch();
  const [search]=useSearchInput();
  React.useEffect(() => {
    if(!search.search){
      getProblems();
    }else{
      onSearch({...search,id:user&&user._id})
    }
  }, []);
  const handleSearch=(data:Search)=>{
    onSearch({...data,id:user&&user._id})
  }
  return (
    <>
      <Dashboard
        problems={problems}
        title="My Problems"
        getProblems={getProblems}
        onSearch={handleSearch}
        autoIsDisable={true}
      />
    </>
  );
};
export default ConnectedMyProblems;
